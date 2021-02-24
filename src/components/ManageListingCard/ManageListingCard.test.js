import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { createUser, createOwnListing, fakeIntl } from '../../util/test-data';
import { ManageListingCardComponent } from './ManageListingCard';

const noop = () => null;

describe('manageListingCard', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <ManageListingCardComponent
        availabilityEnabled
        hasClosingError={false}
        hasOpeningError={false}
        history={{ push: noop }}
        intl={fakeIntl}
        isMenuOpen={false}
        listing={createOwnListing('listing1')}
        onCloseListing={noop}
        onOpenListing={noop}
        onToggleMenu={noop}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
