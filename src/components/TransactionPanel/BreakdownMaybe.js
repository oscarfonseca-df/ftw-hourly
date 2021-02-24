import React from 'react';
import classNames from 'classnames';
import config from '../../config';
import { DATE_TYPE_DATETIME } from '../../util/types';
import { ensureListing } from '../../util/data';
import { BookingBreakdown } from "..";
import css from './TransactionPanel.module.css';

// Functional component as a helper to build BookingBreakdown
const BreakdownMaybe = props => {
  const { className, rootClassName, breakdownClassName, transaction, transactionRole } = props;
  const loaded = transaction && transaction.id && transaction.booking && transaction.booking.id;
  const listingAttributes = ensureListing(transaction.listing).attributes;
  const timeZone =
    loaded && listingAttributes.availabilityPlan
      ? listingAttributes.availabilityPlan.timezone
      : 'Etc/UTC';

  const classes = classNames(rootClassName || css.breakdownMaybe, className);
  const breakdownClasses = classNames(breakdownClassName || css.breakdown);

  return loaded ? (
    <div className={classes}>
      <BookingBreakdown
        booking={transaction.booking}
        className={breakdownClasses}
        dateType={DATE_TYPE_DATETIME}
        timeZone={timeZone}
        transaction={transaction}
        unitType={config.bookingUnitType}
        userRole={transactionRole}
      />
    </div>
  ) : null;
};

export default BreakdownMaybe;
