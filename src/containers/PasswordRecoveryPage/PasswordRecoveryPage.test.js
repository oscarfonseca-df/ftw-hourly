import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { PasswordRecoveryPageComponent } from './PasswordRecoveryPage';

const noop = () => null;

describe('contactDetailsPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <PasswordRecoveryPageComponent
        authInProgress={false}
        currentUserHasListings={false}
        history={{ push: noop }}
        intl={fakeIntl}
        isAuthenticated={false}
        location={{ search: '' }}
        onChange={noop}
        onLogout={noop}
        onManageDisableScrolling={noop}
        onResendVerificationEmail={noop}
        onRetypeEmail={noop}
        onSubmitEmail={noop}
        params={{ displayName: 'my-shop' }}
        passwordRequested={false}
        recoveryInProgress={false}
        scrollingDisabled={false}
        sendVerificationEmailInProgress={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
