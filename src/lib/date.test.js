import { dateYYMMDDfromSeconds, dateSecondsFromYYMMDD } from './date.js'

it('dateYYMMDDfromSeconds', async () => {
	const s = dateSecondsFromYYMMDD('2022-10-05')
	expect('2022-10-05').toEqual(dateYYMMDDfromSeconds(s))
	const str = dateYYMMDDfromSeconds(79200)
	expect(79200).toEqual(dateSecondsFromYYMMDD(str))
})
