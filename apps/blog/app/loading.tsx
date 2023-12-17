import { Spinner } from '@zakelstorm/ui'

export default async function Loading() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Spinner />
    </div>
  )
}
