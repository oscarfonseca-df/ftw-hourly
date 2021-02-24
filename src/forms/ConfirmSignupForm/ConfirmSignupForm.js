import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import * as validators from '../../util/validators';
import { Form, PrimaryButton, FieldTextInput } from '../../components';
import css from './ConfirmSignupForm.module.css';

const KEY_CODE_ENTER = 13;

const ConfirmSignupFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        rootClassName,
        className,
        formId,
        handleSubmit,
        inProgress,
        invalid,
        intl,
        onOpenTermsOfService,
        authInfo,
        idp,
      } = formRenderProps;

      // email
      const emailLabel = intl.formatMessage({
        id: 'ConfirmSignupForm.emailLabel',
      });
      const emailPlaceholder = intl.formatMessage({
        id: 'ConfirmSignupForm.emailPlaceholder',
      });
      const emailRequiredMessage = intl.formatMessage({
        id: 'ConfirmSignupForm.emailRequired',
      });
      const emailRequired = validators.required(emailRequiredMessage);
      const emailInvalidMessage = intl.formatMessage({
        id: 'ConfirmSignupForm.emailInvalid',
      });
      const emailValid = validators.emailFormatValid(emailInvalidMessage);

      // firstName
      const firstNameLabel = intl.formatMessage({
        id: 'ConfirmSignupForm.firstNameLabel',
      });
      const firstNamePlaceholder = intl.formatMessage({
        id: 'ConfirmSignupForm.firstNamePlaceholder',
      });
      const firstNameRequiredMessage = intl.formatMessage({
        id: 'ConfirmSignupForm.firstNameRequired',
      });
      const firstNameRequired = validators.required(firstNameRequiredMessage);

      // lastName
      const lastNameLabel = intl.formatMessage({
        id: 'ConfirmSignupForm.lastNameLabel',
      });
      const lastNamePlaceholder = intl.formatMessage({
        id: 'ConfirmSignupForm.lastNamePlaceholder',
      });
      const lastNameRequiredMessage = intl.formatMessage({
        id: 'ConfirmSignupForm.lastNameRequired',
      });
      const lastNameRequired = validators.required(lastNameRequiredMessage);

      const classes = classNames(rootClassName || css.root, className);
      const submitInProgress = inProgress;
      const submitDisabled = invalid || submitInProgress;

      const handleTermsKeyUp = e => {
        // Allow click action with keyboard like with normal links
        if (e.keyCode === KEY_CODE_ENTER) {
          onOpenTermsOfService();
        }
      };
      const termsLink = (
        <span
          className={css.termsLink}
          onClick={onOpenTermsOfService}
          onKeyUp={handleTermsKeyUp}
          role="button"
          tabIndex="0"
        >
          <FormattedMessage id="ConfirmSignupForm.termsAndConditionsLinkText" />
        </span>
      );

      // If authInfo is not available we should not show the ConfirmForm
      if (!authInfo) {
        return;
      }

      // Initial values from idp provider
      const { email, firstName, lastName } = authInfo;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          <div>
            <FieldTextInput
              autoComplete="email"
              id={formId ? `${formId}.email` : 'email'}
              initialValue={email}
              label={emailLabel}
              name="email"
              placeholder={emailPlaceholder}
              type="email"
              validate={validators.composeValidators(emailRequired, emailValid)}
            />
            <div className={css.name}>
              <FieldTextInput
                autoComplete="given-name"
                className={css.firstNameRoot}
                id={formId ? `${formId}.firstName` : 'firstName'}
                initialValue={firstName}
                label={firstNameLabel}
                name="firstName"
                placeholder={firstNamePlaceholder}
                type="text"
                validate={firstNameRequired}
              />
              <FieldTextInput
                autoComplete="family-name"
                className={css.lastNameRoot}
                id={formId ? `${formId}.lastName` : 'lastName'}
                initialValue={lastName}
                label={lastNameLabel}
                name="lastName"
                placeholder={lastNamePlaceholder}
                type="text"
                validate={lastNameRequired}
              />
            </div>
          </div>

          <div className={css.bottomWrapper}>
            <p className={css.bottomWrapperText}>
              <span className={css.termsText}>
                <FormattedMessage
                  id="ConfirmSignupForm.termsAndConditionsAcceptText"
                  values={{ termsLink }}
                />
              </span>
            </p>
            <PrimaryButton disabled={submitDisabled} inProgress={submitInProgress} type="submit">
              <FormattedMessage id="ConfirmSignupForm.signUp" values={{ idp }} />
            </PrimaryButton>
          </div>
        </Form>
      );
    }}
  />
);

ConfirmSignupFormComponent.defaultProps = { inProgress: false };

const { bool, func } = PropTypes;

ConfirmSignupFormComponent.propTypes = {
  inProgress: bool,

  onOpenTermsOfService: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const ConfirmSignupForm = compose(injectIntl)(ConfirmSignupFormComponent);
ConfirmSignupForm.displayName = 'ConfirmSignupForm';

export default ConfirmSignupForm;
