import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import { Typeahead } from 'react-bootstrap-typeahead'

export const getItemBy = (a, v, k = 'id') =>
	a.find(o => o[k] === v)

const se = (x, f = '', t = '' + x) => x == null || x === '' ? f : t

export const ColumnRef = (name, { all, colRef = 'id', colView = 'name', colDisplay = colView }) => ({
	name,
	valid(value) {
		return !value || !!this.lookup(value)
	},
	row(value) {
		const display = this.lookup(value, colDisplay)
		return (<column-text key={name}>
			{se(display, '-')}
		</column-text>)
	},
	sort(a, b) {
		const astr = this.lookup(a, colDisplay)
		const bstr = this.lookup(b, colDisplay)
		return ('' + astr).localeCompare('' + bstr)
	},
	edit(ref, setref) {
		const [view, setview] = useState(se(this.lookup(ref)))

		useEffect(() => {
			setview(se(this.lookup(ref)))
		}, [all])

		const onref = v => {
			setref(v)
			setview(se(this.lookup(v)))
		}
		const onview = v => {
			setview(v)
			setref(se(this.rlookup(v)))
		}

		const [refTa, refTaSet] = [se(ref, [], ['' + ref]), ([s]) => onref(se(s))]
		const refOptions = all.map(v => se(v[colRef]))

		const [viewTa, viewTaSet] = [se(view, [], ['' + view]), ([s]) => onview(se(s))]

		const viewOptions = all.map(v => se(v[colView]))

		return (<column-text key={name}>
			<Form.Group>
				<Form.Label>{colRef}</Form.Label>
				<Typeahead
					id={'input' + name}
					inputProps={{
						'data-testid': 'input' + name,
					}}
					style={this.lookup(ref) ? { minWidth: '10em' } : { minWidth: '10em', borderColor: 'red' }}
					onChange={refTaSet}
					options={refOptions}
					placeholder="Choose..."
					selected={refTa}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>{colView}</Form.Label>
				<Typeahead
					id={'inputView' + name}
					inputProps={{
						'data-testid': 'inputView' + name,
					}}
					style={this.rlookup(view) ? { minWidth: '10em' } : { minWidth: '10em', borderColor: 'red' }}
					onChange={viewTaSet}
					options={viewOptions}
					placeholder="Choose..."
					selected={viewTa}
				/>
			</Form.Group>
		</column-text>)
	},
	cleanup(value) {
		return value
	},
	lookup(value, col = colView) {
		const item = getItemBy(all, value, colRef) || getItemBy(all, +value, colRef) || {}
		return item[col]
	},
	rlookup(value) {
		const item = getItemBy(all, value, colView) || getItemBy(all, +value, colView) || {}
		return item[colRef]
	},
})
