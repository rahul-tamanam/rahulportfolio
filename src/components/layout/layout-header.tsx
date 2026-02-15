'use client'

import { HomeIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import ClientOnly from '@/components/client-only'
import { Link } from '@/components/ui/link'
import { IS_SERVER } from '@/lib/constants'
import { strings } from '@/lib/strings'

import MobileNav from './mobile-nav'
import Navbar from './navbar'
import ThemeSwitcher from './theme-switcher'

function LayoutHeader() {
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const rafRef = useRef<number | null>(null)

  function handleHomeClick(e: React.MouseEvent) {
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      globalThis.history.replaceState(null, '', '/')
    }
  }

  useEffect(() => {
    if (IS_SERVER) return

    const headerEl = headerRef.current
    if (!headerEl) return

    const currHeaderEl = headerEl

    function setScrolled() {
      const scrolled = window.scrollY > 100

      currHeaderEl.dataset.scrolled = scrolled ? 'true' : 'false'
    }

    function handleScroll() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(setScrolled)
    }

    setScrolled()

    document.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      ref={headerRef}
      className='fixed inset-x-0 top-4 z-40 mx-auto flex h-15 max-w-5xl items-center justify-between rounded-2xl bg-background/30 px-8 shadow-xs saturate-100 backdrop-blur-md transition-colors data-[scrolled=true]:bg-background/80'
    >
      <Link
        href='#skip-nav'
        className='fixed top-4 left-4 -translate-y-20 rounded-4xl border bg-background px-3 py-2 font-medium shadow-xs transition-transform focus-visible:translate-y-0 focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2'
      >
        <span>{strings.layout['skip-to-main-content']}</span>
      </Link>
      <Link
        href='/#skip-nav'
        onClick={handleHomeClick}
        className='flex items-center justify-center rounded-xl text-foreground transition-colors hover:text-foreground/80'
        aria-label={strings.common.labels.home}
      >
        <HomeIcon className='size-5 shrink-0' aria-hidden />
      </Link>
      <div className='flex items-center gap-2'>
        <Navbar />
        <ClientOnly
          placeholder={
            <>
              <span className='size-9' aria-hidden />
              <span className='size-9 md:hidden' aria-hidden />
            </>
          }
        >
          <ThemeSwitcher />
          <MobileNav />
        </ClientOnly>
      </div>
    </header>
  )
}

export default LayoutHeader
