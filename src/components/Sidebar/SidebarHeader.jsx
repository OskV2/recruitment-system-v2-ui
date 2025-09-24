'use client';
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

import { useGetUser } from '@/lib/queries/user';
import { useUserStore } from '@/stores/useUserStore';
import Link from 'next/link';
import { Separator } from '../ui/separator';

const SidebarHeader = ({ userId }) => {
  const { data: user, isLoading, error } = useGetUser(userId);

  //  Do I really need that
  if (isLoading || error) {
    return (
      <div className="flex flex-row items-center gap-3 pb-4 mb-4 h-14 border-b">
        <Avatar>
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/101113650?v=4"
            alt="Avatar image"
          />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center">
          <p className="text-base text-sidebar-primary-foreground">
            Name Surname
          </p>
          <p className="text-xs text-sidebar-foreground">Role</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Link
        href="/dashboard/profile"
        className="flex flex-row items-center gap-3 w-full p-2 mb-2 h-14 hover:bg-sidebar-accent cursor-pointer rounded-md"
      >
        <Avatar>
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/101113650?v=4"
            alt="Avatar Image"
          />
          <AvatarFallback>Usr</AvatarFallback>
        </Avatar>

        <div className="flex flex-col justify-center w-full min-w-0">
          <p className="text-base text-sidebar-primary-foreground truncate">
            {user.data.firstName} {user.data.lastName}
          </p>
          <p className="text-xs text-sidebar-foreground">
            Role: {user.data.roleId}
          </p>
        </div>
      </Link>
      <Separator className='mb-4' />
    </>
  );
};

export default SidebarHeader;
