import React, { useState } from 'react'
import { render } from 'react-dom'
import { Table, ColumnText, ColumnSet } from '@dwidge/table-react'

const b1 = { id: 1, bc: 'c1' }
const a1 = { id: 1, aa: 'a1', ab: [1] }
const a2 = { id: 2, aa: 'a2', ab: [] }
const a0 = { aa: 'a', ab: [] }

const App = () => (
	<div>
		<h1>Table</h1>
		<Table name='A' schema={{
			aa: ColumnText('ColA'),
			ab: ColumnSet('ColB', [b1], val => val.bc),
		}} defaults={a0} rows={useState([a1, a2])} />
	</div>
)

render(<App />, document.getElementById('root'))
