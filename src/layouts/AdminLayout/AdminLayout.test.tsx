import { cleanup, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { afterEach, describe, expect, test } from 'vitest';

import AdminLayout from './AdminLayout';

describe('AdminLayout', () => {
    afterEach(cleanup)

    test('Minimal render display expected text', () => {
        render(<AdminLayout children={<h1>AdminLayout without footer</h1>} />);
        expect(screen.getByText('AdminLayout without footer'))
    })

    test('AdminLayout component renders correctly with children props', () => {
        const component = renderer.create(
            <AdminLayout children={<h1>AdminLayout without footer</h1>} />
        )
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })

    test('AdminLayout component renders correctly with any props', () => {
        const component = renderer.create(
            <AdminLayout footer="Footer" children={<h1>AdminLayout with footer</h1>} />
        )
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
