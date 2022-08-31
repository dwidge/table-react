import React, { useState } from 'react'
import { onChange, onChangeChecks } from '@dwidge/lib-react'
import { getItemById } from '@dwidge/lib'
import BButton from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import isMatch from 'date-fns/isMatch'

export const ColumnText = (name) => ({
	name,
	row(value) {
		return (<column-text key={name}>{value}</column-text>)
	},
	edit(value, setvalue) {
		return (
			<column-text key={name}>
				<Form.Control style={{ minWidth: '10em' }} data-testid={'input' + name} value={value} onChange={onChange(setvalue)} />
			</column-text>
		)
	},
	cleanup(value) {
		return value
	},
})

export const ColumnDate = (name) => ({
	name,
	valid(value) {
		return isMatch(value, 'yyyy/MM/dd')
	},
	row(value) {
		return (<column-text key={name}>{(value)}</column-text>)
	},
	edit(value, setvalue) {
		return (
			<column-text key={name}>
				<Form.Control data-testid={'input' + name} style={this.valid(value) ? { minWidth: '10em' } : { borderColor: 'red', minWidth: '10em' }} value={(value)} onChange={onChange(v => setvalue((v)))} />
			</column-text>
		)
	},
	cleanup(value) {
		return value
	},
})

export const ColumnSet = (name, all, toString) => ({
	name,
	row(value) {
		return (<column-set key={name}>{value.length
			? value.map(id => getItemById(all, id)).map(entry =>
				(<div key={entry.id}>{toString(entry)}</div>),
			)
			: '-'}</column-set>)
	},
	edit(value, setvalue) {
		return (<column-set key={name}>{all.map(entry => (id =>
			(<div key={id}><input data-testid={'input' + name + id} type="checkbox" checked={value.includes(id)} onChange={onChangeChecks(id, value, setvalue)} /> {toString(entry)}</div>))(entry.id),
		)}</column-set>)
	},
	cleanup(value) {
		return value.filter(id => getItemById(all, id))
	},
})

export const getItemBy = (a, v, k = 'id') =>
	a.find(o => o[k] === v)

export const ColumnRef = (name, { all, colRef = 'id', colView = 'name' }) => ({
	name,
	valid(value) {
		return !value || !!this.lookup(value)
	},
	row(value) {
		return (<column-text key={name}>
			{this.lookup(value) || '-'}
		</column-text>)
	},
	edit(value, setvalue) {
		const [ref, setref] = useState(value)
		const [view, setview] = useState(this.lookup(value) || '')

		const onref = v => {
			setref(v)
			const newview = this.lookup(v)
			if (newview) {
				setview(newview)
				setvalue(v)
			}
		}
		const onview = v => {
			setview(v)
			const newref = this.rlookup(v)
			if (newref) {
				setref(newref)
				setvalue(newref)
			}
		}

		return (<column-text key={name}>
			<div>{colRef}</div>
			<Form.Control data-testid={'input' + name} style={this.lookup(ref) ? { minWidth: '10em' } : { minWidth: '10em', borderColor: 'red' }} value={ref || ''} onChange={onChange(onref)} />
			<div>{colView}</div>
			<Form.Control data-testid={'inputView' + name} style={this.rlookup(view) ? { minWidth: '10em' } : { minWidth: '10em', borderColor: 'red' }} value={view || ''} onChange={onChange(onview)} />
		</column-text>)
	},
	cleanup(value) {
		return value
	},
	lookup(value) {
		const item = getItemBy(all, value, colRef) || getItemBy(all, +value, colRef) || {}
		return item[colView]
	},
	rlookup(value) {
		const item = getItemBy(all, value, colView) || getItemBy(all, +value, colView) || {}
		return item[colRef]
	},
})

export const ColumnButton = (name, onClick, toString) => ({
	name,
	row(value, row) {
		return (<table-buttons key={name}>
			<BButton data-testid={'button' + name + row.id} onClick={() => onClick(value, row)}>{toString(value, row)}</BButton>
		</table-buttons>)
	},
	edit(value, setvalue) {
		return (<column-text key={name}>
		</column-text>)
	},
	cleanup(value) {
		return value
	},
})
