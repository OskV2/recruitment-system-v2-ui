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
      'flex flex-row items-center gap-3 mb-1 text-sidebar-foreground text-base p-1.5 rounded-md hover:bg-sidebar-accent',
      isActive
      ? 'bg-gradient-to-r from-[var(--sidebar-primary)]/30 from-25% to-[var(--sidebar)] text-sidebar-primary-foreground'
      : ''
    )} 
    href={href} 
    >
      <DynamicIcon name={icon} color={ isActive ? '#fff' : '#959499'} size={18} />
      {title}
    </Link>
  );
};

export default DashboardItem;
