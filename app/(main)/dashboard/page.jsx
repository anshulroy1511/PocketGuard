
import CreateAccountDrawer from '@/components/create-account-drawer';
import { CardContent ,Card} from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { getDashboardData, getUserAccounts } from '@/actions/dashboard';
import  AccountCard  from "./_component/account-card";
import { BudgetProgress } from "./_component/budget-progress";
import { Suspense } from "react";
import React from 'react';
import { getCurrentBudget } from '@/actions/budget';
import DashboardOverview from './_component/transaction-overview';

async function DashboardPage (){
 
  const accounts = await getUserAccounts();
  const defaultAccount = accounts?.find((account) => account.isDefault);
  
    // Get budget for default account
    let budgetData = null;
    if (defaultAccount) {
      budgetData = await getCurrentBudget(defaultAccount.id);
    }

    const transactions = await getDashboardData();

  return ( 
     <div className='space-y-8'>

        {/* Budget Progress */}
        {defaultAccount &&  <BudgetProgress
        initialBudget={budgetData?.budget}
        currentExpenses={budgetData?.currentExpenses || 0} 
       />}
 
       
         {/* Dashboard Overview */}
         <Suspense fallback={"Loading Overview..."}>
            <DashboardOverview
            accounts={accounts}
            transactions={transactions || []}
          />
         </Suspense>
     


        {/* Account Grid */}
         <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <CreateAccountDrawer>
             <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
              <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
                <Plus className="h-10 w-10 mb-2" />
                  <p className='text-sm font-medium'>Add New Account</p>
              </CardContent>
             </Card>
          </CreateAccountDrawer>

          {accounts.length > 0 &&
          accounts?.map((account) => {
          return  <AccountCard key={account.id} account={account} />
          })}                

         </div>
    </div>
  )
}

export default DashboardPage;