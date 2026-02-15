'use client'

import {
  SiApachehadoop,
  SiApachehive,
  SiApachespark,
  SiCloudera,
  SiCss,
  SiDjango,
  SiDocker,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiR,
  SiReact,
} from '@icons-pack/react-simple-icons'
import { ZapIcon } from 'lucide-react'

import { Marquee } from '@/components/ui/marquee'
import { strings } from '@/lib/strings'
import { cn } from '@/utils/cn'

const iconClassName = 'size-10 shrink-0'

// Top row: Python, R, MySQL, Pyspark, Hadoop (HDFS), Hive, Impala, Postgres, Mongo
const TOP_STACKS = [
  { Icon: SiPython, label: 'Python' },
  { Icon: SiR, label: 'R' },
  { Icon: SiMysql, label: 'MySQL' },
  { Icon: SiApachespark, label: 'PySpark' },
  { Icon: SiApachehadoop, label: 'Hadoop (HDFS)' },
  { Icon: SiApachehive, label: 'Hive' },
  { Icon: SiCloudera, label: 'Impala' },
  { Icon: SiPostgresql, label: 'Postgres' },
  { Icon: SiMongodb, label: 'Mongo' },
]

// Second row: Docker, React, JavaScript, Node, HTML, CSS, Django, PowerBI, Tableau, Excel
const SECOND_STACKS = [
  { Icon: SiDocker, label: 'Docker' },
  { Icon: SiReact, label: 'React' },
  { Icon: SiJavascript, label: 'JavaScript' },
  { Icon: SiNodedotjs, label: 'Node' },
  { Icon: SiHtml5, label: 'HTML' },
  { Icon: SiCss, label: 'CSS' },
  { Icon: SiDjango, label: 'Django' },
  { label: 'PowerBI' },
  { label: 'Tableau' },
  { label: 'Excel' },
]

function StackItem({ item }: { item: { Icon?: React.ComponentType<{ className?: string }>; label: string } }) {
  if (item.Icon) {
    return <item.Icon className={iconClassName} aria-label={item.label} />
  }
  return (
    <span
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-sm px-1.5 text-xs font-medium text-muted-foreground',
      )}
      title={item.label}
    >
      {item.label}
    </span>
  )
}

function StacksCard() {
  return (
    <div className='flex h-60 flex-col gap-2 overflow-hidden rounded-2xl p-4 shadow-feature-card ring-1 [box-shadow:var(--shadow-feature-card),0_0_20px_-4px_rgb(255_255_255/0.12),0_0_40px_-12px_rgb(255_255_255/0.06)] ring-white/10 transition-shadow duration-300 hover:[box-shadow:var(--shadow-feature-card),0_0_24px_-4px_rgb(255_255_255/0.18),0_0_48px_-12px_rgb(255_255_255/0.09)] lg:p-6 dark:[box-shadow:var(--shadow-feature-card),0_0_24px_-4px_rgb(255_255_255/0.1),0_0_48px_-12px_rgb(255_255_255/0.05)] dark:ring-white/15 dark:hover:[box-shadow:var(--shadow-feature-card),0_0_28px_-4px_rgb(255_255_255/0.15),0_0_56px_-12px_rgb(255_255_255/0.08)]'>
      <div className='flex items-center gap-2'>
        <ZapIcon className='size-4.5' />
        <h2 className='text-sm'>{strings.homepage['about-me'].skills}</h2>
      </div>
      <Marquee gap='20px' className='py-4'>
        {TOP_STACKS.map((item) => (
          <StackItem key={item.label} item={item} />
        ))}
      </Marquee>
      <Marquee gap='20px' className='py-4' reverse>
        {SECOND_STACKS.map((item) => (
          <StackItem key={item.label} item={item} />
        ))}
      </Marquee>
    </div>
  )
}

export default StacksCard
