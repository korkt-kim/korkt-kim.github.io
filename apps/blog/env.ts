/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from 'react'

/* eslint-disable @typescript-eslint/no-non-null-assertion */
interface APP_ENV {
  NEXT_PUBLIC_SANITY_STUDIO_URL: string
  NEXT_PUBLIC_SANITY_DATASET: string
  NEXT_PUBLIC_SANITY_PROJECT_ID: string
  NEXT_PUBLIC_SANITY_ADMIN_TOKEN: string
  NEXT_PUBLIC_SANITY_USER_TOKEN: string
  NEXT_PUBLIC_SANITY_API_VERSION: string
  NEXT_PUBLIC_SANITY_REVALIDATE_SECRET: string
  NEXT_PUBLIC_BASE_URL: string
  NEXT_PUBLIC_CONTACT_EMAIL: string
}

export function env(name: keyof APP_ENV): string {
  if (typeof window === 'undefined') {
    return process.env[name]!
  }

  return (window as any)['__ENV'][name]
}

// export const useEnv = (name: keyof APP_ENV) => {
//   const [env_, setEnv] = useState<string>(env(name))

//   // nextjs에서의 hydration 에러 방지
//   useEffect(() => setEnv(env(name)), [name])

//   return env_
// }
