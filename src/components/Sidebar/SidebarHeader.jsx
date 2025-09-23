'use client'
import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'

import { useGetUser } from '@/lib/queries/user'
import { useUserStore } from '@/stores/useUserStore'

const SidebarHeader = ({ userId }) => {
  const {data: user, isLoading, error} = useGetUser(userId)

  console.log(user)

  if (isLoading || error) {
    return (
      <div className='flex flex-row items-center gap-3 pb-4 mb-4 h-14 border-b'>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='flex flex-col justify-center'>
          <p className='text-base text-sidebar-primary-foreground'>Name Surname</p>
          <p className='text-xs text-sidebar-foreground'>Role</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-row items-center gap-3 pb-4 mb-4 h-14 border-b'>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className='flex flex-col justify-center'>
        <p className='text-base text-sidebar-primary-foreground'>{user.data.firstName} {user.data.lastName}</p>
        <p className='text-xs text-sidebar-foreground'>Role: {user.data.roleId}</p>
      </div>
    </div>
  )
}

export default SidebarHeader