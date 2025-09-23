'use client';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/api/auth';
import { LogOut } from 'lucide-react';
import { Separator } from '../ui/separator';

const SidebarFooter = () => {
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logoutUser();
      router.push('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <Separator className='mt-auto' />
    <div className="flex items-center gap-3 mt-2 p-2 rounded-md text-sidebar-foreground text-base hover:bg-sidebar-accent cursor-pointer" onClick={handleLogout}>
      <LogOut size={18}/>
      Sign Out
    </div>
    </>
  );
};

export default SidebarFooter;
