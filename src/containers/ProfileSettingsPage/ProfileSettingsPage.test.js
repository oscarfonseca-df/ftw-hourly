import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { ProfileSettingsPageComponent } from './ProfileSettingsPage';

const noop = () => null;

describe('contactDetailsPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <ProfileSettingsPageComponent
        authInProgress={false}
        currentUserHasListings={false}
        history={{ push: noop }}
        intl={fakeIntl}
        isAuthenticated={false}
        location={{ search: '' }}
        onChange={noop}
        onImageUpload={noop}
        onLogout={noop}
        onManageDisableScrolling={noop}
        onResendVerificationEmail={noop}
        onUpdateProfile={noop}
        params={{ displayName: 'my-shop' }}
        scrollingDisabled={false}
        sendVerificationEmailInProgress={false}
        updateInProgress={false}
        uploadInProgress={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
