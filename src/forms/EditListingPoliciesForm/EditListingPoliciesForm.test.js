// NOTE: renderdeep doesn't work due to map integration
import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { EditListingPoliciesFormComponent } from './EditListingPoliciesForm';

const noop = () => null;

describe('editListingPoliciesForm', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <EditListingPoliciesFormComponent
        disabled={false}
        dispatch={noop}
        intl={fakeIntl}
        onSubmit={v => v}
        publicData={{}}
        ready={false}
        saveActionMsg="Save rules"
        updated={false}
        updateInProgress={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
