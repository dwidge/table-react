import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import { Typeahead } from 'react-bootstrap-typeahead'

export const getItemBy = (a, v, k = 'id') =>
	a.find(o => o[k] === v)

export const ColumnRef = (name, { all, colRef = 'id', colView = 'name', colDisplay = colView }) => ({
	name,
	valid(value) {
		return !value || !!this.lookup(value)
	},
	row(value) {
		return (<column-text key={name}>
			{this.lookup(value, colDisplay) || '-'}
		</column-text>)
	},
	edit(ref, setref) {
		const [view, setview] = useState(this.lookup(ref) || '')

		useEffect(() => {
			setview(this.lookup(ref) || '')
		}, [all])

		const onref = v => {
			setref(v)
			const newview = this.lookup(v)
			if (newview) {
				setview(newview)
			}
		}
		const onview = v => {
			setview(v)
			const newref = this.rlookup(v)
			if (newref) {
				setref(newref)
			}
		}

		const [refTa, refTaSet] = [ref ? ['' + ref] : [], ([x]) => onref(x ? '' + x : '')]
		const refOptions = all.map(v => '' + v[colRef])

		const [viewTa, viewTaSet] = [view ? ['' + view] : [], ([x]) => onview(x ? '' + x : '')]
		const viewOptions = all.map(v => '' + v[colView])

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
