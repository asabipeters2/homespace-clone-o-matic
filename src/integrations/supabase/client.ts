// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bjaziglfysifqzxavrbt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqYXppZ2xmeXNpZnF6eGF2cmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1MTUzMzUsImV4cCI6MjA1MjA5MTMzNX0.zICgGFtOFA7qJZnbIGeFzHlVou1v6fKeFlkCZbs-_M0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);