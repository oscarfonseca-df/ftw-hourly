import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import EditListingPricingForm from './EditListingPricingForm';

const noop = () => null;

describe('editListingPricingForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(
      <EditListingPricingForm
        disabled={false}
        dispatch={noop}
        intl={fakeIntl}
        onSubmit={v => v}
        ready={false}
        saveActionMsg="Save price"
        updated={false}
        updateInProgress={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
