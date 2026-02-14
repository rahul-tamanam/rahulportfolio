'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

import { strings } from '@/lib/strings'
import { cn } from '@/utils/cn'

type Experience = {
  id: string
  title: string
  location: string
  description: string
  startYear: string
  endYear: string
}

const careerHistory = strings.homepage['career-history']
const EXPERIENCES: Experience[] = [
  {
    id: '1',
    title: careerHistory.experiences[0]!.title,
    location: careerHistory.experiences[0]!.location,
    description: careerHistory.experiences[0]!.description,
    startYear: 'April 2025',
    endYear: careerHistory.present,
  },
  {
    id: '2',
    title: careerHistory.experiences[1]!.title,
    location: careerHistory.experiences[1]!.location,
    description: careerHistory.experiences[1]!.description,
    startYear: 'February 2024',
    endYear: 'May 2024',
  },
]

const cardVariants = (fromLeft: boolean) => ({
  initial: {
    x: fromLeft ? -60 : 60,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
})

const cardContent = (experience: Experience) => (
  <>
    <h3 className='font-semibold text-foreground'>{experience.title}</h3>
    <p className='mt-1 text-sm text-muted-foreground'>{experience.location}</p>
    <p className='mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground'>
      {experience.description}
    </p>
  </>
)

function TimelineCard({
  experience,
  index,
}: {
  experience: Experience
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })
  const fromLeft = index % 2 === 0

  return (
    <motion.div
      ref={cardRef}
      className='relative flex flex-col items-stretch gap-3 py-4 md:flex-row md:items-center md:gap-0 md:py-6'
      initial='initial'
      animate={isInView ? 'animate' : 'initial'}
      variants={cardVariants(fromLeft)}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Mobile: single column — dot, date, then full-width card */}
      <div className='flex flex-col gap-2 md:hidden'>
        <div className='flex items-center gap-3'>
          <div
            className='size-4 shrink-0 rounded-full'
            style={{
              background:
                'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.12) 80%, transparent)',
              boxShadow:
                '0 0 10px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.5), 0 0 32px rgba(255,255,255,0.3)',
            }}
            aria-hidden
          />
          <span className='text-xs font-medium text-muted-foreground'>
            {experience.startYear} – {experience.endYear}
          </span>
        </div>
        <div className='w-full rounded-2xl bg-card p-5 shadow-feature-card ring-1 ring-border/50'>
          {cardContent(experience)}
        </div>
      </div>

      {/* Desktop: alternating left/center/right timeline */}
      {/* Left section: card or date */}
      <div
        className={cn(
          'hidden min-w-0 flex-1 items-center md:flex',
          fromLeft ? 'justify-end' : 'justify-end pr-0 md:pr-8',
        )}
      >
        {fromLeft ? (
          <div className='w-full max-w-xl rounded-2xl bg-card p-5 shadow-feature-card ring-1 ring-border/50 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg'>
            {cardContent(experience)}
          </div>
        ) : (
          <div className='text-end text-sm font-medium text-muted-foreground'>
            {experience.startYear} – {experience.endYear}
          </div>
        )}
      </div>

      {/* Center: icon + line */}
      <div
        className={cn(
          'relative z-10 hidden flex-1 items-center md:flex md:min-w-0',
          fromLeft ? 'md:flex-row' : 'md:flex-row-reverse',
        )}
      >
        <div className='h-px flex-1 bg-border' aria-hidden />
        <div
          className='size-6 shrink-0 rounded-full'
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.12) 80%, transparent)',
            boxShadow:
              '0 0 10px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.5), 0 0 32px rgba(255,255,255,0.3)',
          }}
          aria-hidden
        />
        <div className='flex-1' aria-hidden />
      </div>

      {/* Right section: date or card */}
      <div
        className={cn(
          'hidden min-w-0 flex-1 items-center md:flex',
          fromLeft ? 'justify-start pl-0 md:pl-8' : 'justify-start',
        )}
      >
        {fromLeft ? (
          <div className='text-start text-sm font-medium text-muted-foreground'>
            {experience.startYear} – {experience.endYear}
          </div>
        ) : (
          <div className='w-full max-w-xl rounded-2xl bg-card p-5 shadow-feature-card ring-1 ring-border/50 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg'>
            {cardContent(experience)}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function CareerHistory() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <motion.section
      id='experience'
      ref={sectionRef}
      className='relative my-24'
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className='text-center text-3xl font-semibold'>{strings.homepage['career-history'].title}</h2>

      <div className='relative mt-12'>
        {/* Vertical timeline line */}
        <div className='absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block' />

        <div className='flex flex-col gap-0'>
          {EXPERIENCES.map((experience, index) => (
            <TimelineCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default CareerHistory
