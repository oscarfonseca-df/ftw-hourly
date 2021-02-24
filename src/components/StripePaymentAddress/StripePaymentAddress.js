import React from 'react';
import { bool, object, string } from 'prop-types';
import { intlShape } from '../../util/reactIntl';
import config from '../../config';
import * as validators from '../../util/validators';
import getCountryCodes from '../../translations/countryCodes';
import { FieldTextInput, FieldSelect } from "..";
import css from './StripePaymentAddress.module.css';

const StripePaymentAddress = props => {
  const { className, intl, disabled, form, fieldId, card } = props;

  const optionalText = intl.formatMessage({
    id: 'StripePaymentAddress.optionalText',
  });

  const addressLine1Label = intl.formatMessage({
    id: 'StripePaymentAddress.addressLine1Label',
  });
  const addressLine1Placeholder = intl.formatMessage({
    id: 'StripePaymentAddress.addressLine1Placeholder',
  });
  const addressLine1Required = validators.required(
    intl.formatMessage({
      id: 'StripePaymentAddress.addressLine1Required',
    })
  );

  const addressLine2Label = intl.formatMessage(
    { id: 'StripePaymentAddress.addressLine2Label' },
    { optionalText }
  );

  const addressLine2Placeholder = intl.formatMessage({
    id: 'StripePaymentAddress.addressLine2Placeholder',
  });

  const postalCodeLabel = intl.formatMessage({ id: 'StripePaymentAddress.postalCodeLabel' });
  const postalCodePlaceholder = intl.formatMessage({
    id: 'StripePaymentAddress.postalCodePlaceholder',
  });
  const postalCodeRequired = validators.required(
    intl.formatMessage({
      id: 'StripePaymentAddress.postalCodeRequired',
    })
  );

  const cityLabel = intl.formatMessage({ id: 'StripePaymentAddress.cityLabel' });
  const cityPlaceholder = intl.formatMessage({ id: 'StripePaymentAddress.cityPlaceholder' });
  const cityRequired = validators.required(
    intl.formatMessage({
      id: 'StripePaymentAddress.cityRequired',
    })
  );

  const stateLabel = intl.formatMessage(
    { id: 'StripePaymentAddress.stateLabel' },
    { optionalText }
  );
  const statePlaceholder = intl.formatMessage({ id: 'StripePaymentAddress.statePlaceholder' });

  const countryLabel = intl.formatMessage({ id: 'StripePaymentAddress.countryLabel' });
  const countryPlaceholder = intl.formatMessage({ id: 'StripePaymentAddress.countryPlaceholder' });
  const countryRequired = validators.required(
    intl.formatMessage({
      id: 'StripePaymentAddress.countryRequired',
    })
  );

  const handleOnChange = event => {
    const value = event.target.value;
    form.change('postal', value);
    card.update({ value: { postalCode: value } });
  };

  // Use tha language set in config.locale to get the correct translations of the country names
  const countryCodes = getCountryCodes(config.locale);

  return (
    <div className={className || css.root}>
      <div className={css.formRow}>
        <FieldTextInput
          autoComplete="billing address-line1"
          className={css.field}
          disabled={disabled}
          id={`${fieldId}.addressLine1`}
          label={addressLine1Label}
          name="addressLine1"
          onUnmount={() => form.change('addressLine1', undefined)}
          placeholder={addressLine1Placeholder}
          type="text"
          validate={addressLine1Required}
        />

        <FieldTextInput
          autoComplete="billing address-line2"
          className={css.field}
          disabled={disabled}
          id={`${fieldId}.addressLine2`}
          label={addressLine2Label}
          name="addressLine2"
          onUnmount={() => form.change('addressLine2', undefined)}
          placeholder={addressLine2Placeholder}
          type="text"
        />
      </div>
      <div className={css.formRow}>
        <FieldTextInput
          autoComplete="billing postal-code"
          className={css.field}
          disabled={disabled}
          id={`${fieldId}.postalCode`}
          label={postalCodeLabel}
          name="postal"
          onChange={event => handleOnChange(event)}
          onUnmount={() => form.change('postal', undefined)}
          placeholder={postalCodePlaceholder}
          type="text"
          validate={postalCodeRequired}
        />

        <FieldTextInput
          autoComplete="billing address-level2"
          className={css.field}
          disabled={disabled}
          id={`${fieldId}.city`}
          label={cityLabel}
          name="city"
          onUnmount={() => form.change('city', undefined)}
          placeholder={cityPlaceholder}
          type="text"
          validate={cityRequired}
        />
      </div>
      <div className={css.formRow}>
        <FieldTextInput
          autoComplete="billing address-level1"
          className={css.field}
          disabled={disabled}
          id={`${fieldId}.state`}
          label={stateLabel}
          name="state"
          onUnmount={() => form.change('state', undefined)}
          placeholder={statePlaceholder}
          type="text"
        />

        <FieldSelect
          className={css.field}
          disabled={disabled}
          id={`${fieldId}.country`}
          label={countryLabel}
          name="country"
          validate={countryRequired}
        >
          <option disabled value="">
            {countryPlaceholder}
          </option>
          {countryCodes.map(country => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
        </FieldSelect>
      </div>
    </div>
  );
};
StripePaymentAddress.defaultProps = {
  country: null,
  disabled: false,
  fieldId: null,
};

StripePaymentAddress.propTypes = {
  country: string,
  disabled: bool,
  form: object.isRequired,
  fieldId: string,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default StripePaymentAddress;
