'use client'

import { BriefcaseIcon } from 'lucide-react'

import { strings } from '@/lib/strings'

function OpenTo() {
  const roles = strings.homepage['about-me']['open-to-roles']

  return (
    <div className='flex flex-col gap-6 rounded-2xl p-4 shadow-feature-card lg:p-6'>
      <div className='flex items-center gap-2'>
        <BriefcaseIcon className='size-4.5' />
        <h2 className='text-sm'>{strings.homepage['about-me']['open-to']}</h2>
      </div>
      <ul className='flex flex-wrap gap-2'>
        {roles.map((role) => (
          <li key={role} className='rounded-lg bg-muted/60 px-3 py-1.5 text-sm font-medium text-foreground'>
            {role}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default OpenTo
