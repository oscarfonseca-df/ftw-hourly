import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { ManageListingsPageComponent } from './ManageListingsPage';

const noop = () => null;

describe('contactDetailsPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <ManageListingsPageComponent
        authInProgress={false}
        currentUserHasListings={false}
        history={{ push: noop }}
        intl={fakeIntl}
        isAuthenticated={false}
        location={{ search: '' }}
        onCloseListing={noop}
        onLogout={noop}
        onManageDisableScrolling={noop}
        onOpenListing={noop}
        onResendVerificationEmail={noop}
        params={{ displayName: 'my-shop' }}
        queryInProgress={false}
        scrollingDisabled={false}
        sendVerificationEmailInProgress={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
