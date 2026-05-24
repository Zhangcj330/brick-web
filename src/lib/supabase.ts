import { createClient } from '@supabase/supabase-js'

export type WaitlistEntry = {
  id?: string
  first_name: string
  last_name: string
  email: string
  buyer_type: string
  city: string
  budget: string
  source: string[]
  created_at?: string
}

export function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
