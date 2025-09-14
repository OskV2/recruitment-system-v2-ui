'use client';
import { useAuthStore } from '@/stores/useAuthStore';

const headings = [
  'Time to review some resumes!',
  'Long time no see... It started to get dusty here',
  'Go and grab some coffee before you start the work',
];

const DashboardHeader = () => {
  const { loggedUser } = useAuthStore();
  const item = headings[Math.floor(Math.random() * headings.length)];

  console.log(loggedUser)  

  return (
    <p>
      Hi, {loggedUser.name}! {item}.
    </p>
  );
};

export default DashboardHeader;
