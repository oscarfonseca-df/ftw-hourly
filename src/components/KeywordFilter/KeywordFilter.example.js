import React from 'react';
import { withRouter } from 'react-router-dom';
import { stringify, parse } from '../../util/urlHelpers';
import KeywordFilter from './KeywordFilter';

const URL_PARAM = 'keywords';

const handleSubmit = (values, history) => {
  console.log('Submitting values', values);
  const queryParams = values ? `?${stringify(values)}` : '';
  history.push(`${window.location.pathname}${queryParams}`);
};

const KeywordFilterPopup = withRouter(props => {
  const { history, location } = props;

  const params = parse(location.search);
  const keyword = params[URL_PARAM];
  const initialValues = keyword ? { [URL_PARAM]: keyword } : { [URL_PARAM]: null };

  return (
    <KeywordFilter
      contentPlacementOffset={-14}
      id="KeywordFilterPopupExample"
      initialValues={initialValues}
      label="Keyword"
      liveEdit={false}
      name="keyword"
      onSubmit={values => handleSubmit(values, history)}
      queryParamNames={[URL_PARAM]}
      showAsPopup
    />
  );
});

export const KeywordFilterPopupExample = {
  component: KeywordFilterPopup,
  props: {},
  group: 'filters',
};

const KeywordFilterPlain = withRouter(props => {
  const { history, location } = props;

  const params = parse(location.search);
  const keyword = params[URL_PARAM];
  const initialValues = keyword ? { [URL_PARAM]: keyword } : { [URL_PARAM]: null };

  return (
    <KeywordFilter
      id="KeywordFilterPlainExample"
      initialValues={initialValues}
      label="Keyword"
      liveEdit
      name="keyword"
      onSubmit={values => {
        handleSubmit(values, history);
      }}
      queryParamNames={[URL_PARAM]}
      showAsPopup={false}
    />
  );
});

export const KeywordFilterPlainExample = {
  component: KeywordFilterPlain,
  props: {},
  group: 'filters',
};
