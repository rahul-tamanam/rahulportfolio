'use client'

import type { Project } from 'content-collections'

import { ArrowUpRightIcon, LightbulbIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

import BlurImage from '@/components/blur-image'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/components/ui/link'
import { strings } from '@/lib/strings'
import { cn } from '@/utils/cn'

const variants = {
  initial: {
    y: 40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
}

type CardProps = {
  project: Project
}

type SelectedProjectsProps = {
  projects: Project[]
}

function SelectedProjects(props: SelectedProjectsProps) {
  const { projects } = props
  const projectsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(projectsRef, { once: true, margin: '-100px' })

  return (
    <motion.div
      initial='initial'
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={projectsRef}
      transition={{
        duration: 0.5,
      }}
      className='relative my-24'
    >
      <motion.h2
        className='text-center text-3xl font-semibold'
        initial={{
          y: 30,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        {strings.homepage['selected-projects'].title}
      </motion.h2>
      <motion.div
        className='mt-12 grid gap-4 md:grid-cols-2'
        initial={{
          y: 40,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        {projects.map((project) => (
          <Card key={project.slug} project={project} />
        ))}
      </motion.div>
      <div className='my-8 flex items-center justify-center'>
        <Link href='/projects' className={cn(buttonVariants({ variant: 'outline' }))}>
          {strings.homepage['selected-projects'].more}
        </Link>
      </div>
    </motion.div>
  )
}

function Card(props: CardProps) {
  const { project } = props
  const { slug, name, description } = project

  return (
    <Link key={slug} href={`/projects/${slug}`} className='group relative rounded-2xl p-2 shadow-feature-card'>
      <div className='flex items-center justify-between p-4'>
        <div className='flex items-center gap-3'>
          <LightbulbIcon className='size-4.5' />
          <h2>{strings.homepage['selected-projects'].card}</h2>
        </div>
        <ArrowUpRightIcon className='size-4.5 opacity-0 transition-opacity group-hover:opacity-100' />
      </div>
      <div className='relative overflow-hidden rounded-lg'>
        <BlurImage
          width={1200}
          height={630}
          src={`/images/projects/${slug}/cover.png`}
          alt={description}
          className='rounded-lg'
          lazy={false}
          fetchPriority='high'
        />
        {/* Mobile: taller dark gradient so wrapped text stays inside readable area */}
        <div
          className='absolute inset-0 rounded-b-lg md:hidden'
          style={{
            backgroundImage:
              'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.12) 75%, transparent 100%)',
          }}
          aria-hidden
        />
        {/* Desktop: original gradient */}
        <div
          className='absolute inset-0 hidden rounded-b-lg md:block'
          style={{
            backgroundImage:
              'linear-gradient(to top, rgba(0,0,0,0.88) 25%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.2) 50%, transparent 100%)',
          }}
          aria-hidden
        />
        <div className='absolute inset-x-4 bottom-4 flex flex-col transition-[left] ease-out group-hover:left-8 sm:inset-x-7 sm:bottom-6'>
          <h3 className='text-xl font-semibold text-white drop-shadow-sm sm:text-2xl'>{name}</h3>
          <p className='mt-1.5 text-sm text-neutral-200 drop-shadow-sm sm:mt-2 sm:text-base dark:text-muted-foreground'>
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default SelectedProjects
