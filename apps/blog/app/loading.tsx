import { Lottie } from '@/libs/lottiePlayer'
import loadingJson from '@/public/lottie/loading.json'

export default async function Loading() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Lottie loop animationData={loadingJson} play className='w-150 h-150' />
    </div>
  )
}
