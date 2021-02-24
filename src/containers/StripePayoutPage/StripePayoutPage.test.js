import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl, createCurrentUser, createStripeAccount } from '../../util/test-data';
import { StripePayoutPageComponent } from './StripePayoutPage';

const noop = () => null;

describe('stripePayoutPage', () => {
  it('matches snapshot with Stripe not connected', () => {
    const currentUser = createCurrentUser('stripe-not-connected');
    expect(currentUser.stripeAccount).toBeUndefined();
    const tree = renderShallow(
      <StripePayoutPageComponent
        currentUser={currentUser}
        getAccountLinkInProgress={false}
        history={{ replace: noop }}
        intl={fakeIntl}
        onGetStripeConnectAccountLink={noop}
        onPayoutDetailsFormChange={noop}
        onPayoutDetailsFormSubmit={noop}
        payoutDetailsSaved={false}
        payoutDetailsSaveInProgress={false}
        scrollingDisabled={false}
        stripeAccountFetched={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it('matches snapshot with Stripe connected', () => {
    const currentUser = createCurrentUser(
      'stripe-connected',
      {},
      {
        stripeAccount: createStripeAccount(),
      }
    );
    expect(currentUser.stripeAccount).toBeDefined();
    const tree = renderShallow(
      <StripePayoutPageComponent
        currentUser={currentUser}
        getAccountLinkInProgress={false}
        history={{ replace: noop }}
        intl={fakeIntl}
        onGetStripeConnectAccountLink={noop}
        onPayoutDetailsFormChange={noop}
        onPayoutDetailsFormSubmit={noop}
        payoutDetailsSaved={false}
        payoutDetailsSaveInProgress={false}
        scrollingDisabled={false}
        stripeAccountFetched={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it('matches snapshot with details submitted', () => {
    const currentUser = createCurrentUser(
      'stripe-connected',
      {},
      {
        stripeAccount: createStripeAccount(),
      }
    );
    expect(currentUser.stripeAccount).toBeDefined();
    const tree = renderShallow(
      <StripePayoutPageComponent
        currentUser={currentUser}
        getAccountLinkInProgress={false}
        history={{ replace: noop }}
        intl={fakeIntl}
        onGetStripeConnectAccountLink={noop}
        onPayoutDetailsFormChange={noop}
        onPayoutDetailsFormSubmit={noop}
        payoutDetailsSaved
        payoutDetailsSaveInProgress={false}
        scrollingDisabled={false}
        stripeAccountFetched={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
