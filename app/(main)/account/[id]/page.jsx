import { getAccountWithTransactions } from '@/actions/accounts';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import TransactionTable from '../_components/transaction-table';
import { BarLoader } from 'react-spinners';
import AccountChart from '../_components/account-chart';
 
const AccountsPage = async (context) => {
    const params = await context.params; 
    const accountData = await getAccountWithTransactions(params.id);

    if(!accountData){
        notFound();
    }
    
    const {transactions, ...account} = accountData;
  return(
   <div className='space-y-8 px-5 '> 
    <div className='flex gap-4 items-end justify-between'>
        <div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-title capitalize">
            {account.name}
            </h1>
            <p className="text-muted-foreground"> {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account</p>
        </div>

        <div className='text-right pb-2'>
            <div className="text-xl sm:text-2xl font-bold">
            ₹ {parseFloat(account.balance).toFixed(2)}
            <p className="text-sm text-muted-foreground">{account._count.transactions} Transactions</p>
        </div>
    </div>
  </div>

          {/* chart section */}
          <Suspense 
            fallback={<BarLoader className='mt-4' width={"100%"} color="#9333ea"/>}  > 
            <AccountChart transactions={transactions}/>
         </Suspense>


            {/* Transaction Table */}
            <Suspense 
            fallback={<BarLoader className='mt-4' width={"100%"} color="#9333ea"/>}  > 
                <TransactionTable transactions={transactions}/>
            </Suspense>

    </div>
  )
}

export default AccountsPage;