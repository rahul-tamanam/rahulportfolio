import { LinkIcon } from 'lucide-react'

import { Link } from '@/components/ui/link'
import { SOCIAL_LINKS } from '@/config/links'
import { strings } from '@/lib/strings'

function Connect() {
  return (
    <div className='flex flex-col gap-6 rounded-2xl p-4 shadow-feature-card ring-1 [box-shadow:var(--shadow-feature-card),0_0_20px_-4px_rgb(255_255_255/0.12),0_0_40px_-12px_rgb(255_255_255/0.06)] ring-white/10 transition-shadow duration-300 hover:[box-shadow:var(--shadow-feature-card),0_0_24px_-4px_rgb(255_255_255/0.18),0_0_48px_-12px_rgb(255_255_255/0.09)] lg:p-6 dark:[box-shadow:var(--shadow-feature-card),0_0_24px_-4px_rgb(255_255_255/0.1),0_0_48px_-12px_rgb(255_255_255/0.05)] dark:ring-white/15 dark:hover:[box-shadow:var(--shadow-feature-card),0_0_28px_-4px_rgb(255_255_255/0.15),0_0_56px_-12px_rgb(255_255_255/0.08)]'>
      <div className='flex items-center gap-2'>
        <LinkIcon className='size-4.5' />
        <h2 className='text-sm'>{strings.homepage['about-me'].connect}</h2>
      </div>
      <div className='flex flex-col gap-4 px-2'>
        {SOCIAL_LINKS.map((link) => {
          const { href, title, icon } = link

          return (
            <Link
              key={href}
              href={href}
              className='flex w-fit items-center gap-3 text-muted-foreground transition-colors hover:text-foreground [&>svg]:size-4.5'
            >
              {icon}
              <h3>{title}</h3>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Connect
