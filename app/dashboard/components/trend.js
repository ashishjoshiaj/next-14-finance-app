import BaseTrend from "@/components/trend"
import { createClient } from "@/lib/supabase/server"

export default async function Trend({ type, range }) {
  const supabase = await createClient()
  // Use from/select if .rpc is not available
  let { data, error } = await supabase
    .from('calculate_total') // Replace with your actual table or view name if different
    .select('current_amount, previous_amount')
    .eq('range_arg', range)
    .eq('type_arg', type)
    .limit(1)
    .single()

  if (error) throw new Error("Could not fetch the trend data")

  const amounts = data

  return <BaseTrend type={type} amount={amounts?.current_amount} prevAmount={amounts?.previous_amount} />
}