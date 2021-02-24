import React from 'react';
import { bool, func, object, string } from 'prop-types';
import { FieldArray } from 'react-final-form-arrays';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { ExternalLink, IconAdd, IconClose, InlineTextButton } from '../../components';
import PayoutDetailsAddress from './PayoutDetailsAddress';
import PayoutDetailsPersonalDetails from './PayoutDetailsPersonalDetails';
import css from './PayoutDetailsForm.module.css';

const PayoutDetailsAdditionalPersons = props => {
  const {
    fieldId,
    country,
    disabled,
    form,
    intl,
    push,
    showEmailField,
    showOrganizationTitleField,
    showOwnerField,
    showPersonalAddressField,
    showPersonalIdNumberField,
    showPhoneNumberField,
    values,
  } = props;

  const additionalPersonInfoLink = (
    <ExternalLink
      className={css.termsLink}
      href="https://support.stripe.com/questions/owners-and-directors"
    >
      <FormattedMessage id="PayoutDetailsForm.additionalPersonInfoLink" />
    </ExternalLink>
  );

  const showOwnershipPercentageField = index =>
    showOwnerField &&
    values &&
    values[fieldId] &&
    values[fieldId][index] &&
    values[fieldId][index].role &&
    values[fieldId][index].role.find(r => r === 'owner');

  return (
    <div className={css.additionalPersonsWrapper}>
      <FieldArray id={`${fieldId}`} name={`${fieldId}`}>
        {({ fields }) =>
          fields.map((name, index) => (
            <div key={name} className={css.additionalPersonWrapper}>
              <div
                className={css.fieldArrayRemove}
                onClick={() => fields.remove(index)}
                style={{ cursor: 'pointer' }}
              >
                <span className={css.additionalPersonLabel}>
                  <IconClose rootClassName={css.closeIcon} size="small" />
                  <FormattedMessage id="PayoutDetailsForm.additionalPersonRemove" />
                </span>
              </div>
              <PayoutDetailsPersonalDetails
                accountType="company"
                country={country}
                disabled={disabled}
                fieldId={`${fieldId}.${index}`}
                form={form}
                intl={intl}
                sectionTitle={intl.formatMessage({ id: 'PayoutDetailsForm.additionalPersonTitle' })}
                showEmailField={showEmailField}
                showOrganizationTitleField={showOrganizationTitleField}
                showOwnerField={showOwnerField}
                showOwnershipPercentageField={!!showOwnershipPercentageField(index)}
                showPersonalIdNumberField={showPersonalIdNumberField}
                showPhoneNumberField={showPhoneNumberField}
                showRoleField
                values={values}
              />
              {showPersonalAddressField ? (
                <PayoutDetailsAddress
                  className={css.personalAddressContainer}
                  country={country}
                  disabled={disabled}
                  fieldId={`${fieldId}.${index}.address`}
                  form={form}
                  intl={intl}
                />
              ) : null}
            </div>
          ))
        }
      </FieldArray>

      <React.Fragment>
        <InlineTextButton
          onClick={() => push(fieldId, undefined)}
          rootClassName={css.fieldArrayAdd}
          type="button"
        >
          <span className={css.additionalPersonLabel}>
            <IconAdd rootClassName={css.addIcon} />
            <FormattedMessage id="PayoutDetailsForm.additionalPersonLink" />
          </span>
        </InlineTextButton>
        <p className={css.additionalPersonInfo}>
          <FormattedMessage
            id="PayoutDetailsForm.additionalPersonInfoText"
            values={{ additionalPersonInfoLink }}
          />
        </p>
      </React.Fragment>
    </div>
  );
};

PayoutDetailsAdditionalPersons.defaultProps = {
  disabled: false,
  showEmailField: false,
  showOrganizationTitleField: false,
  showOwnerField: false,
  showPersonalAddressField: false,
  showPersonalIdNumberField: false,
  showPhoneNumberField: false,
  values: null,
};

PayoutDetailsAdditionalPersons.propTypes = {
  country: string.isRequired,
  fieldId: string.isRequired,
  form: object.isRequired,
  push: func.isRequired,
  disabled: bool,
  showEmailField: bool,
  showOrganizationTitleField: bool,
  showOwnerField: bool,
  showPersonalAddressField: bool,
  showPersonalIdNumberField: bool,
  showPhoneNumberField: bool,
  values: object,

  // from parent
  intl: intlShape.isRequired,
};

export default PayoutDetailsAdditionalPersons;
