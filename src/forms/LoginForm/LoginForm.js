import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form, PrimaryButton, FieldTextInput, NamedLink } from '../../components';
import * as validators from '../../util/validators';
import css from './LoginForm.module.css';

const LoginFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        rootClassName,
        className,
        formId,
        handleSubmit,
        inProgress,
        intl,
        invalid,
      } = fieldRenderProps;

      // email
      const emailLabel = intl.formatMessage({
        id: 'LoginForm.emailLabel',
      });
      const emailPlaceholder = intl.formatMessage({
        id: 'LoginForm.emailPlaceholder',
      });
      const emailRequiredMessage = intl.formatMessage({
        id: 'LoginForm.emailRequired',
      });
      const emailRequired = validators.required(emailRequiredMessage);
      const emailInvalidMessage = intl.formatMessage({
        id: 'LoginForm.emailInvalid',
      });
      const emailValid = validators.emailFormatValid(emailInvalidMessage);

      // password
      const passwordLabel = intl.formatMessage({
        id: 'LoginForm.passwordLabel',
      });
      const passwordPlaceholder = intl.formatMessage({
        id: 'LoginForm.passwordPlaceholder',
      });
      const passwordRequiredMessage = intl.formatMessage({
        id: 'LoginForm.passwordRequired',
      });
      const passwordRequired = validators.requiredStringNoTrim(passwordRequiredMessage);

      const classes = classNames(rootClassName || css.root, className);
      const submitInProgress = inProgress;
      const submitDisabled = invalid || submitInProgress;

      const passwordRecoveryLink = (
        <NamedLink className={css.recoveryLink} name="PasswordRecoveryPage">
          <FormattedMessage id="LoginForm.forgotPassword" />
        </NamedLink>
      );

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          <div>
            <FieldTextInput
              autoComplete="email"
              id={formId ? `${formId}.email` : 'email'}
              label={emailLabel}
              name="email"
              placeholder={emailPlaceholder}
              type="email"
              validate={validators.composeValidators(emailRequired, emailValid)}
            />
            <FieldTextInput
              autoComplete="current-password"
              className={css.password}
              id={formId ? `${formId}.password` : 'password'}
              label={passwordLabel}
              name="password"
              placeholder={passwordPlaceholder}
              type="password"
              validate={passwordRequired}
            />
          </div>
          <div className={css.bottomWrapper}>
            <p className={css.bottomWrapperText}>
              <span className={css.recoveryLinkInfo}>
                <FormattedMessage
                  id="LoginForm.forgotPasswordInfo"
                  values={{ passwordRecoveryLink }}
                />
              </span>
            </p>
            <PrimaryButton disabled={submitDisabled} inProgress={submitInProgress} type="submit">
              <FormattedMessage id="LoginForm.logIn" />
            </PrimaryButton>
          </div>
        </Form>
      );
    }}
  />
);

LoginFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  form: null,
  inProgress: false,
};

const { string, bool } = PropTypes;

LoginFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  form: string,
  inProgress: bool,
  intl: intlShape.isRequired,
};

const LoginForm = compose(injectIntl)(LoginFormComponent);
LoginForm.displayName = 'LoginForm';

export default LoginForm;
