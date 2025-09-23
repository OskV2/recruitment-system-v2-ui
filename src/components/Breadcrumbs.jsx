'use client';
import React from 'react';
import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { usePathname } from 'next/navigation';

export function Breadcrumbs() {
  const pathname = usePathname();

  const result = pathname  //  Pathname usually looks like this: '/dashboard/create-job-offer'
    .split('/')  //  Split by /
    .filter(Boolean)  //  Delete empty strings
    .map(item => {  //  Return object instead of regular array
      return {
        route: item,  //  Path for navigation
        text: item.split('-').join(' ')  //  Formatted text, so instead of 'create-job-offer' it will be 'create job offer'
      }
    })

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {result.map((item, index, array) => {
          if (index === array.length - 1) {
            return (
              <BreadcrumbItem key={item.route}>
                <BreadcrumbPage className='first-letter:uppercase'>{item.text}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          } else {
            return (
              <React.Fragment key={item.route}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link className='first-letter:uppercase' href={`/${item.route}`}>{item.text}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
