import React from 'react';
import { fakeIntl } from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import { RoutesProvider } from '../../components';
import routeConfiguration from '../../routeConfiguration';
import { LandingPageComponent } from './LandingPage';

const noop = () => null;

describe('landingPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <LandingPageComponent
        authInProgress={false}
        currentUserHasListings={false}
        history={{ push: noop }}
        intl={fakeIntl}
        isAuthenticated={false}
        location={{ search: '' }}
        onLogout={noop}
        onManageDisableScrolling={noop}
        onResendVerificationEmail={noop}
        scrollingDisabled={false}
        sendVerificationEmailInProgress={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
