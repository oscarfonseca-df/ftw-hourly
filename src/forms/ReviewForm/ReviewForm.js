import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { isTransactionsTransitionAlreadyReviewed } from '../../util/errors';
import { propTypes } from '../../util/types';
import { required } from '../../util/validators';
import { FieldReviewRating, Form, PrimaryButton, FieldTextInput } from '../../components';
import css from './ReviewForm.module.css';

const ReviewFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        className,
        rootClassName,
        disabled,
        handleSubmit,
        intl,
        formId,
        invalid,
        reviewSent,
        sendReviewError,
        sendReviewInProgress,
      } = fieldRenderProps;

      const reviewRating = intl.formatMessage({ id: 'ReviewForm.reviewRatingLabel' });
      const reviewRatingRequiredMessage = intl.formatMessage({
        id: 'ReviewForm.reviewRatingRequired',
      });

      const reviewContent = intl.formatMessage({ id: 'ReviewForm.reviewContentLabel' });
      const reviewContentPlaceholderMessage = intl.formatMessage({
        id: 'ReviewForm.reviewContentPlaceholder',
      });
      const reviewContentRequiredMessage = intl.formatMessage({
        id: 'ReviewForm.reviewContentRequired',
      });

      const errorMessage = isTransactionsTransitionAlreadyReviewed(sendReviewError) ? (
        <p className={css.error}>
          <FormattedMessage id="ReviewForm.reviewSubmitAlreadySent" />
        </p>
      ) : (
        <p className={css.error}>
          <FormattedMessage id="ReviewForm.reviewSubmitFailed" />
        </p>
      );
      const errorArea = sendReviewError ? errorMessage : <p className={css.errorPlaceholder} />;

      const reviewSubmitMessage = intl.formatMessage({
        id: 'ReviewForm.reviewSubmit',
      });

      const classes = classNames(rootClassName || css.root, className);
      const submitInProgress = sendReviewInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          <FieldReviewRating
            className={css.reviewRating}
            id={formId ? `${formId}.starRating` : 'starRating'}
            label={reviewRating}
            name="reviewRating"
            validate={required(reviewRatingRequiredMessage)}
          />

          <FieldTextInput
            className={css.reviewContent}
            id={formId ? `${formId}.reviewContent` : 'reviewContent'}
            label={reviewContent}
            name="reviewContent"
            placeholder={reviewContentPlaceholderMessage}
            type="textarea"
            validate={required(reviewContentRequiredMessage)}
          />

          {errorArea}
          <PrimaryButton
            className={css.submitButton}
            disabled={submitDisabled}
            inProgress={submitInProgress}
            ready={reviewSent}
            type="submit"
          >
            {reviewSubmitMessage}
          </PrimaryButton>
        </Form>
      );
    }}
  />
);

ReviewFormComponent.defaultProps = { className: null, rootClassName: null, sendReviewError: null };

const { bool, func, string } = PropTypes;

ReviewFormComponent.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  reviewSent: bool.isRequired,
  sendReviewError: propTypes.error,
  sendReviewInProgress: bool.isRequired,
};

const ReviewForm = compose(injectIntl)(ReviewFormComponent);
ReviewForm.displayName = 'ReviewForm';

export default ReviewForm;
