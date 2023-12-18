import { AxiosResponse } from 'axios'
import { resolve } from 'path'

/**
 * CLI설정 파일
 */
export interface Config {
  /**
   * API응답 객체를 페이지네이션 객체로 변환하는 함수
   * @param res API응답 객체
   * @returns
   */
  responseToPaginationLike?: (res: AxiosResponse) => {
    previous: string | null
    next: string | null
    items: any[]
  }
}

export function getConfig(): Promise<null | Config> {
  const path = resolve(process.cwd(), 'isf.config.js')

  return import(path)
    .then(mod => {
      return mod.default
    })
    .catch(() => null)
}
