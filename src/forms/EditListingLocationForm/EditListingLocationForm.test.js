// NOTE: renderdeep doesn't work due to map integration
import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { EditListingLocationFormComponent } from './EditListingLocationForm';

const noop = () => null;

describe('editListingLocationForm', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <EditListingLocationFormComponent
        disabled={false}
        dispatch={noop}
        intl={fakeIntl}
        onSubmit={noop}
        ready={false}
        saveActionMsg="Save location"
        updated={false}
        updateInProgress={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
