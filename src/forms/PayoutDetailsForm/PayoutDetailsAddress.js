import React from 'react';
import { bool, object, string } from 'prop-types';
import { intlShape } from '../../util/reactIntl';
import * as validators from '../../util/validators';
import { FieldSelect, FieldTextInput } from '../../components';
import { stripeCountryConfigs } from './PayoutDetailsForm';
import { CA_PROVINCES, US_STATES, AU_STATES } from './statesAndProvinces';
import css from './PayoutDetailsForm.module.css';

const PayoutDetailsAddress = props => {
  const { className, country, intl, disabled, form, fieldId } = props;
  const countryConfig = country ? stripeCountryConfigs(country).addressConfig : null;

  const isRequired = (countryConfig, field) => countryConfig[field];

  const showTitle =
    fieldId === 'company.address' ||
    fieldId === 'individual' ||
    fieldId === 'company.personalAddress';
  const addressTitle = intl.formatMessage({
    id:
      fieldId === 'company.address'
        ? 'PayoutDetailsForm.companyAddressTitle'
        : 'PayoutDetailsForm.streetAddressLabel',
  });

  const showAddressLine = country && isRequired(countryConfig, 'addressLine');

  const streetAddressLabel = intl.formatMessage({
    id: 'PayoutDetailsForm.streetAddressLabel',
  });
  const streetAddressPlaceholder = intl.formatMessage({
    id: 'PayoutDetailsForm.streetAddressPlaceholder',
  });
  const streetAddressRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.streetAddressRequired',
    })
  );

  const showPostalCode = country && isRequired(countryConfig, 'postalCode');

  const postalCodeLabel = intl.formatMessage({ id: 'PayoutDetailsForm.postalCodeLabel' });
  const postalCodePlaceholder = intl.formatMessage({
    id: 'PayoutDetailsForm.postalCodePlaceholder',
  });
  const postalCodeRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.postalCodeRequired',
    })
  );

  const showCity = country && isRequired(countryConfig, 'city');

  const cityLabel = intl.formatMessage({ id: 'PayoutDetailsForm.cityLabel' });
  const cityPlaceholder = intl.formatMessage({ id: 'PayoutDetailsForm.cityPlaceholder' });
  const cityRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.cityRequired',
    })
  );

  const showStateUS = country && isRequired(countryConfig, 'stateUS');
  const showStateAU = country && isRequired(countryConfig, 'stateAU');
  const showProvinceCA = country && isRequired(countryConfig, 'provinceCA');

  // Choose the correct list of states/provinces to the source of data for dropdown
  const states = showStateUS
    ? US_STATES
    : showProvinceCA
    ? CA_PROVINCES
    : showStateAU
    ? AU_STATES
    : [];

  // Choose the translations depending on if the text should be province or state
  const stateLabel = showProvinceCA
    ? intl.formatMessage({ id: 'PayoutDetailsForm.canadianProvinceLabel' })
    : intl.formatMessage({ id: 'PayoutDetailsForm.stateLabel' });

  const statePlaceholder = showProvinceCA
    ? intl.formatMessage({
        id: 'PayoutDetailsForm.canadianProvincePlaceholder',
      })
    : intl.formatMessage({ id: 'PayoutDetailsForm.statePlaceholder' });

  const stateRequired = showProvinceCA
    ? validators.required(
        intl.formatMessage({
          id: 'PayoutDetailsForm.canadianProvinceRequired',
        })
      )
    : validators.required(
        intl.formatMessage({
          id: 'PayoutDetailsForm.stateRequired',
        })
      );

  return (
    <div className={className || css.sectionContainer}>
      {showTitle ? <h3 className={css.subTitle}>{addressTitle}</h3> : null}

      {showAddressLine ? (
        <FieldTextInput
          autoComplete="street-address"
          className={css.field}
          disabled={disabled}
          id={`${fieldId}.streetAddress`}
          label={streetAddressLabel}
          name={`${fieldId}.streetAddress`}
          onUnmount={() => form.change(`${fieldId}.streetAddress`, undefined)}
          placeholder={streetAddressPlaceholder}
          type="text"
          validate={streetAddressRequired}
        />
      ) : null}
      <div className={css.formRow}>
        {showPostalCode ? (
          <FieldTextInput
            autoComplete="postal-code"
            className={css.postalCode}
            disabled={disabled}
            id={`${fieldId}.postalCode`}
            label={postalCodeLabel}
            name={`${fieldId}.postalCode`}
            onUnmount={() => form.change(`${fieldId}.postalCode`, undefined)}
            placeholder={postalCodePlaceholder}
            type="text"
            validate={postalCodeRequired}
          />
        ) : null}
        {showCity ? (
          <FieldTextInput
            autoComplete="address-level2"
            className={css.city}
            disabled={disabled}
            id={`${fieldId}.city`}
            label={cityLabel}
            name={`${fieldId}.city`}
            onUnmount={() => form.change(`${fieldId}.city`, undefined)}
            placeholder={cityPlaceholder}
            type="text"
            validate={cityRequired}
          />
        ) : null}
      </div>

      {states.length > 0 ? (
        <FieldSelect
          autoComplete="address-level1"
          className={css.selectCountry}
          disabled={disabled}
          id={`${fieldId}.state`}
          label={stateLabel}
          name={`${fieldId}.state`}
          validate={stateRequired}
        >
          <option disabled value="">
            {statePlaceholder}
          </option>
          {states.map(p => (
            <option key={p.key} value={p.key}>
              {p.label}
            </option>
          ))}
        </FieldSelect>
      ) : null}
    </div>
  );
};
PayoutDetailsAddress.defaultProps = {
  country: null,
  disabled: false,
  fieldId: null,
};

PayoutDetailsAddress.propTypes = {
  country: string,
  disabled: bool,
  form: object.isRequired,
  fieldId: string,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default PayoutDetailsAddress;
