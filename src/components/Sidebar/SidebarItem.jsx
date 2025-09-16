'use client'

import { DynamicIcon } from 'lucide-react/dynamic';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const DashboardItem = ({ title, href, icon }) => {

  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link className={cn(
      'flex flex-row items-center gap-4 mb-2 text-sidebar-foreground text-base p-2 rounded-md hover:bg-sidebar-accent',
      isActive
      ? 'bg-gradient-to-r from-[var(--sidebar-primary)]/25 from-25% to-[var(--sidebar)] text-sidebar-primary-foreground'
      : ''
    )} 
    href={href} 
    >
      <DynamicIcon name={icon} color={ isActive ? '#fff' : '#959499'} size={20} />
      {title}
    </Link>
  );
};

export default DashboardItem;
