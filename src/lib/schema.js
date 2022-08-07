import React from 'react'
import { onChange, onChangeChecks } from '@dwidge/lib-react'
import { getItemById } from '@dwidge/lib'

import { dateYYMMDDfromSeconds, dateSecondsFromYYMMDD } from './date.js'
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
	_load(value) {
		return dateYYMMDDfromSeconds(value)
	},
	_save(value) {
		return dateSecondsFromYYMMDD(value)
	},
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
