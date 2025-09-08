import { Button } from '@/components/ui/button';
const dashboardPage = () => {
  return (
    <>
      <div className='flex flex-col'>
        <p>Hi, (logged user)!</p>
        <div className="">
          <Button className="cursor-pointer">Click me</Button>
        </div>
      </div>
    </>
  );
};

export default dashboardPage;
