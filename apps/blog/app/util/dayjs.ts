import * as _dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'

_dayjs.extend(isToday)

export const dayjs = _dayjs.default

export function formatDate(date: string | _dayjs.Dayjs) {
  const _date = typeof date === 'string' ? dayjs(date) : date

  if (_date.isToday()) {
    return `Today ${_date.format('HH:mm')}`
  }

  return _date.format('YYYY-MM-DD HH:mm')
}
