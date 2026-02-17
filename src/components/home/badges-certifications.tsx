'use client'

import { AwardIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { Link } from '@/components/ui/link'
import { strings } from '@/lib/strings'

const SPEED = 3

const BADGES = [
  {
    src: '/images/alteryx.png',
    alt: 'Alteryx Designer Core Certification',
    href: 'https://www.credly.com/badges/73ed13cd-1805-49e8-b9e4-8f56b160c8e9/public_url',
  },
  {
    src: '/images/aws-cloudf.png',
    alt: 'AWS Academy Graduate - Cloud Foundations',
    href: 'https://www.credly.com/badges/51ca9dcc-5039-4776-97d2-89648f449378/linked_in_profile',
  },
  {
    src: '/images/aws-clouda.png',
    alt: 'AWS Academy Graduate - Cloud Architecting',
    href: 'https://www.credly.com/badges/78246c0b-a4aa-45c1-baa9-bf5338eaa5cc/linked_in_profile',
  },
  {
    src: '/images/aws-connect.png',
    alt: 'AWS Knowledge: Amazon Connect Developer',
    href: 'https://www.credly.com/badges/481fc280-fb00-4f2d-81d0-35eb8116f449/public_url',
  },
  {
    src: '/images/aws-ml.png',
    alt: 'AWS Academy Graduate - Machine Learning Foundations',
    href: 'https://www.credly.com/badges/183aafc9-cda8-4ab9-8c22-2423183a3c3f/public_url',
  },
  {
    src: '/images/google-da.png',
    alt: 'Google Data Analytics Professional Certificate',
    href: 'https://www.coursera.org/account/accomplishments/professional-cert/4BM525682BAA',
  },
] as const

const variants = {
  enter: {
    y: 100,
    opacity: 0,
  },
  center: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -100,
    opacity: 0,
  },
}

function BadgesCertifications() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BADGES.length)
    }, SPEED * 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPaused])

  const badge = BADGES[currentIndex]
  if (!badge) return null

  return (
    <div className='flex flex-col gap-6 overflow-hidden rounded-2xl p-4 shadow-feature-card lg:p-6'>
      <div className='flex items-center gap-2'>
        <AwardIcon className='size-4.5' />
        <h2 className='text-sm'>{strings.homepage['about-me']['badges-certifications']}</h2>
      </div>
      <div
        className='relative flex min-h-24 items-center justify-center overflow-hidden md:min-h-28'
        onMouseEnter={() => {
          setIsPaused(true)
        }}
        onMouseLeave={() => {
          setIsPaused(false)
        }}
      >
        <AnimatePresence mode='popLayout'>
          <motion.div
            key={currentIndex}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            layout
            transition={{
              type: 'tween',
              duration: 0.3,
            }}
            className='absolute flex items-center justify-center'
          >
            <Link href={badge.href} className='flex transition-opacity hover:opacity-90' title={badge.alt}>
              <Image
                src={badge.src}
                alt={badge.alt}
                width={112}
                height={112}
                className='size-24 rounded-lg object-contain md:size-28'
              />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default BadgesCertifications
