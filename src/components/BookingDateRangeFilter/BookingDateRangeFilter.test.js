import React from 'react';

// react-dates needs to be initialized before using any react-dates component
// Since this is currently only component using react-dates we can do it here
// https://github.com/airbnb/react-dates#initialize
import 'react-dates/initialize';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { BookingDateRangeFilterComponent } from './BookingDateRangeFilter';

describe('bookingDateRangeFilter', () => {
  it('matches popup snapshot', () => {
    const tree = renderShallow(
      <BookingDateRangeFilterComponent
        contentPlacementOffset={-14}
        id="BookingDateRangeFilter"
        initialValues={{}}
        intl={fakeIntl}
        liveEdit={false}
        onSubmit={() => null}
        queryParamNames={['dates']}
        showAsPopup
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it('matches plain snapshot', () => {
    const tree = renderShallow(
      <BookingDateRangeFilterComponent
        contentPlacementOffset={-14}
        id="BookingDateRangeFilter"
        initialValues={{}}
        intl={fakeIntl}
        liveEdit
        onSubmit={() => null}
        queryParamNames={['dates']}
        showAsPopup={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
