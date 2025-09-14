'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/api/auth";

const LogoutButton = () => {  
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logoutUser()
      router.push('/login');
    } catch (err) {
      console.log(err)
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
