import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { saveText } from './file'
import Button from 'react-bootstrap/Button'

export function ExportFile({ name, ext, content, preview = true }) {
	const [file, setfile] = useState()

	return (
		<div>
			<Button data-testid={'buttonExport' + ext} onClick={() => setfile({ name, content })}>Export {ext}</Button>
			{file
				? (
					<div style={{ border: 'solid 1px orange', margin: '.5em' }}>
						<Button data-testid={'buttonExportAccept' + ext} onClick={() => { saveText(file.content, file.name); setfile() }}>Accept</Button>
						<h4>{file.name}</h4>
						{preview ? (<pre style={{ overflow: 'scroll', whiteSpace: 'pre-wrap' }}>{file.content}</pre>) : ''}
					</div>)
				: ''}
		</div>
	)
}

ExportFile.propTypes = {
	name: PropTypes.string.isRequired,
	ext: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	preview: PropTypes.bool,
}
