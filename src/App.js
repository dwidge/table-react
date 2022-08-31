import React, { useState } from 'react'
import { Table, ColumnText, ColumnSet, ColumnDate, ColumnRef, ColumnButton } from './lib'
import { uuid } from '@dwidge/lib'

const b1 = { id: 1, bc: 'c1' }
const b2 = { id: 'B2', bc: 'c2' }
const a0 = () => ({ id: uuid(), aa: 'a', ab: [], ac: '2000/01/01', ad: undefined })
const a1 = { id: 1, aa: 'a1', ab: [1], ac: '2001/01/01', ad: 1, af: '' }
const a2 = { id: 'A2', aa: 'a2', ab: [], ac: '2002/01/01', ad: 'B2', af: 'c2' }

const App = () => {
	const [pageLength, setpageLength] = useState(false)
	const [inlineHeaders, setinlineHeaders] = useState(false)
	const [inlineHeadersEdit, setinlineHeadersEdit] = useState(false)
	const [msg, setmsg] = useState('')

	return (
		<div>
			<h1>Table</h1>
			<div>
				<input type="checkbox" checked={inlineHeaders} onChange={() => setinlineHeaders(v => !v)} /> inlineHeaders
			</div>
			<div>
				<input type="checkbox" checked={inlineHeadersEdit} onChange={() => setinlineHeadersEdit(v => !v)} /> inlineHeadersEdit
			</div>
			<div>
				<input type="checkbox" checked={pageLength} onChange={() => setpageLength(v => !v)} /> pageLength=1
			</div>
			<Table name='A' schema={{
				aa: ColumnText('ColA'),
				ab: ColumnSet('ColB', [b1], val => val.bc),
				ac: ColumnDate('ColC'),
				ad: ColumnRef('ColD', { all: [b1, b2], colRef: 'id', colView: 'bc' }),
				ae: ColumnButton('ColE', (val, row) => setmsg('ColE - ' + row.id + '/' + row.aa), (val, row) => row.id + '/' + row.aa),
				af: ColumnRef('ColF', { all: [b1, b2], colRef: 'bc', colView: 'id' }),
			}} newRow={a0} rows={useState(new Array(1).fill([a1, a2]).flat().map(o => ({ ...o, id: uuid() })))} pageLength={pageLength ? 1 : 50} inlineHeaders={inlineHeaders} inlineHeadersEdit={inlineHeadersEdit} />
			<p data-testid='msg'>{msg}</p>
		</div>
	)
}

export default App
