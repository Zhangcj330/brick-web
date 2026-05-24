import { NextRequest, NextResponse } from "next/server";

const LEVEL_PASSWORDS = ["0221", "3147", "8095"] as const;

export async function POST(req: NextRequest) {
  try {
    const { level, password } = await req.json();
    const levelNumber = typeof level === "number" ? level : Number(level);
    const levelIndex = Number.isInteger(levelNumber) ? levelNumber - 1 : -1;

    if (levelIndex < 0 || levelIndex >= LEVEL_PASSWORDS.length || typeof password !== "string") {
      return NextResponse.json({ unlocked: false }, { status: 400 });
    }

    const unlocked = password === LEVEL_PASSWORDS[levelIndex];
    const completed = unlocked && levelIndex === LEVEL_PASSWORDS.length - 1;

    return NextResponse.json({
      unlocked,
      completed,
      nextLevel: unlocked && !completed ? levelIndex + 2 : undefined,
    });
  } catch {
    return NextResponse.json({ unlocked: false }, { status: 400 });
  }
}
