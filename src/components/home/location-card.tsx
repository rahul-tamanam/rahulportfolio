'use client'

import createGlobe from 'cobe'
import { MapPinIcon } from 'lucide-react'
import { useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'

import { strings } from '@/lib/strings'

function LocationCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const fadeMask = 'radial-gradient(circle at 50% 50%, rgb(0, 0, 0) 60%, rgb(0, 0, 0, 0) 70%)'

  const rotation = useMotionValue(0)
  const springRotation = useSpring(rotation, {
    stiffness: 280,
    damping: 40,
    mass: 1,
  })

  // Dallas, Texas coordinates - used for initial view and marker
  const DALLAS_LAT = 32.7767
  const DALLAS_LONG = -96.797

  useEffect(() => {
    let width = 0

    function onResize() {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }

    onResize()
    window.addEventListener('resize', onResize)

    if (!canvasRef.current) return

    // Convert Dallas lat/long to globe phi/theta so the view centers on Dallas
    const locationToAngles = (lat: number, long: number) => {
      const phi = Math.PI - ((long * Math.PI) / 180 - Math.PI / 2)
      const theta = (lat * Math.PI) / 180
      return [phi % (Math.PI * 2), theta] as const
    }
    const [dallasPhi, dallasTheta] = locationToAngles(DALLAS_LAT, DALLAS_LONG)
    // Slightly reduce theta so Dallas appears more centered vertically in the card (not at bottom)
    const viewTheta = dallasTheta * 0.5

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: dallasPhi,
      theta: viewTheta,
      dark: 1,
      diffuse: 2,
      mapSamples: 16_000,
      mapBrightness: 2,
      baseColor: [0.8, 0.8, 0.8],
      markerColor: [1, 1, 1],
      glowColor: [0.5, 0.5, 0.5],
      markers: [{ location: [DALLAS_LAT, DALLAS_LONG], size: 0.1 }],
      scale: 1.05,
      offset: [0, -40],
      onRender: (state) => {
        state.phi = dallasPhi + springRotation.get()
        state.theta = viewTheta
        state.width = width * 2
        state.height = width * 2
      },
    })

    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [springRotation, DALLAS_LAT, DALLAS_LONG])

  return (
    <div className='relative flex h-60 flex-col gap-6 overflow-hidden rounded-2xl p-4 shadow-feature-card lg:p-6'>
      <div className='flex items-center gap-2'>
        <MapPinIcon className='size-4.5' />
        <h2 className='text-sm'>{strings.homepage['about-me'].location}</h2>
      </div>
      <div className='absolute inset-x-0 -bottom-44 mx-auto aspect-square h-84 lg:-bottom-48 lg:h-96'>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            placeItems: 'center',
            placeContent: 'center',
            overflow: 'visible',
          }}
        >
          <div
            style={{
              width: '100%',
              aspectRatio: '1/1',
              maxWidth: 800,
              WebkitMaskImage: fadeMask,
              maskImage: fadeMask,
            }}
          >
            <canvas
              ref={canvasRef}
              onPointerDown={(e) => {
                pointerInteracting.current = e.clientX - pointerInteractionMovement.current
                if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
              }}
              onPointerUp={() => {
                pointerInteracting.current = null
                if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
              }}
              onPointerOut={() => {
                pointerInteracting.current = null
                if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
              }}
              onMouseMove={(e) => {
                if (pointerInteracting.current !== null) {
                  const delta = e.clientX - pointerInteracting.current
                  pointerInteractionMovement.current = delta
                  rotation.set(delta / 200)
                }
              }}
              onTouchMove={(e) => {
                if (pointerInteracting.current !== null && e.touches[0]) {
                  const delta = e.touches[0].clientX - pointerInteracting.current
                  pointerInteractionMovement.current = delta
                  rotation.set(delta / 100)
                }
              }}
              style={{
                width: '100%',
                height: '100%',
                contain: 'layout paint size',
                cursor: 'auto',
                userSelect: 'none',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationCard
