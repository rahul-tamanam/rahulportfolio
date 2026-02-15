import GradientBackground from './gradient-background'
import LayoutFooter from './layout/layout-footer'
import LayoutHeader from './layout/layout-header'

type MainLayoutProps = {
  children: React.ReactNode
}

function MainLayout(props: MainLayoutProps) {
  const { children } = props

  return (
    <>
      <div id='top' className='absolute top-0' aria-hidden />
      <LayoutHeader />
      <main id='skip-nav' className='mx-auto mb-16 w-full max-w-5xl flex-1 px-6 py-24 sm:px-8'>
        {children}
      </main>
      <LayoutFooter />
      <GradientBackground className='fixed inset-0 -z-10 size-full' />
    </>
  )
}

export default MainLayout
