import React from 'react';
import { currencyConfig , fakeIntl } from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import SearchResultsPanel from './SearchResultsPanel';

describe('searchResultsPanel', () => {
  it('matches snapshot', () => {
    const props = {
      intl: fakeIntl,
    };
    const tree = renderShallow(<SearchResultsPanel {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
