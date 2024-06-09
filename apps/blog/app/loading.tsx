import dynamic from 'next/dynamic'

import loadingJson from '@/public/lottie/loading.json'

const Lottie = dynamic(() =>
  import('@/libs/lottiePlayer').then(res => res.Lottie)
)

export default async function Loading() {
  if (typeof document === 'undefined') {
    return null
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Lottie loop animationData={loadingJson} play className='w-150 h-150' />
    </div>
  )
}
