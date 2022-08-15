import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFilePicker } from 'use-file-picker'

function ImportFile({ ext, onAccept }) {
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
			<button data-testid={'buttonImport' + ext} onClick={() => openFileSelector()}>Import {ext}</button>
			{loading
				? (<div>Loading...</div>)
				: file
					? (
						<div style={{ border: 'solid 1px orange', margin: '.5em' }}>
							<h4>{file.name}</h4>
							<pre style={{ overflow: 'scroll', whiteSpace: 'pre-wrap' }}>{file.content}</pre>
							<button onClick={() => { onAccept(file.content); setfile() }}>Accept</button>
						</div>)
					: ''}
		</div>
	)
}

ImportFile.propTypes = {
	ext: PropTypes.string,
	onAccept: PropTypes.func.isRequired,
}

export default ImportFile
