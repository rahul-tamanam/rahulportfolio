'use client'

import { DownloadIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import BlurImage from '@/components/blur-image'
import { MY_NAME } from '@/lib/constants'
import { strings } from '@/lib/strings'

const TEXTS = [
  {
    // i18n-check t('homepage.hero.amazing')
    key: 'amazing',
    className: 'bg-clip-text text-center text-transparent bg-linear-to-r from-[#ff1835] to-[#ffc900]',
  },
  {
    // i18n-check t('homepage.hero.stunning')
    key: 'stunning',
    className: 'bg-clip-text text-center text-transparent bg-linear-to-r from-[#0077ff] to-[#00e7df]',
  },
  {
    // i18n-check t('homepage.hero.fantastic')
    key: 'fantastic',
    className: 'bg-clip-text text-center text-transparent bg-linear-to-r from-[#7f00de] to-[#ff007f]',
  },
  {
    // i18n-check t('homepage.hero.attractive')
    key: 'attractive',
    className: 'bg-clip-text text-center text-transparent bg-linear-to-r from-[#2ecc70] to-[#1ca085]',
  },
] as const

const SPEED = 3

const variants = {
  enter: {
    x: -24,
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: 24,
    opacity: 0,
  },
}

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TEXTS.length)
    }, SPEED * 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const textItem = TEXTS[currentIndex]
  if (!textItem) return null

  return (
    <div className='my-16 space-y-6'>
      <div className='flex justify-between gap-8'>
        <div className='flex flex-col gap-4'>
          <h1 className='flex flex-col flex-wrap gap-2 text-2xl font-semibold sm:text-4xl'>
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ ease: 'easeOut' }}>
              {strings.homepage.hero['title-top']}
            </motion.div>
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ease: 'easeOut' }}
              className='flex flex-wrap items-baseline gap-x-1.5 text-left'
            >
              <motion.span layout key='title-middle-left'>
                {strings.homepage.hero['title-middle-left']}
              </motion.span>
              <div className='relative inline-block overflow-hidden pb-[0.2em] align-baseline'>
                <AnimatePresence mode='popLayout'>
                  <motion.span
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
                    className='align-baseline whitespace-nowrap'
                  >
                    <span className={textItem.className}>{strings.homepage.hero[textItem.key]}</span>
                  </motion.span>
                </AnimatePresence>
              </div>
              <motion.span layout key='title-middle-right'>
                {strings.homepage.hero['title-middle-right']}
              </motion.span>
            </motion.div>
            <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ ease: 'easeOut' }}>
              {strings.homepage.hero['title-bottom']}
            </motion.div>
          </h1>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: 'easeOut' }}
            className='text-sm text-muted-foreground'
          >
            {strings.homepage.hero['location-timezone']}
          </motion.div>
          <motion.a
            href='/resume.pdf'
            download='Rahul-Tamanam-Resume.pdf'
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: 'easeOut' }}
            className='group relative -mt-4 inline-flex min-w-24 shrink-0 self-start overflow-hidden rounded-full p-0.5 [box-shadow:0_0_12px_2px_rgb(255_126_0/0.6),0_0_24px_8px_rgb(255_87_87/0.4)] transition-transform hover:scale-105'
          >
            <span className='absolute inset-0 rounded-full bg-[linear-gradient(90deg,#FF7E00,#FF5757)]' aria-hidden />
            <span className='relative z-10 flex flex-1 items-center justify-center gap-2 rounded-full bg-background px-4 py-2 text-base font-medium text-foreground transition-[background-color,color,text-shadow] duration-300 group-hover:bg-transparent group-hover:text-white group-hover:[text-shadow:0_1px_3px_rgba(0,0,0,0.6)]'>
              <DownloadIcon className='size-4 shrink-0' aria-hidden />
              {strings.homepage.hero['hire-me']}
            </span>
          </motion.a>
        </div>
        <motion.div
          className='relative size-20 shrink-0 md:size-44'
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          <BlurImage
            src='/images/picture.png'
            className='size-full overflow-hidden rounded-full'
            imageClassName='size-full rounded-full object-cover object-[40%_50%]'
            width={1024}
            height={1024}
            alt={`${MY_NAME}'s Logo`}
            lazy={false}
          />
          <div className='absolute inset-0 -z-10 bg-linear-to-tl from-purple-700 to-orange-700 opacity-50 blur-2xl' />
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
