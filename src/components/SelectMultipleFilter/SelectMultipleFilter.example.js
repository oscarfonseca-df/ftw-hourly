import React from 'react';
import { withRouter } from 'react-router-dom';
import { stringify, parse } from '../../util/urlHelpers';
import SelectMultipleFilter from './SelectMultipleFilter';

const URL_PARAM = 'pub_yogaStyles';

const options = [
  { key: 'ashtanga', label: 'Ashtanga' },
  { key: 'hatha', label: 'Hatha' },
  { key: 'kundalini', label: 'Kundalini' },
  { key: 'restorative', label: 'Restorative' },
  { key: 'vinyasa', label: 'Vinyasa' },
  { key: 'yin', label: 'yin' },
];

const handleSubmit = (values, history) => {
  console.log('Submitting values', values);
  const queryParams = values ? `?${stringify(values)}` : '';
  history.push(`${window.location.pathname}${queryParams}`);
};

const YogaStylesFilterPopup = withRouter(props => {
  const { history, location } = props;

  const params = parse(location.search);
  const yogaStyles = params[URL_PARAM];
  const initialValues = { [URL_PARAM]: yogaStyles || null };

  return (
    <SelectMultipleFilter
      contentPlacementOffset={-14}
      id="SelectMultipleFilterPopupExample"
      initialValues={initialValues}
      label="yogaStyles"
      liveEdit={false}
      name="yogaStyles"
      onSubmit={values => handleSubmit(values, history)}
      options={options}
      queryParamNames={[URL_PARAM]}
      showAsPopup
    />
  );
});

export const YogaStylesFilterPopupExample = {
  component: YogaStylesFilterPopup,
  props: {},
  group: 'filters',
};

const YogaStylesFilterPlain = withRouter(props => {
  const { history, location } = props;

  const params = parse(location.search);
  const yogaStyles = params[URL_PARAM];
  const initialValues = { [URL_PARAM]: yogaStyles || null };

  return (
    <SelectMultipleFilter
      id="SelectMultipleFilterPlainExample"
      initialValues={initialValues}
      label="yogaStyles"
      liveEdit
      name="yogaStyles"
      onSubmit={values => {
        handleSubmit(values, history);
      }}
      options={options}
      queryParamNames={[URL_PARAM]}
      showAsPopup={false}
    />
  );
});

export const YogaStylesFilterPlainExample = {
  component: YogaStylesFilterPlain,
  props: {},
  group: 'filters',
};
