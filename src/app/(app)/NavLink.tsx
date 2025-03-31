"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function NavLink({
  name,
  href,
 }: {
    name: string;
    href: string;
}) {
  const pathname = usePathname();
  const linkClassName = useMemo(() => {
    const active = href === pathname;
    return cn(
      'text-sm tracking-wide pb-[calc(var(--spacing)_*_0.4)]',
      'transition-colors duration-200 hover:text-white',
      'text-gray-300',
      active && 'text-gray-100',
    );
  }, [href, pathname]);
  return (
    <li key={href}>
      <Link
        href={href}
        className={linkClassName}
      >
        {name}
      </Link>
    </li>
  );
}
