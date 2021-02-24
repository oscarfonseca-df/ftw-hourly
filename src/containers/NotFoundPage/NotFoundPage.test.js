import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { NotFoundPageComponent } from './NotFoundPage';

const noop = () => null;

describe('notFoundPageComponent', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <NotFoundPageComponent
        authInProgress={false}
        currentUserHasListings={false}
        history={{ push: noop }}
        intl={fakeIntl}
        isAuthenticated={false}
        location={{ search: '' }}
        onLogout={noop}
        onManageDisableScrolling={noop}
        onResendVerificationEmail={noop}
        params={{ displayName: 'my-shop' }}
        scrollingDisabled={false}
        sendVerificationEmailInProgress={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
