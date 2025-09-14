import DashboardHeader from '@/components/DashboardHeader';
import { Button } from '@/components/ui/button';

const dashboardPage = () => {
  return (
    <>
      <div className='flex flex-col'>
        <DashboardHeader />
        <div className="">
          <Button className="cursor-pointer">Click me</Button>
        </div>
      </div>
    </>
  );
};

export default dashboardPage;
