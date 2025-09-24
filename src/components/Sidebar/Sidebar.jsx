import SidebarGroup from './SidebarGroup';
import SidebarItem from './SidebarItem';
import SidebarHeader from './SidebarHeader';
import SidebarFooter from './SidebarFooter';

const firstGroup = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'house',
  },
  {
    title: 'Applications',
    href: '/dashboard/applications',
    icon: 'file-text',
  },
];

const secondGroup = [
  {
    title: 'Create',
    href: '/dashboard/create-job-offer',
    icon: 'plus',
  },
  {
    title: 'Manage',
    href: '/dashboard/manage-job-offers',
    icon: 'list',
  },
  {
    title: 'Company',
    href: '/dashboard/manage-company',
    icon: 'building',
  },
  {
    title: 'Processes',
    href: '/dashboard/recruitment-processes',
    icon: 'between-horizontal-start',
  },
  {
    title: 'Steps',
    href: '/dashboard/recruitment-steps',
    icon: 'cuboid',
  },
];

const thirdGroup = [
  {
    title: 'Users',
    href: '/dashboard/users',
    icon: 'users',
  },
  {
    title: 'Roles',
    href: '/dashboard/roles',
    icon: 'shield-user',
  },
];

const fourthGroup = [
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: 'settings',
  },
  {
    title: 'Logs',
    href: '/dashboard/logs',
    icon: 'logs',
  },
];

const DashboardSidebar = ({ userId }) => {
  return (
    <div className="flex flex-col bg-sidebar h-full pt-2 pb-4 px-4 min-w-56 max-w-56 border">
      
      <SidebarHeader userId={userId} />

      <div className='overflow-y-scroll'>
        <SidebarGroup groupTitle="MAIN">
          {firstGroup.map((item) => (
            <SidebarItem
            title={item.title}
            href={item.href}
            icon={item.icon}
            key={item.title}
            />
          ))}
        </SidebarGroup>

        <SidebarGroup groupTitle="JOB OFFERS">
          {secondGroup.map((item) => (
            <SidebarItem
            title={item.title}
            href={item.href}
            icon={item.icon}
            key={item.title}
            />
          ))}
        </SidebarGroup>

        <SidebarGroup groupTitle="USERS">
          {thirdGroup.map((item) => (
            <SidebarItem
            title={item.title}
            href={item.href}
            icon={item.icon}
            key={item.title}
            />
          ))}
        </SidebarGroup>

        <SidebarGroup groupTitle="SYSTEM">
          {fourthGroup.map((item) => (
            <SidebarItem
            title={item.title}
            href={item.href}
            icon={item.icon}
            key={item.title}
            />
          ))}
        </SidebarGroup>
      </div>
      
      


      <SidebarFooter />
    </div>
  );
};

export default DashboardSidebar;

// Logo

// Dashboard
// Applications

// Add new job offer -> View saved drafts
// Manage job offers
// Recruitment Processes
// Recruitment Steps
// Manage company details -> Locations, Contract types, FTE's, Full Time Equivalents

//  --- Users
// Manage users
// Manage roles

// Logs
