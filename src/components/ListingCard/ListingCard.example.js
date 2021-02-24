/* eslint-disable no-console */
import React from 'react';
import { createUser, createListing, fakeIntl } from '../../util/test-data';
import ListingCard from './ListingCard';

const listing = createListing('listing1', {}, { author: createUser('user1') });

const ListingCardWrapper = props => (
  <div style={{ maxWidth: '400px' }}>
    <ListingCard {...props} />
  </div>
);

export const ListingCardWrapped = {
  component: ListingCardWrapper,
  props: {
    intl: fakeIntl,
    listing,
  },
};
