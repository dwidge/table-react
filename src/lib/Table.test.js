import React, { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Table, ColumnText, ColumnSet } from '.'

import * as J from '@dwidge/lib-react'
import * as Lib from '@dwidge/lib'
const text = J.tools(userEvent, screen, jest).text
const input = J.input(userEvent, screen)
const click = J.click(userEvent, screen)
const serialSpy = J.serialSpy(jest)

jest.mock('@dwidge/lib', () => {
	return {
		__esModule: true,
		...jest.requireActual('@dwidge/lib'),
	}
})
beforeEach(async () => {
	serialSpy(Lib, 'uuid', [1, 2, 3])
})
afterEach(() => {
	jest.restoreAllMocks()
})

describe('Table', () => {
	const b1 = { id: 1, bc: 'c1' }
	const a0 = { aa: 'a', ab: [] }
	const a1 = { id: 1, aa: 'a1', ab: [1] }
	const a2 = { id: 2, aa: 'a2', ab: [] }

	it('enters row into list', async () => {
		const Frag = () => (<Table name='A' schema={{
			aa: ColumnText('ColA'),
			ab: ColumnSet('ColB', [b1], val => val.bc),
		}} defaults={a0} rows={useState([])} />)
		render(<Frag/>)
		await click('buttonAdd')
		await click('buttonEdit1')
		await input('inputColA', 'a1')
		await click('buttonSave')
		expect(screen.getByTestId('tableA')).toMatchSnapshot()
	})

	it('enables a slot', async () => {
		const Frag = () => (<Table name='A' schema={{
			aa: ColumnText('ColA'),
			ab: ColumnSet('ColB', [b1], val => val.bc),
		}} defaults={a0} rows={useState([])} />)
		render(<Frag/>)
		await click('buttonAdd')
		await click('buttonEdit1')
		await input('inputColA', 'a1')
		await click('inputColB1')
		await click('buttonSave')
		expect(screen.getByTestId('tableA')).toMatchSnapshot()
	})

	it('clears missing slot', async () => {
		const Frag = () => (<Table name='A' schema={{
			aa: ColumnText('ColA'),
			ab: ColumnSet('ColB', [], val => val.bc),
		}} defaults={a0} rows={useState([a1])} />)
		render(<Frag/>)
		expect(screen.getByTestId('tableA')).toMatchSnapshot()
	})

	it('confirms & clears list', async () => {
		const Frag = () => (<Table name='A' schema={{
			aa: ColumnText('ColA'),
			ab: ColumnSet('ColB', [b1], val => val.bc),
		}} defaults={a0} rows={useState([a1, a2])} />)
		render(<Frag/>)
		expect(screen.getByTestId('tableA')).toMatchSnapshot()
		expect(text('buttonClear')).toEqual('Clear')
		await click('buttonClear')
		expect(text('buttonClear')).toEqual('Confirm')
		expect(screen.getByTestId('tableA')).toMatchSnapshot()
		await click('buttonClear')
		expect(text('buttonClear')).toEqual('Clear')
		expect(screen.getByTestId('tableA')).toMatchSnapshot()
	})

	it('addDel', async () => {
		const Frag = () => (<Table name='A' schema={{
			aa: ColumnText('ColA'),
			ab: ColumnSet('ColB', [b1], val => val.bc),
		}} defaults={a0} rows={useState([a1, a2])} addDel={false} />)
		render(<Frag/>)
		expect(screen.getByTestId('tableA')).toMatchSnapshot()
	})

	it('pages', async () => {
		const Frag = () => (<Table name='A' schema={{
			aa: ColumnText('ColA'),
			ab: ColumnSet('ColB', [b1], val => val.bc),
		}} defaults={a0} rows={useState([a1, a2])} pageLength={1} />)
		render(<Frag/>)
		expect(screen.getByTestId('tableA')).toMatchSnapshot()
	})

	it('pages next prev', async () => {
		const Frag = () => (<Table name='A' schema={{
			aa: ColumnText('ColA'),
			ab: ColumnSet('ColB', [b1], val => val.bc),
		}} defaults={a0} rows={useState([a1, a2])} pageLength={1} />)
		render(<Frag/>)
		await click('buttonPrev')
		expect(screen.getByTestId('tableA')).toMatchSnapshot()
		await click('buttonNext')
		expect(screen.getByTestId('tableA')).toMatchSnapshot()
		await click('buttonNext')
		expect(screen.getByTestId('tableA')).toMatchSnapshot()
		await click('buttonPrev')
		expect(screen.getByTestId('tableA')).toMatchSnapshot()
	})

	it('inlineHeaders', async () => {
		const Frag = () => (<Table name='A' schema={{
			aa: ColumnText('ColA'),
			ab: ColumnSet('ColB', [b1], val => val.bc),
		}} defaults={a0} rows={useState([a1, a2])} pageLength={1} inlineHeaders={true} />)
		render(<Frag/>)
		expect(screen.getByTestId('tableA')).toMatchSnapshot()
	})
})
