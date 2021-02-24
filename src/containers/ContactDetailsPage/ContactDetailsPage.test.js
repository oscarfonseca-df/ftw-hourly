import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { ContactDetailsPageComponent } from './ContactDetailsPage';

const noop = () => null;

describe('contactDetailsPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <ContactDetailsPageComponent
        authInProgress={false}
        contactDetailsChanged={false}
        currentUserHasListings={false}
        history={{ push: noop }}
        intl={fakeIntl}
        isAuthenticated={false}
        location={{ search: '' }}
        onChange={noop}
        onLogout={noop}
        onManageDisableScrolling={noop}
        onResendVerificationEmail={noop}
        onSubmitContactDetails={noop}
        params={{ displayName: 'my-shop' }}
        saveContactDetailsInProgress={false}
        scrollingDisabled={false}
        sendVerificationEmailInProgress={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
