import Sidebar from '@/components/Sidebar/Sidebar';

const dashboardLayout = ({ children }) => {
  return (
    <>
      <div className='flex flex-row h-full gap-6'>
        <Sidebar />
        <div className='flex flex-col w-full'>
          <div className='flex flex-row'>
            <p>Search / breadcrumbs here</p>
            <p>Something different here (top right)</p>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default dashboardLayout;
