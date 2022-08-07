import React, { useState } from 'react'
import { render } from 'react-dom'
import { Table, ColumnText, ColumnSet, ColumnDate } from './lib'

const b1 = { id: 1, bc: 'c1' }
const a0 = { aa: 'a', ab: [], ac: '2000/01/01' }
const a1 = { id: 1, aa: 'a1', ab: [1], ac: '2001/01/01' }
const a2 = { id: 2, aa: 'a2', ab: [], ac: '2002/01/01' }

const App = () => (
	<div>
		<h1>Table</h1>
		<Table name='A' schema={{
			aa: ColumnText('ColA'),
			ab: ColumnSet('ColB', [b1], val => val.bc),
			ac: ColumnDate('ColC'),
		}} defaults={a0} rows={useState([a1, a2])} />
		<h1>Table pageLength=2</h1>
		<Table name='A' schema={{
			aa: ColumnText('ColA'),
			ab: ColumnSet('ColB', [b1], val => val.bc),
		}} defaults={a0} rows={useState([a1, a2])} pageLength={2} />
		<h1>Table inlineHeaders=true</h1>
		<Table name='A' schema={{
			aa: ColumnText('ColA'),
			ab: ColumnSet('ColB', [b1], val => val.bc),
		}} defaults={a0} rows={useState([a1, a2])} inlineHeaders={true} />
	</div>
)

render(<App />, document.getElementById('root'))
