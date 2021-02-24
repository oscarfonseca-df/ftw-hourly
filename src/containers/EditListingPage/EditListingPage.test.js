import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { EditListingPageComponent } from './EditListingPage';

const noop = () => null;

describe('editListingPageComponent', () => {
  it('matches snapshot', () => {
    const getOwnListing = () => null;
    const tree = renderShallow(
      <EditListingPageComponent
        authInProgress={false}
        currentUserHasListings={false}
        fetchInProgress={false}
        getOwnListing={getOwnListing}
        history={{ push: noop }}
        images={[]}
        intl={fakeIntl}
        isAuthenticated={false}
        location={{ search: '' }}
        onAddAvailabilityException={noop}
        onChange={noop}
        onCreateListingDraft={noop}
        onDeleteAvailabilityException={noop}
        onGetStripeConnectAccountLink={noop}
        onImageUpload={noop}
        onManageDisableScrolling={noop}
        onManageDisableScrolling={noop}
        onPayoutDetailsFormChange={noop}
        onPayoutDetailsFormSubmit={noop}
        onPayoutDetailsSubmit={noop}
        onPublishListingDraft={noop}
        onRemoveListingImage={noop}
        onResendVerificationEmail={noop}
        onUpdateImageOrder={noop}
        onUpdateListing={noop}
        page={{ imageOrder: [], images: {} }}
        params={{ id: 'id', slug: 'slug', type: 'new', tab: 'description' }}
        scrollingDisabled={false}
        sendVerificationEmailInProgress={false}
        tab="description"
        type="new"
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
