import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { saveText } from './file'

export function ExportFile({ name, ext, content }) {
	const [file, setfile] = useState()

	return (
		<div>
			<button data-testid={'buttonExport' + ext} onClick={() => setfile({ name, content })}>Export {ext}</button>
			{file
				? (
					<div style={{ border: 'solid 1px orange', margin: '.5em' }}>
						<h4>{file.name}</h4>
						<pre>{file.content}</pre>
						<button data-testid={'buttonExportAccept' + ext} onClick={() => { saveText(file.content, file.name); setfile() }}>Accept</button>
					</div>)
				: ''}
		</div>
	)
}

ExportFile.propTypes = {
	name: PropTypes.string.isRequired,
	ext: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
}