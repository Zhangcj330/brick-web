'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Clock3, LockOpen, MessageSquareText } from 'lucide-react'

const DEFAULT_SUMMARY = { conversations: 12, levelsCleared: 3, timeSpentSeconds: 167 }

function getStoredSummary() {
  if (typeof window === 'undefined') return DEFAULT_SUMMARY

  try {
    const summary = window.sessionStorage.getItem('brick-game-summary')
    if (!summary) return DEFAULT_SUMMARY

    const parsed = JSON.parse(summary) as Partial<typeof DEFAULT_SUMMARY>
    return {
      conversations:
        typeof parsed.conversations === 'number'
          ? parsed.conversations
          : DEFAULT_SUMMARY.conversations,
      levelsCleared:
        typeof parsed.levelsCleared === 'number'
          ? parsed.levelsCleared
          : DEFAULT_SUMMARY.levelsCleared,
      timeSpentSeconds:
        typeof parsed.timeSpentSeconds === 'number'
          ? parsed.timeSpentSeconds
          : DEFAULT_SUMMARY.timeSpentSeconds,
    }
  } catch {
    return DEFAULT_SUMMARY
  }
}

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return minutes === 0 ? `${remainingSeconds} sec` : `${minutes} min ${remainingSeconds} sec`
}

function formatTimer(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
}

export default function GamePrizePage() {
  const [summary] = useState(getStoredSummary)

  return (
    <div className="flex min-h-screen flex-col bg-[#F6F6F6] text-black">
      <nav className="flex h-[66px] items-center border-b border-[#EEEEEE] bg-white px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto flex w-full items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-[-0.03em]">
            <Image src="/logo-on-black.svg" alt="Brick AI" width={32} height={32} />
            Brick AI
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">
            <Check className="h-3.5 w-3.5" />
            Access granted
          </div>
        </div>
      </nav>

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md text-center">
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-8 flex flex-col items-center gap-4"
          >
            <div className="relative">
              <div className="rounded-[24px] bg-black p-3">
                <Image src="/logo-on-black.svg" alt="Brick AI" width={72} height={72} className="rounded-2xl" />
              </div>
              <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-green-500">
                <LockOpen className="h-3.5 w-3.5 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-black tracking-tight">Gate unlocked.</h1>
            <p className="text-[#6B6B6B]">Access has been granted. Welcome in.</p>
          </motion.div>

          <motion.div
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.08, duration: 0.3 }}
            className="mb-6 rounded-[24px] border border-[#E2E2E2] bg-white p-5 text-left shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold">Security summary</h2>
              <span className="rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-[11px] font-bold uppercase text-green-700">
                verified
              </span>
            </div>
            <div className="divide-y divide-[#EEEEEE]">
              {[
                {
                  icon: <MessageSquareText className="h-4 w-4" />,
                  title: 'Conversations',
                  desc: `${summary.conversations} messages exchanged`,
                  val: String(summary.conversations),
                },
                {
                  icon: <LockOpen className="h-4 w-4" />,
                  title: 'Gate Codes',
                  desc: `${summary.levelsCleared} passwords accepted`,
                  val: `${summary.levelsCleared}/3`,
                },
                {
                  icon: <Clock3 className="h-4 w-4" />,
                  title: 'Time Spent',
                  desc: formatDuration(summary.timeSpentSeconds),
                  val: formatTimer(summary.timeSpentSeconds),
                },
              ].map((row) => (
                <div key={row.title} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#E2E2E2] bg-[#F6F6F6] text-[#6B6B6B]">
                    {row.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold">{row.title}</div>
                    <div className="mt-0.5 text-xs text-[#6B6B6B]">{row.desc}</div>
                  </div>
                  <div className="text-sm font-bold">{row.val}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <Link
            href="/game"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-4 font-bold text-white transition hover:bg-[#333]"
          >
            Play again <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/waitlist"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#E2E2E2] bg-white py-4 font-bold text-black transition hover:bg-[#F6F6F6]"
          >
            Join the waitlist <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-xs text-[#AFAFAF]">
            Brick AI is the AI co-pilot for first-home buyers in Australia.
          </p>
        </div>
      </main>
    </div>
  )
}
