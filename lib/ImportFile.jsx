import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFilePicker } from 'use-file-picker'
import Button from 'react-bootstrap/Button'

export function ImportFile({ ext, onAccept, preview = true }) {
	const [openFileSelector, { filesContent, loading }] = useFilePicker({
		accept: ext,
		multiple: false,
		limitFilesConfig: { max: 1 },
	})
	const [file, setfile] = useState()

	useEffect(() => {
		setfile(filesContent[0])
	}, [filesContent])

	return (
		<div>
			<Button data-testid={'buttonImport' + ext} onClick={() => openFileSelector()}>Import {ext}</Button>
			{loading
				? (<div>Loading...</div>)
				: file
					? (
						<div style={{ border: 'solid 1px orange', margin: '.5em' }}>
							<Button onClick={() => { onAccept(file.content); setfile() }}>Accept</Button>
							<h4>{file.name}</h4>
							{preview ? (<pre style={{ overflow: 'scroll', whiteSpace: 'pre-wrap' }}>{file.content}</pre>) : ''}
						</div>)
					: ''}
		</div>
	)
}

ImportFile.propTypes = {
	ext: PropTypes.string,
	onAccept: PropTypes.func.isRequired,
	preview: PropTypes.bool,
}
