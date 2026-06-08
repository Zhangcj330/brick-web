'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Detects Supabase implicit-flow tokens in the URL hash (access_token=...)
 * and redirects to /auth/callback so the callback page can handle them.
 * This happens when Google OAuth sends the token to the Site URL (/) instead
 * of the configured redirectTo URL.
 */
export default function AuthRedirect() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash
    if (hash && hash.includes('access_token=')) {
      router.replace(`/auth/callback${hash}`)
    }
  }, [router])

  return null
}
