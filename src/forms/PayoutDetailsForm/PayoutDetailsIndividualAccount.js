import React from 'react';
import { bool, object, shape } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import config from '../../config';
import routeConfiguration from '../../routeConfiguration';
import { propTypes } from '../../util/types';
import { createResourceLocatorString } from '../../util/routes';
import { stripeCountryConfigs } from './PayoutDetailsForm';
import PayoutDetailsAddress from './PayoutDetailsAddress';
import PayoutDetailsBankDetails from './PayoutDetailsBankDetails';
import PayoutDetailsPersonalDetails from './PayoutDetailsPersonalDetails';
import PayoutDetailsBusinessProfile from './PayoutDetailsBusinessProfile';
import css from './PayoutDetailsForm.module.css';

const PayoutDetailsIndividualAccountComponent = props => {
  const { fieldRenderProps, currentUserId, intl, appConfig } = props;
  const { disabled, form, values } = fieldRenderProps;
  const { country } = values;

  const individualConfig =
    country && stripeCountryConfigs(country).individualConfig
      ? stripeCountryConfigs(country).individualConfig
      : {};

  const showEmailField = !!individualConfig.personalEmail;
  const showPhoneNumberField = !!individualConfig.personalPhone;
  const showPersonalIdNumberField =
    !!individualConfig.personalIdNumberRequired || !!individualConfig.ssnLast4Required;

  const showBusinessURLField = !!individualConfig.businessURL;
  const showMCCForUSField = !!individualConfig.mccForUS;
  const showBusinssProfileSection = showBusinessURLField || showMCCForUSField;

  const hasBusinessURL =
    values &&
    values.individual &&
    values.individual.businessProfile &&
    values.individual.businessProfile.url;

  // Use user profile page as business_url on this marketplace
  // or just fake it if it's dev environment using Stripe test endpoints.
  // NOTE: All US accounts need to provide business URL or product description
  if (showBusinssProfileSection && !hasBusinessURL && currentUserId) {
    const pathToProfilePage = uuid =>
      createResourceLocatorString('ProfilePage', routeConfiguration(), { id: uuid }, {});
    const defaultBusinessURL =
      appConfig && appConfig.canonicalRootURL && !appConfig.dev
        ? `${config.canonicalRootURL}${pathToProfilePage(currentUserId.uuid)}`
        : `https://test-marketplace.com${pathToProfilePage(currentUserId.uuid)}`;

    form.change('individual.businessProfile.url', defaultBusinessURL);
  }

  return (
    <React.Fragment>
      <PayoutDetailsPersonalDetails
        accountType="individual"
        country={country}
        disabled={disabled}
        fieldId="individual"
        form={form}
        intl={intl}
        showEmailField={showEmailField}
        showPersonalIdNumberField={showPersonalIdNumberField}
        showPhoneNumberField={showPhoneNumberField}
        values={values}
      />

      <PayoutDetailsAddress
        country={country}
        disabled={disabled}
        fieldId="individual.address"
        form={form}
        intl={intl}
      />

      {showBusinssProfileSection ? (
        <div className={css.sectionContainer}>
          <h3 className={css.subTitle}>
            <FormattedMessage id="PayoutDetailsForm.businessProfile" />
          </h3>
          <PayoutDetailsBusinessProfile
            disabled={disabled}
            fieldId="individual.businessProfile"
            form={form}
            intl={intl}
            showBusinessURLField={showBusinessURLField}
            showMCCForUSField={showMCCForUSField}
          />
        </div>
      ) : null}

      <PayoutDetailsBankDetails country={country} disabled={disabled} fieldId="individual" />
    </React.Fragment>
  );
};

PayoutDetailsIndividualAccountComponent.defaultProps = {
  currentUserId: null,
  appConfig: config,
};

PayoutDetailsIndividualAccountComponent.propTypes = {
  fieldRenderProps: shape({
    disabled: bool,
    form: object.isRequired,
    values: object,
  }).isRequired,
  currentUserId: propTypes.uuid,
  appConfig: object,

  // from injectIntl
  intl: intlShape.isRequired,
};

const PayoutDetailsIndividualAccount = compose(injectIntl)(PayoutDetailsIndividualAccountComponent);

export default PayoutDetailsIndividualAccount;
