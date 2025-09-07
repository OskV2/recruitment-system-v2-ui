import Sidebar from '@/components/Sidebar/Sidebar';

const dashboardLayout = ({ children }) => {
  return (
    <>
      <div className='flex flex-row h-full'>
        <Sidebar />
        <div className='flex flex-col'>
          <div className='flex flex-row'>
            <p>Search bar here</p>
            <p>Something different here (top right)</p>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default dashboardLayout;
