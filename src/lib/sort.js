import { useState } from 'react'

export const sortString = (a, b) =>
	('' + a).localeCompare('' + b)

export const sortAny = (a, b) =>
	typeof (a) === 'string' || typeof (b) === 'string' ? sortString(a, b) : a - b

export const useSort = (getSorter) => {
	const [key, keySet] = useState()
	const [asc, ascSet] = useState(false)

	const set = newkey => {
		if (newkey === key) {
			if (asc) keySet()
			else ascSet(true)
		} else {
			keySet(newkey)
			ascSet(false)
		}
	}

	const sortType = getSorter(key) || sortAny

	const sort = (a, b) =>
		asc ? sortType(b[key], a[key], b, a) : sortType(a[key], b[key], a, b)

	return { key, asc, sort, set }
}
