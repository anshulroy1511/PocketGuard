// it is used for server actions only 
"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
    const serialized = {...obj};
    

    if(obj.balance){
        serialized.balance = obj.balance.toNumber();
    }
    
    if(obj.amount){
        serialized.amount = obj.amount.toNumber();
    }

    return serialized;

}

export async function createAccount(data){
    try{
        const { userId } = await auth();
        console.log("Server Time:", new Date().toISOString());
        if (!userId) throw new Error("Unauthorized");
        

        const user = await db.user.findUnique({
            where: {clerkUserId: userId},
        });

        if(!user) {
            throw new Error("User not found");
        }

        // Check if this is the user's first account 
        const existingAccounts =  await db.account.findMany({
            where : {userId : user.id},
        });

        const shouldBeDefault = 
           existingAccounts.length === 0 ? true : data.isDefault;

        // if this account should be default, unset other default accounts
        if(shouldBeDefault) {
            await db.account.updateMany({
                where: {userId: user.id, isDefault : true },
                data: {isDefault: false},
            });
        }

        const account = await db.account.create({
            data: {
                ...data,
                balance: parseFloat(data.balance),
                userId: user.id,
                isDefault: shouldBeDefault,
            },
        });

        const serializedAccount = serializeTransaction(account);
        revalidatePath("/dashboard");
        return {success:true, data:serializedAccount};

    }catch(error) {
        throw new Error(error.message);
    }
}


// get user account----------------------

export async function getUserAccounts(){
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {clerkUserId: userId},
    });

    if(!user) {
        throw new Error("User not found");
    }

    const accounts = await db.account.findMany({
        where: { userId: user.id },
        orderBy: {createdAt: "desc"},
        include: {
          _count: {
            select: {
                transactions: true,
            },
          },
        }, 
    });

    const serializedAccounts = accounts.map(serializeTransaction);
    return serializedAccounts;
}

export async function getDashboardData() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
  
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
  
    if (!user) {
      throw new Error("User not found");
    }
  
    // Get all user transactions
    const transactions = await db.transaction.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
    });
  
    return transactions.map(serializeTransaction);
  }   