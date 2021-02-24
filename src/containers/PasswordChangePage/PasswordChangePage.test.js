import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl, createCurrentUser } from '../../util/test-data';
import { PasswordChangePageComponent } from './PasswordChangePage';

const noop = () => null;

describe('passwordChangePage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <PasswordChangePageComponent
        authInProgress={false}
        changePasswordInProgress={false}
        currentUser={createCurrentUser('user1')}
        currentUserHasListings={false}
        history={{ push: noop }}
        intl={fakeIntl}
        isAuthenticated={false}
        location={{ search: '' }}
        onChange={noop}
        onLogout={noop}
        onManageDisableScrolling={noop}
        onResendVerificationEmail={noop}
        onSubmitChangePassword={noop}
        params={{ displayName: 'my-shop' }}
        passwordChanged={false}
        scrollingDisabled={false}
        sendVerificationEmailInProgress={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
