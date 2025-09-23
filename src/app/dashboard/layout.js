import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Sidebar from '@/components/Sidebar/Sidebar';
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Separator } from "@/components/ui/separator";

const dashboardLayout = async ({ children }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userId = cookieStore.get("user")?.value
  if (!token) redirect("/login");

  return (
    <>
      <div className='flex flex-row h-full'>
        <Sidebar userId={userId}/>
        <div className='flex flex-col w-full p-4'>
          <div className='flex flex-col justify-center h-14 pb-4'>
            <div className='flex flex-row justify-between'>
              <Breadcrumbs />
              <p>Something different here (top right)</p>
            </div>
          </div>
          <Separator className='mb-4' />
          {children}
        </div>
      </div>
    </>
  );
};

export default dashboardLayout;
