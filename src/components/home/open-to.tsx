'use client'

import { BriefcaseIcon } from 'lucide-react'

import { strings } from '@/lib/strings'

function OpenTo() {
  const roles = strings.homepage['about-me']['open-to-roles']

  return (
    <div className='flex flex-col gap-6 rounded-2xl p-4 shadow-feature-card ring-1 [box-shadow:var(--shadow-feature-card),0_0_20px_-4px_rgb(255_255_255/0.12),0_0_40px_-12px_rgb(255_255_255/0.06)] ring-white/10 transition-shadow duration-300 hover:[box-shadow:var(--shadow-feature-card),0_0_24px_-4px_rgb(255_255_255/0.18),0_0_48px_-12px_rgb(255_255_255/0.09)] lg:p-6 dark:[box-shadow:var(--shadow-feature-card),0_0_24px_-4px_rgb(255_255_255/0.1),0_0_48px_-12px_rgb(255_255_255/0.05)] dark:ring-white/15 dark:hover:[box-shadow:var(--shadow-feature-card),0_0_28px_-4px_rgb(255_255_255/0.15),0_0_56px_-12px_rgb(255_255_255/0.08)]'>
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
