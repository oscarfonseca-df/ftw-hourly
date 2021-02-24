import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import EditListingDescriptionForm from './EditListingDescriptionForm';

const noop = () => null;

describe('editListingDescriptionForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(
      <EditListingDescriptionForm
        categories={[{ key: 'cat1', label: 'Cat 1' }, { key: 'cat2', label: 'Cat 2' }]}
        disabled={false}
        dispatch={noop}
        intl={fakeIntl}
        onSubmit={v => v}
        ready={false}
        saveActionMsg="Save description"
        updated={false}
        updateInProgress={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
