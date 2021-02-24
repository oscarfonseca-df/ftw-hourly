import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { UserCard, Modal } from '../../components';
import { EnquiryForm } from '../../forms';
import css from './ListingPage.module.css';

const SectionHostMaybe = props => {
  const {
    title,
    listing,
    authorDisplayName,
    onContactUser,
    isEnquiryModalOpen,
    onCloseEnquiryModal,
    sendEnquiryError,
    sendEnquiryInProgress,
    onSubmitEnquiry,
    currentUser,
    onManageDisableScrolling,
  } = props;

  if (!listing.author) {
    return null;
  }

  return (
    <div className={css.sectionHost} id="host">
      <h2 className={css.yourHostHeading}>
        <FormattedMessage id="ListingPage.yourHostHeading" />
      </h2>
      <UserCard currentUser={currentUser} onContactUser={onContactUser} user={listing.author} />
      <Modal
        contentClassName={css.enquiryModalContent}
        id="ListingPage.enquiry"
        isOpen={isEnquiryModalOpen}
        onClose={onCloseEnquiryModal}
        onManageDisableScrolling={onManageDisableScrolling}
        usePortal
      >
        <EnquiryForm
          authorDisplayName={authorDisplayName}
          className={css.enquiryForm}
          inProgress={sendEnquiryInProgress}
          listingTitle={title}
          onSubmit={onSubmitEnquiry}
          sendEnquiryError={sendEnquiryError}
          submitButtonWrapperClassName={css.enquirySubmitButtonWrapper}
        />
      </Modal>
    </div>
  );
};

export default SectionHostMaybe;
