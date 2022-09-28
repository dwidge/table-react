import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { replaceItemById, dropItemById, calcCsvFromObjects, calcObjectsFromCsv } from '@dwidge/lib'
// import './Table.css'
import { ImportFile } from './ImportFile'
import { ExportFile } from './ExportFile'
import { useSort } from './sort'
import BTable from 'react-bootstrap/Table'
import BButton from 'react-bootstrap/Button'

export const Table = ({ name, schema, newRow, rows, pageLength = 100, inlineHeaders = false, inlineHeadersEdit = false, addDel = true, enable = { importCSV: false, exportCSV: false } }) => {
	const schemaA = Object.entries(schema)
	const [rawrows, setrows] = rows
	const [idEdit, setidEdit] = useState(0)
	const [confirm, setconfirm] = useState(false)
	const [page, setpage] = useState(0)
	const sort = useSort(key => schema[key]?.sort?.bind(schema[key]))

	const cleanup = row => schemaA.reduce((row, [key, schem]) => ({
		...row,
		[key]: schem.cleanup(row[key]),
	}), row)
	const cleanrows = rawrows.map(cleanup)

	const setrow = row => setrows(replaceItemById(cleanrows, row))
	const delrow = id =>
		setrows(dropItemById(cleanrows, id))
	const addrow = row =>
		setrows(cleanrows.concat([row]))

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
	const onAdd = () => {
		const row = newRow()
		addrow(row)
		setidEdit(row.id)
	}
	const onClear = () => {
		confirm && setrows([])
		setconfirm(!confirm)
	}

	return (
		<div data-testid={'table' + name}>
			<div style={{ overflow: 'auto', maxHeight: '80vh' }}>
				<BTable striped bordered hover>
					{(!inlineHeaders) && (<>
						<thead>
							<tr>
								{schemaA.map(([key, schem]) =>
									(<th key={key}><a onClick={() => sort.set(key)}>{schem.name} {sort.key !== key ? '' : sort.asc ? <>&uarr;</> : <>&darr;</>}</a></th>))}
							</tr>
						</thead>
					</>)}
					<tbody>
						{cleanrows.sort(sort.sort).slice(page * pageLength, (page + 1) * pageLength).map(
							row => (key => key === idEdit
								? (<RowEdit {...{ key, schema, row, inlineHeadersEdit, onSave, onCancel }} />)
								: (<Row {...{ key, schema, row, inlineHeaders, addDel, onEdit, onDel }} />)
							)(row.id))}
					</tbody>
				</BTable>
			</div>
			{pages > 1 && (<>
				<p>{page * pageLength + 1} - {Math.min(cleanrows.length, (page + 1) * pageLength)} of {cleanrows.length}</p>
				<BButton onClick={onPrev} data-testid="buttonPrev">Prev</BButton>
				<BButton onClick={onNext} data-testid="buttonNext">Next</BButton>
			</>)}
			{addDel && (<>
				<BButton onClick={onAdd} data-testid="buttonAdd">Add</BButton>
				<BButton onClick={onClear} data-testid="buttonClear">{confirm ? 'Confirm' : 'Clear'}</BButton>
			</>)}
			{enable.importCSV ? (<ImportFile ext='.csv' onAccept={text => setrows(cleanrows.concat(...calcObjectsFromCsv(text)))}/>) : ''}
			{enable.exportCSV ? (<ExportFile ext='.csv' name={name + '.csv'} content={calcCsvFromObjects(cleanrows)}/>) : ''}
		</div>
	)
}

Table.propTypes = {
	name: PropTypes.string.isRequired,
	schema: PropTypes.object.isRequired,
	newRow: PropTypes.func.isRequired,
	rows: PropTypes.array.isRequired,
	pageLength: PropTypes.number,
	inlineHeaders: PropTypes.bool,
	inlineHeadersEdit: PropTypes.bool,
	addDel: PropTypes.bool,
	enable: PropTypes.object,
}

const load = (schema, row) => Object.entries(schema).reduce((row, [key, schem]) => ({ ...row, [key]: (schem.load && schem.load(row[key])) || row[key] }), row)

const save = (schema, row) => Object.entries(schema).reduce((row, [key, schem]) => ({ ...row, [key]: (schem.save && schem.save(row[key])) || row[key] }), row)

const isValid = (schema, row) => Object.entries(schema).every(([key, schem]) => !schem.valid || schem.valid(row[key]))

const RowInline = ({ fields, inlineHeaders }) =>
	inlineHeaders ? (<RowVert fields={fields}/>) : (<RowHorz fields={fields}/>)

RowInline.propTypes = {
	fields: PropTypes.array.isRequired,
	inlineHeaders: PropTypes.bool,
}

const RowHorz = ({ fields }) =>
	(
		<tr>
			{(fields).map(([key, name, val]) => (<td key={key}>{val}</td>))}
		</tr>
	)

RowHorz.propTypes = {
	fields: PropTypes.array.isRequired,
}

const RowVert = ({ fields }) =>
	(<tr><td colSpan={fields.length}>
		{(fields).map(([key, name, val]) => (<div key={key}><div><b>{name}</b></div><div>{val}</div></div>))}
	</td></tr>)

RowVert.propTypes = {
	fields: PropTypes.array.isRequired,
}

const Row = ({ schema, row, inlineHeaders, addDel, onEdit, onDel }) => {
	const rowEdit = (load(schema, row))
	const { id } = rowEdit

	const columns = Object.entries(schema).map(([key, schem]) => [key, schem.name, schem.row(rowEdit[key], rowEdit)])
	const btnedit = ['edit', '', (<BButton key='' onClick={() => onEdit(id)} data-testid={'buttonEdit' + id}>Edit</BButton>)]
	const btndel = ['del', '', (<BButton key='' onClick={() => onDel(id)} data-testid={'buttonDel' + id}>Del</BButton>)]
	const fields = addDel ? columns.concat([btnedit, btndel]) : columns.concat([btnedit])

	return (<RowInline inlineHeaders={inlineHeaders} fields={fields}/>)
}

Row.propTypes = {
	schema: PropTypes.object.isRequired,
	row: PropTypes.object.isRequired,
	inlineHeaders: PropTypes.bool,
	addDel: PropTypes.bool,
	onEdit: PropTypes.func.isRequired,
	onDel: PropTypes.func.isRequired,
}

const RowEdit = ({ schema, row, inlineHeadersEdit, onSave, onCancel }) => {
	const [rowEdit, setrowEdit] = useState(load(schema, row))

	const columns = Object.entries(schema).map(([key, schem]) => [key, schem.name, schem.edit(rowEdit[key], val => setrowEdit({ ...rowEdit, [key]: val }), rowEdit)])
	const btnsave = ['save', '', (<BButton key='' onClick={() => isValid(schema, rowEdit) && onSave(save(schema, rowEdit))} data-testid="buttonSave">Save</BButton>)]
	const btncancel = ['cancel', '', (<BButton key='' onClick={onCancel} data-testid="buttonCancel">Cancel</BButton>)]
	const fields = columns.concat([btnsave, btncancel])

	return (<RowInline inlineHeaders={inlineHeadersEdit} fields={fields}/>)
}

RowEdit.propTypes = {
	schema: PropTypes.object.isRequired,
	row: PropTypes.object.isRequired,
	inlineHeadersEdit: PropTypes.bool,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
}
