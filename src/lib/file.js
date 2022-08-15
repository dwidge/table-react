import { saveAs } from 'file-saver'

export const saveText = (text, file, mime = 'text/plain') => {
	const blob = new Blob([text], { type: mime + ';charset=utf-8' })
	saveAs(blob, file)
}
