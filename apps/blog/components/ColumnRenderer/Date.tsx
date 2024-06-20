import { isNil } from 'lodash-es'

import { formatDate } from '@/util/dayjs'

export interface DateProps {
  date?: string
}

export const Date = ({ date }: DateProps) => {
  if (isNil(date)) {
    return '-'
  }

  return formatDate(date)
}
