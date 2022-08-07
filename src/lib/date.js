export const dateYYMMDDfromSeconds = sec =>
	new Date(sec * 1000).toLocaleDateString('en-ZA').split('/').join('-')

export const dateSecondsFromYYMMDD = str => {
	const segs = str.split('-')
	const date = new Date(+segs[0], (+segs[1]) - 1, +segs[2])
	return date.getTime() / 1000 | 0
}
