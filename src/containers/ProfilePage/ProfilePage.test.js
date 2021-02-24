import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { createUser, fakeIntl, fakeViewport } from '../../util/test-data';
import { ProfilePageComponent } from './ProfilePage';

const noop = () => null;

describe('profilePage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <ProfilePageComponent
        intl={fakeIntl}
        listings={[]}
        scrollingDisabled={false}
        user={createUser('test-user')}
        userShowInProgress={false}
        viewport={fakeViewport}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
