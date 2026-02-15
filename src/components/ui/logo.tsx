import { cn } from '@/utils/cn'

type LogoProps = React.ImgHTMLAttributes<HTMLImageElement>

function Logo(props: LogoProps) {
  const { width = 20, height = width, alt = 'Logo', className, ...rest } = props
  return (
    // eslint-disable-next-line @next/next/no-img-element -- Logo uses static PNG; next/image not required for simple asset
    <img
      src='/images/logo.png'
      alt={alt}
      width={width}
      height={height}
      className={cn('inline-block rounded-xl', className)}
      {...rest}
    />
  )
}

export { Logo }
