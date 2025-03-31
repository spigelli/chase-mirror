import type { Metadata } from 'next'
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { NavLink } from './NavLink';

export const metadata: Metadata = {
  title: 'ChaseBuster app',
  description: 'Descriptive description',
}

const links = [
  { name: 'Home', href: '/' },
  { name: 'Accounts', href: '/accounts' },
  { name: 'Transactions', href: '/transactions' },
];

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { userId } = await auth()
  const isSignedIn = !!userId
  if (!isSignedIn) {
    redirect('/sign-in')
  }
  return (
    <div className="flex flex-col h-screen relative">
      <Navbar
        links={links}
      />
      {/* Offset for the Navbar */}
      <div className="pt-16 h-full w-full">
        <main className="px-2 lg:px-6 h-full w-full relative">
          {children}
        </main>
      </div>
    </div>
  )
}

export function Navbar({
  links,
}: {
  links: {
    name: string,
    href: string,
  }[],
}) {

  return (
    <div className="absolute z-50 w-full h-full left-0 top-0 flex flex-col pointer-events-none">
      <nav className="h-16 w-full bg-gray-800 border-b border border-gray-900 text-white flex items-center justify-between px-4 pointer-events-auto drop-shadow-xl">
        <ul className="flex space-x-4">
          {links.map(link => (
            <NavLink {...link} key={link.href} />
          ))}
        </ul>
        <UserButton />
      </nav>
    </div>
  );
}
