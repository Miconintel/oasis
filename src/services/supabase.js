import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://fkjczmihhtvxnokwoajv.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZramN6bWloaHR2eG5va3dvYWp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzNjI5ODIsImV4cCI6MjA0OTkzODk4Mn0.ZjnwBiAkHNNJtWm6_Xn8QZxStmGjIBhASt9eiZYBJkA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
