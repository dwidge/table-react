import React, { useState } from 'react'
import { Table, ColumnText, ColumnSet, ColumnDate, ColumnRef } from './lib'

const b1 = { id: 1, bc: 'c1' }
const a0 = { aa: 'a', ab: [], ac: '2000/01/01', ad: undefined }
const a1 = { id: 1, aa: 'a1', ab: [1], ac: '2001/01/01' }
const a2 = { id: 2, aa: 'a2', ab: [], ac: '2002/01/01', ad: 1 }

const App = () => {
	const [pageLength, setpageLength] = useState(false)
	const [inlineHeaders, setinlineHeaders] = useState(false)

	return (
		<div>
			<h1>Table</h1>
			<div>
				<input type="checkbox" checked={inlineHeaders} onChange={() => setinlineHeaders(v => !v)} /> inlineHeaders
			</div>
			<div>
				<input type="checkbox" checked={pageLength} onChange={() => setpageLength(v => !v)} /> pageLength=1
			</div>
			<Table name='A' schema={{
				aa: ColumnText('ColA'),
				ab: ColumnSet('ColB', [b1], val => val.bc),
				ac: ColumnDate('ColC'),
				ad: ColumnRef('ColD', [b1], val => val.bc),
			}} defaults={a0} rows={useState([a1, a2])} pageLength={pageLength ? 1 : 10} inlineHeaders={inlineHeaders} />
		</div>
	)
}

export default App
