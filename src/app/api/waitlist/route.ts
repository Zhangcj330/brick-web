import { NextRequest, NextResponse } from 'next/server'
import { getSupabase, type WaitlistEntry } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body: WaitlistEntry = await req.json()
    if (!body.email || !body.first_name) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }
    const supabase = getSupabase()
    const { error } = await supabase.from('waitlist').insert([{
      first_name: body.first_name,
      last_name:  body.last_name,
      email:      body.email.toLowerCase().trim(),
      buyer_type: body.buyer_type,
      city:       body.city,
      budget:     body.budget,
      source:     body.source,
    }])
    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'This email is already on the waitlist.' }, { status: 409 })
      }
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
}
