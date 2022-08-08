import React from 'react'
import { onChange, onChangeChecks } from '@dwidge/lib-react'
import { getItemById } from '@dwidge/lib'

import isMatch from 'date-fns/isMatch'

export const ColumnText = (name) => ({
	name,
	row(value) {
		return (<column-text key={name}>{value}</column-text>)
	},
	edit(value, setvalue) {
		return (
			<column-text key={name}>
				<input data-testid={'input' + name} value={value} onChange={onChange(setvalue)} />
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
				<input data-testid={'input' + name} style={this.valid(value) ? {} : { background: 'red' }} value={(value)} onChange={onChange(v => setvalue((v)))} />
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

export const ColumnRef = (name, all, toString) => ({
	name,
	valid(value) {
		return !value || !!(getItemById(all, value) || getItemById(all, +value))
	},
	row(value) {
		const item = getItemById(all, value) || getItemById(all, +value)
		return (<column-text key={name}>
			{item ? toString(item) : '-'}
		</column-text>)
	},
	edit(value, setvalue) {
		return (<column-text key={name}>
			<input data-testid={'input' + name} style={this.valid(value) ? {} : { background: 'red' }} value={value || ''} onChange={onChange(setvalue)} />
		</column-text>)
	},
	cleanup(value) {
		return value
	},
})

export const ColumnButton = (name, onClick, toString) => ({
	name,
	row(value, row) {
		return (<table-buttons key={name}>
			<button data-testid={'button' + name + row.id} onClick={() => onClick(value, row)}>{toString(value, row)}</button>
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
