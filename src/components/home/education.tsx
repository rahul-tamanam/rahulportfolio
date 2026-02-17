'use client'

import { ChevronDownIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import Image from 'next/image'
import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { strings } from '@/lib/strings'
import { cn } from '@/utils/cn'

type EducationEntry = {
  id: string
  degree: string
  university: string
  gpa: string
  dates: string
  logoPlaceholder: string
  logoSrc?: string
  /** Override logo image styling - e.g. 'size-full object-contain' for different aspect ratios */
  logoImageClassName?: string
  coursework: string[]
  showCoursework: boolean
}

const educationEntries = strings.homepage.education.entries
const EDUCATION_ENTRIES: Array<Omit<EducationEntry, 'showCoursework'>> = [
  {
    id: '1',
    degree: educationEntries[0]!.degree,
    university: educationEntries[0]!.university,
    gpa: educationEntries[0]!.gpa,
    dates: educationEntries[0]!.dates,
    logoPlaceholder: 'UTD',
    logoSrc: '/images/education/utd.png',
    logoImageClassName: 'size-full scale-140 object-contain',
    coursework: [...educationEntries[0]!.coursework],
    showCoursework: false,
  },
  {
    id: '2',
    degree: educationEntries[1]!.degree,
    university: educationEntries[1]!.university,
    gpa: educationEntries[1]!.gpa,
    dates: educationEntries[1]!.dates,
    logoPlaceholder: 'GVPCE',
    logoSrc: '/images/education/gvpce.png',
    logoImageClassName: 'size-full scale-108 object-contain',
    coursework: [...educationEntries[1]!.coursework],
    showCoursework: false,
  },
]

function EducationEntryRow({ entry }: { entry: Omit<EducationEntry, 'showCoursework'> }) {
  const [isCourseworkOpen, setIsCourseworkOpen] = useState(false)
  const hasCoursework = entry.coursework.length > 0

  return (
    <div className='flex flex-col items-center justify-center gap-6 border-b border-border/50 py-8 text-center first:pt-0 last:border-b-0 last:pb-0 md:flex-row md:items-start md:gap-4'>
      {/* Logo - fixed at top, no background when image, neon glow */}
      <div
        className={cn(
          'relative flex size-32 shrink-0 items-center justify-center overflow-hidden rounded-full md:size-40 md:self-start',
          entry.logoSrc ? 'bg-transparent' : 'bg-muted',
        )}
        style={
          entry.logoSrc
            ? {
                boxShadow:
                  '0 0 10px rgba(255,255,255,0.6), 0 0 24px rgba(255,255,255,0.4), 0 0 36px rgba(255,255,255,0.2)',
              }
            : undefined
        }
      >
        {entry.logoSrc ? (
          <Image
            src={entry.logoSrc}
            alt={`${entry.university} logo`}
            width={160}
            height={160}
            className={entry.logoImageClassName ?? 'size-full object-contain'}
          />
        ) : (
          <span className='text-2xl font-semibold text-muted-foreground md:text-3xl'>{entry.logoPlaceholder}</span>
        )}
      </div>

      {/* Details */}
      <div className='flex min-w-0 flex-1 flex-col items-center text-center md:items-center'>
        <h3 className='text-base font-semibold text-foreground md:text-lg'>{entry.degree}</h3>
        <p className='mt-0.5 text-base text-muted-foreground'>{entry.university}</p>
        <p className='mt-1 text-base text-muted-foreground'>{entry.gpa}</p>
        <p className='mt-1 text-base text-muted-foreground'>{entry.dates}</p>

        {hasCoursework && (
          <div className='mt-4 flex w-full flex-col items-start'>
            <div className='flex w-full justify-center'>
              <Button
                variant='ghost'
                size='xs'
                className='h-auto gap-1 p-0 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline'
                onClick={() => {
                  setIsCourseworkOpen(!isCourseworkOpen)
                }}
                aria-expanded={isCourseworkOpen}
              >
                {isCourseworkOpen
                  ? strings.homepage.education['hide-coursework']
                  : strings.homepage.education['show-coursework']}
                <ChevronDownIcon className={cn('size-4 transition-transform', isCourseworkOpen && 'rotate-180')} />
              </Button>
            </div>

            {isCourseworkOpen && (
              <ul className='mt-3 w-full list-disc space-y-1.5 pl-6 text-left'>
                {entry.coursework.map((course, index) => (
                  <li key={index} className='text-base text-muted-foreground'>
                    {course}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function Education() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <motion.section
      ref={sectionRef}
      className='relative my-24'
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className='text-center text-3xl font-semibold md:text-4xl'>{strings.homepage.education.title}</h2>

      <div className='mt-12 rounded-2xl p-6 shadow-feature-card lg:p-8'>
        {EDUCATION_ENTRIES.map((entry) => (
          <EducationEntryRow key={entry.id} entry={entry} />
        ))}
      </div>
    </motion.section>
  )
}

export default Education
