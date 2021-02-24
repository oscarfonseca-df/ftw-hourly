import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { EditListingPhotosFormComponent } from './EditListingPhotosForm';

const noop = () => null;

describe('editListingPhotosForm', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <EditListingPhotosFormComponent
        disabled={false}
        dispatch={noop}
        initialValues={{ country: 'US', images: [] }}
        intl={fakeIntl}
        onImageUpload={v => v}
        onRemoveImage={noop}
        onSubmit={v => v}
        onUpdateImageOrder={v => v}
        ready={false}
        ready={false}
        saveActionMsg="Save photos"
        stripeConnected={false}
        updated={false}
        updateInProgress={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
