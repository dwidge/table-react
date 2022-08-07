import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { uuid, replaceItemById, dropItemById } from '@dwidge/lib'
import './Table.css'

export const Table = ({ name, schema, defaults, rows, pageLength = 100, inlineHeaders = false, addDel = true }) => {
	const schemaA = Object.entries(schema)
	const [rawrows, setrows] = rows
	const [idEdit, setidEdit] = useState(0)
	const [confirm, setconfirm] = useState(false)
	const [page, setpage] = useState(0)

	const cleanup = row => schemaA.reduce((row, [key, schem]) => ({
		...row,
		[key]: schem.cleanup(row[key]),
	}), row)
	const cleanrows = rawrows.map(cleanup)

	const setrow = row => setrows(replaceItemById(cleanrows, row))
	const delrow = id =>
		setrows(dropItemById(cleanrows, id))
	const addrow = row => setrows(cleanrows.concat([row]))
	const newrow = () => ({ ...defaults, id: uuid() })

	const pages = Math.max(1, Math.ceil(cleanrows.length / pageLength))
	if (page >= pages) { setpage(pages - 1) }
	if (page < 0) { setpage(0) }

	const onPrev = () => {
		if (page > 0) { setpage(page - 1) }
	}
	const onNext = () => {
		if (page < pages - 1) { setpage(page + 1) }
	}

	const onEdit = setidEdit
	const onDel = delrow
	const onSave = row => {
		setrow(row)
		setidEdit()
	}
	const onCancel = () => setidEdit()
	const onAdd = () => addrow(newrow())
	const onClear = () => {
		confirm && setrows([])
		setconfirm(!confirm)
	}

	return (
		<div-page data-testid={'table' + name}>
			<table-table>
				{(!inlineHeaders) && (<>
					<table-header>
						{schemaA.map(([key, schem]) =>
							(<column-header key={key}>{schem.name}</column-header>))}
					</table-header>
				</>)}
				{cleanrows.slice(page * pageLength, (page + 1) * pageLength).map(
					row => (key => key === idEdit
						? (<RowEdit {...{ key, schema, row, inlineHeaders, onSave, onCancel }} />)
						: (<Row {...{ key, schema, row, inlineHeaders, addDel, onEdit, onDel }} />)
					)(row.id))}
			</table-table>
			{pages > 1 && (<>
				<p>{page * pageLength + 1} - {Math.min(cleanrows.length, (page + 1) * pageLength)} of {cleanrows.length}</p>
				<button onClick={onPrev} data-testid="buttonPrev">Prev</button>
				<button onClick={onNext} data-testid="buttonNext">Next</button>
			</>)}
			{addDel && (<>
				<button onClick={onAdd} data-testid="buttonAdd">Add</button>
				<button onClick={onClear} data-testid="buttonClear">{confirm ? 'Confirm' : 'Clear'}</button>
			</>)}
		</div-page>
	)
}

Table.propTypes = {
	name: PropTypes.string.isRequired,
	schema: PropTypes.object.isRequired,
	defaults: PropTypes.object.isRequired,
	rows: PropTypes.array.isRequired,
	pageLength: PropTypes.number,
	inlineHeaders: PropTypes.bool,
	addDel: PropTypes.bool,
}

const load = (schema, row) => Object.entries(schema).reduce((row, [key, schem]) => ({ ...row, [key]: (schem.load && schem.load(row[key])) || row[key] }), row)

const save = (schema, row) => Object.entries(schema).reduce((row, [key, schem]) => ({ ...row, [key]: (schem.save && schem.save(row[key])) || row[key] }), row)

const isValid = (schema, row) => Object.entries(schema).every(([key, schem]) => !schem.valid || schem.valid(row[key]))

const Row = ({ schema, row, inlineHeaders, addDel, onEdit, onDel }) => {
	const rowEdit = (load(schema, row))
	const { id } = rowEdit

	const field = (name, value) => inlineHeaders ? (<table-row style={{ display: 'block' }} key={name}><column-header>{name}</column-header><div>{value}</div></table-row>) : value

	return (
		<table-item>
			{Object.entries(schema).map(([key, schem]) => field(schem.name, schem.row(rowEdit[key])))}
			<table-buttons>
				<button onClick={() => onEdit(id)} data-testid={'buttonEdit' + id}>Edit</button>
				{addDel && (
					<button onClick={() => onDel(id)} data-testid={'buttonDel' + id}>Del</button>
				)}
			</table-buttons>
		</table-item>
	)
}

Row.propTypes = {
	schema: PropTypes.object.isRequired,
	row: PropTypes.object.isRequired,
	inlineHeaders: PropTypes.bool,
	addDel: PropTypes.bool,
	onEdit: PropTypes.func.isRequired,
	onDel: PropTypes.func.isRequired,
}

const RowEdit = ({ schema, row, inlineHeaders, onSave, onCancel }) => {
	const [rowEdit, setrowEdit] = useState(load(schema, row))

	const field = (name, value) => inlineHeaders ? (<table-row style={{ display: 'block' }} key={name}><column-header>{name}</column-header><div>{value}</div></table-row>) : value

	return (
		<table-item>
			{Object.entries(schema).map(([key, schem]) => field(schem.name, schem.edit(rowEdit[key], val => setrowEdit({ ...rowEdit, [key]: val }))))}
			<table-buttons>
				<button onClick={() => isValid(schema, rowEdit) && onSave(save(schema, rowEdit))} data-testid="buttonSave">Save</button>
				<button onClick={onCancel} data-testid="buttonCancel">Cancel</button>
			</table-buttons>
		</table-item>
	)
}

RowEdit.propTypes = {
	schema: PropTypes.object.isRequired,
	row: PropTypes.object.isRequired,
	inlineHeaders: PropTypes.bool,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
}
