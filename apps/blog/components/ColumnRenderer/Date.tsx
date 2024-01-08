import { Typo } from '@zakelstorm/ui'
import { isNil } from 'lodash-es'

import { formatDate } from '@/util/dayjs'

export interface DateProps {
  date?: string
}

export const Date = ({ date }: DateProps) => {
  if (isNil(date)) {
    return <Typo.Text>-</Typo.Text>
  }

  return <Typo.Text>{formatDate(date)}</Typo.Text>
}
