'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  useEffect(() => {
    async function exchange() {
      const supabase = getSupabase()

      // 1. Try PKCE code exchange (most common with Supabase v2)
      const code = new URLSearchParams(window.location.search).get('code')
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
          router.replace('/chat')
          return
        }
      }

      // 2. Check if already signed in (implicit flow puts token in hash)
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.replace('/chat')
        return
      }

      // 3. Failed
      setError('Sign-in failed. Please try again.')
      setTimeout(() => router.replace('/sign-in'), 2000)
    }

    exchange()
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : (
          <>
            <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            <p className="text-sm text-[#6B6B6B]">Signing you in…</p>
          </>
        )}
      </div>
    </div>
  )
}
