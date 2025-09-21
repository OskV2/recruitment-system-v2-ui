import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Sidebar from '@/components/Sidebar/Sidebar';
import LogoutButton from "@/components/LogoutButton";

const dashboardLayout = async ({ children }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) redirect("/login");

  return (
    <>
      <div className='flex flex-row h-full'>
        <Sidebar />
        <div className='flex flex-col w-full p-6'>
          <div className='flex flex-row'>
            <p>Search / breadcrumbs here</p>
            <p>Something different here (top right)</p>
            <LogoutButton />  
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default dashboardLayout;
