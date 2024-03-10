
import { createClient } from '@supabase/supabase-js'

// Initialize your Supabase client
const supabaseUrl = Deno.env.get('NUXT_PUBLIC_SUPABASE_URL');
const supabaseKey = Deno.env.get('NUXT_PUBLIC_SUPABASE_KEY');
const supabase = createClient(supabaseUrl, supabaseKey);



Deno.serve(async (req) => {
  // const { name } = await req.json()
  // const data = {
  //   message: `Hello ${name}!`,
  // }

  // return new Response(
  //   JSON.stringify(data),
  //   { headers: { "Content-Type": "application/json" } },
  // )
  async function updateOverdueOrders() {
    // Get the current date and adjust it as needed
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    // Fetch orders that are overdue and not already marked as 'delivered' or 'overdue'
    const { data: overdueOrders, error } = await supabase
      .from('orders')
      .select('*')
      .lte('deliveryDate', today.toISOString())
      .not('orderStatus', 'in', ['delivered', 'overdue']);
  
    if (error) {
      console.error('Error fetching overdue orders:', error);
      return;
    }
  
    // Update each overdue order to 'overdue'
    const updates = overdueOrders.map(order =>
      supabase
        .from('orders')
        .update({ orderStatus: 'overdue' })
        .match({ id: order.id })
    );
  
    const results = await Promise.all(updates);
    const errors = results.filter(result => result.error).map(result => result.error);
  
    if (errors.length > 0) {
      console.error('Errors updating orders:', errors);
    } else {
      console.log(`Updated ${updates.length} orders to 'overdue'.`);
    }
  }
  updateOverdueOrders();
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/overdue-orders' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
