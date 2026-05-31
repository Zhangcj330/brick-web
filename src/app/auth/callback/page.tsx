'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const supabase = getSupabase()

    // Supabase browser client automatically exchanges the code/token from the URL
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/chat')
      } else {
        // Wait briefly for onAuthStateChange to fire (handles PKCE code exchange)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_IN' && session) {
            subscription.unsubscribe()
            router.replace('/chat')
          } else if (event === 'SIGNED_OUT' || (!session && event !== 'INITIAL_SESSION')) {
            subscription.unsubscribe()
            router.replace('/sign-in?error=oauth')
          }
        })

        // Fallback timeout
        const timer = setTimeout(() => {
          subscription.unsubscribe()
          router.replace('/sign-in?error=oauth')
        }, 5000)

        return () => {
          clearTimeout(timer)
          subscription.unsubscribe()
        }
      }
    })
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin" />
        <p className="text-sm text-[#6B6B6B]">Signing you in…</p>
      </div>
    </div>
  )
}
