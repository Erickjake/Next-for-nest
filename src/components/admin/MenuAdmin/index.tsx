'use client'

import { logoutAction } from "@/src/actions/login/logout-action";
import { cn } from "@/src/lib/utils";
import { CircleXIcon, FileTextIcon, HourglassIcon, HouseIcon, LogOutIcon, MenuIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { useEffect, useState } from "react";

export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();



  useEffect(() => {
    if (isOpen) {
      startTransition(() => {
        setIsOpen(false);
      });
    }
  }, [pathname, isOpen]);

  const navClasses = cn("flex flex-col", 'bg-slate-200 ', 'text-slate-900 rounded-lg', 'mb-8', 'sm:flex-row sm:items-center sm:h-12 sm:mb-12 sm:flex-wrap', 'gap-2 sm:gap-4', ''
    , !isOpen && 'h-10', !isOpen && 'overflow-hidden', 'sm:h-auto sm:overflow-visible'
  );
  const linkClasses = cn("text-lg font-medium", '[&>svg]:w-[16px] [&>svg]:h-[16px] px-4 py-2', 'flex items-center justify-start gap-2', 'rounded-md',
    'hover:bg-slate-300', 'transition-colors', 'cursor-pointer', 'h-10 shrink-0', 'hover:pointer');

  const openClasses = cn(linkClasses, 'text-slate-900', 'font-semibold', 'sm:hidden');
  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition(async () => {
      await logoutAction();
    });
  };

  return <nav className={navClasses}>
    <button className={openClasses} onClick={() => setIsOpen(!isOpen)}>{!isOpen && (
      <>
        <MenuIcon />
        Menu
      </>
    )}{isOpen && (
      <>
        <CircleXIcon />
        Fechar
      </>
    )}
    </button>

    < a className={linkClasses} href="/" target="_blank"><HouseIcon className="inline-block mr-2" />Home</a>
    <Link className={linkClasses} href="/admin/post"><FileTextIcon className="inline-block mr-2" />Posts</Link>
    <Link className={linkClasses} href="/admin/post/new"><PlusIcon className="inline-block mr-2" />Criar Posts</Link>
    <a onClick={handleLogout} className={linkClasses} href='#'>
      {isPending && (
        <>
          <HourglassIcon />
        </>
      )}
      {!isPending && (
        <>
          <LogOutIcon />
        </>
      )}
    </a>
  </nav>;
}
