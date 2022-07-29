import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { uuid, replaceItemById, dropItemById } from '@dwidge/lib'
import './Table.css'

export const Table = ({ name, schema, defaults, rows }) => {
	const schemaA = Object.entries(schema)
	const [rawrows, setrows] = rows
	const [idEdit, setidEdit] = useState()
	const [confirm, setconfirm] = useState(false)

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
		<div-page>
			<table-table data-testid={'table' + name}>
				<table-header>
					{schemaA.map(([key, schem]) =>
						(<column-header key={key}>{schem.name}</column-header>))}
				</table-header>
				{cleanrows.map(
					row => (key => key === idEdit
						? (<RowEdit {...{ key, schema, row, onSave, onCancel }} />)
						: (<Row {...{ key, schema, row, onEdit, onDel }} />)
					)(row.id))}
			</table-table>
			<button onClick={onAdd} data-testid="buttonAdd">Add</button>
			<button onClick={onClear} data-testid="buttonClear">{confirm ? 'Confirm' : 'Clear'}</button>
		</div-page>
	)
}

Table.propTypes = {
	name: PropTypes.string.isRequired,
	schema: PropTypes.object.isRequired,
	defaults: PropTypes.object.isRequired,
	rows: PropTypes.array.isRequired,
}

const Row = ({ schema, row, onEdit, onDel }) => {
	const { id } = row
	return (
		<table-item>
			{Object.entries(schema).map(([key, schem]) => schem.row(row[key]))}
			<table-buttons>
				<button onClick={() => onEdit(id)} data-testid={'buttonEdit' + id}>Edit</button>
				<button onClick={() => onDel(id)} data-testid={'buttonDel' + id}>Del</button>
			</table-buttons>
		</table-item>
	)
}

Row.propTypes = {
	schema: PropTypes.object.isRequired,
	row: PropTypes.object.isRequired,
	onEdit: PropTypes.func.isRequired,
	onDel: PropTypes.func.isRequired,
}

const RowEdit = ({ schema, row, onSave, onCancel }) => {
	const [rowEdit, setrowEdit] = useState(row)

	return (
		<table-item>
			{Object.entries(schema).map(([key, schem]) => schem.edit(rowEdit[key], val => setrowEdit({ ...rowEdit, [key]: val })))}
			<table-buttons>
				<button onClick={() => onSave(rowEdit)} data-testid="buttonSave">Save</button>
				<button onClick={onCancel} data-testid="buttonCancel">Cancel</button>
			</table-buttons>
		</table-item>
	)
}

RowEdit.propTypes = {
	schema: PropTypes.object.isRequired,
	row: PropTypes.object.isRequired,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
}
