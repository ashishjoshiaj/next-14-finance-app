import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
dotenv.config(
    {
        path: '.env.local'
    }
)

const supabase= createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE
)

const categories = [
  'Housing', 'Transport', 'Health', 'Food', 'Education', 'Other'
]

async function seed(){
    let transactions=[]
    for (let i=0;i<10;i++){
        const created_at =faker.date.past()

        let type, category=null

        const typeBias = Math.random()
        if (typeBias<0.80){
            type='Expense'
            category = faker.helpers.arrayElement(categories)
        }
        else if (typeBias<0.90){
            type='Income'
        }
        else{
            type=faker.helpers.arrayElement(['Saving', 'Investment'])
        }

        let amount
        switch (type){
            case 'Income':
                amount = faker.number.int({ min: 5000, max: 10000 })
                break
            case 'Expense':
                amount = faker.number.int({ min: 10, max: 7000 })
                break
            case 'Investment':
            case 'Saving':
                amount = faker.number.int({ min: 3000, max: 10000 })
                break

        }
        transactions.push({
            created_at,
            amount,
            type,
            description: faker.lorem.sentence(),
            category,
        })
    }
    const {error} = await supabase
        .from('transactions')
        .insert(transactions)
    if (error) {
        console.error('Error inserting data:', error);
    }
    else {
        console.log('Data inserted successfully');
    }
}

seed().catch(console.error)