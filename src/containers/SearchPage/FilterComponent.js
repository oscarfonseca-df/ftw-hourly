import React from 'react';
import {
  BookingDateRangeFilter,
  BookingDateRangeLengthFilter,
  PriceFilter,
  KeywordFilter,
  SelectSingleFilter,
  SelectMultipleFilter,
} from '../../components';

/**
 * FilterComponent is used to map configured filter types
 * to actual filter components
 */
const FilterComponent = props => {
  const {
    idPrefix,
    filterConfig,
    urlQueryParams,
    initialValues,
    getHandleChangedValueFn,
    ...rest
  } = props;
  const { id, type, queryParamNames, label, config } = filterConfig;
  const { liveEdit, showAsPopup } = rest;

  const useHistoryPush = liveEdit || showAsPopup;
  const prefix = idPrefix || 'SearchPage';
  const componentId = `${prefix}.${id.toLowerCase()}`;
  const name = id.replace(/\s+/g, '-').toLowerCase();

  switch (type) {
    case 'SelectSingleFilter': {
      return (
        <SelectSingleFilter
          id={componentId}
          initialValues={initialValues(queryParamNames)}
          label={label}
          onSelect={getHandleChangedValueFn(useHistoryPush)}
          queryParamNames={queryParamNames}
          {...config}
          {...rest}
        />
      );
    }
    case 'SelectMultipleFilter': {
      return (
        <SelectMultipleFilter
          id={componentId}
          initialValues={initialValues(queryParamNames)}
          label={label}
          name={name}
          onSubmit={getHandleChangedValueFn(useHistoryPush)}
          queryParamNames={queryParamNames}
          {...config}
          {...rest}
        />
      );
    }
    case 'BookingDateRangeFilter': {
      return (
        <BookingDateRangeFilter
          id={componentId}
          initialValues={initialValues(queryParamNames)}
          label={label}
          onSubmit={getHandleChangedValueFn(useHistoryPush)}
          queryParamNames={queryParamNames}
          {...config}
          {...rest}
        />
      );
    }
    case 'BookingDateRangeLengthFilter': {
      return (
        <BookingDateRangeLengthFilter
          dateRangeLengthFilter={filterConfig}
          id={componentId}
          initialValues={initialValues(queryParamNames)}
          label={label}
          onSubmit={getHandleChangedValueFn(useHistoryPush)}
          queryParamNames={queryParamNames}
          {...rest}
        />
      );
    }
    case 'PriceFilter': {
      return (
        <PriceFilter
          id={componentId}
          initialValues={initialValues(queryParamNames)}
          label={label}
          onSubmit={getHandleChangedValueFn(useHistoryPush)}
          queryParamNames={queryParamNames}
          {...config}
          {...rest}
        />
      );
    }
    case 'KeywordFilter':
      return (
        <KeywordFilter
          id={componentId}
          initialValues={initialValues(queryParamNames)}
          label={label}
          name={name}
          onSubmit={getHandleChangedValueFn(useHistoryPush)}
          queryParamNames={queryParamNames}
          {...config}
          {...rest}
        />
      );
    default:
      return null;
  }
};

export default FilterComponent;
