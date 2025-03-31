import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  if (userId) {
    redirect('/home');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <main className="max-w-2xl text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
          Chase busters
        </h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
          Your personal finance companion that helps you track, analyze, and optimize your spending habits.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/home"
            className="rounded-full bg-foreground px-6 py-3 text-background hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/sign-up"
            className="rounded-full border border-foreground/10 px-6 py-3 hover:bg-foreground/5 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
}
