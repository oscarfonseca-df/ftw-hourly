import React, { Component } from 'react';
import { array, bool, func, number, shape, string } from 'prop-types';
import { compose } from 'redux';
import pickBy from 'lodash/pickBy';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import config from '../../config';
import routeConfiguration from '../../routeConfiguration';
import { withViewport } from '../../util/contextHelpers';
import { parse, stringify } from '../../util/urlHelpers';
import { createResourceLocatorString, pathByRouteName } from '../../util/routes';
import { propTypes } from '../../util/types';
import {
  Button,
  LimitedAccessBanner,
  Logo,
  Modal,
  ModalMissingInformation,
  NamedLink,
  TopbarDesktop,
  TopbarMobileMenu,
} from "..";
import { TopbarSearchForm } from '../../forms';
import MenuIcon from './MenuIcon';
import SearchIcon from './SearchIcon';
import css from './Topbar.module.css';

const MAX_MOBILE_SCREEN_WIDTH = 768;

const redirectToURLWithModalState = (props, modalStateParam) => {
  const { history, location } = props;
  const { pathname, search, state } = location;
  const searchString = `?${stringify({ [modalStateParam]: 'open', ...parse(search) })}`;
  history.push(`${pathname}${searchString}`, state);
};

const redirectToURLWithoutModalState = (props, modalStateParam) => {
  const { history, location } = props;
  const { pathname, search, state } = location;
  const queryParams = pickBy(parse(search), (v, k) => k !== modalStateParam);
  const stringified = stringify(queryParams);
  const searchString = stringified ? `?${stringified}` : '';
  history.push(`${pathname}${searchString}`, state);
};

const GenericError = props => {
  const { show } = props;
  const classes = classNames(css.genericError, {
    [css.genericErrorVisible]: show,
  });
  return (
    <div className={classes}>
      <div className={css.genericErrorContent}>
        <p className={css.genericErrorText}>
          <FormattedMessage id="Topbar.genericError" />
        </p>
      </div>
    </div>
  );
};

GenericError.propTypes = {
  show: bool.isRequired,
};

class TopbarComponent extends Component {
  constructor(props) {
    super(props);
    this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
    this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this);
    this.handleMobileSearchOpen = this.handleMobileSearchOpen.bind(this);
    this.handleMobileSearchClose = this.handleMobileSearchClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleMobileMenuOpen() {
    redirectToURLWithModalState(this.props, 'mobilemenu');
  }

  handleMobileMenuClose() {
    redirectToURLWithoutModalState(this.props, 'mobilemenu');
  }

  handleMobileSearchOpen() {
    redirectToURLWithModalState(this.props, 'mobilesearch');
  }

  handleMobileSearchClose() {
    redirectToURLWithoutModalState(this.props, 'mobilesearch');
  }

  handleSubmit(values) {
    const { currentSearchParams } = this.props;
    const { search, selectedPlace } = values.location;
    const { history } = this.props;
    const { origin, bounds } = selectedPlace;
    const originMaybe = config.sortSearchByDistance ? { origin } : {};
    const searchParams = {
      ...currentSearchParams,
      ...originMaybe,
      address: search,
      bounds,
    };
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams));
  }

  handleLogout() {
    const { onLogout, history } = this.props;
    onLogout().then(() => {
      const path = pathByRouteName('LandingPage', routeConfiguration());

      // In production we ensure that data is really lost,
      // but in development mode we use stored values for debugging
      if (config.dev) {
        history.push(path);
      } else if (typeof window !== 'undefined') {
        window.location = path;
      }

      console.log('logged out'); // eslint-disable-line
    });
  }

  render() {
    const {
      className,
      rootClassName,
      desktopClassName,
      mobileRootClassName,
      mobileClassName,
      isAuthenticated,
      authScopes,
      authInProgress,
      currentUser,
      currentUserHasListings,
      currentUserListing,
      currentUserListingFetched,
      currentUserHasOrders,
      currentPage,
      notificationCount,
      viewport,
      intl,
      location,
      onManageDisableScrolling,
      onResendVerificationEmail,
      sendVerificationEmailInProgress,
      sendVerificationEmailError,
      showGenericError,
    } = this.props;

    const { mobilemenu, mobilesearch, address, origin, bounds } = parse(location.search, {
      latlng: ['origin'],
      latlngBounds: ['bounds'],
    });

    const notificationDot = notificationCount > 0 ? <div className={css.notificationDot} /> : null;

    const isMobileLayout = viewport.width < MAX_MOBILE_SCREEN_WIDTH;
    const isMobileMenuOpen = isMobileLayout && mobilemenu === 'open';
    const isMobileSearchOpen = isMobileLayout && mobilesearch === 'open';

    const mobileMenu = (
      <TopbarMobileMenu
        currentPage={currentPage}
        currentUser={currentUser}
        currentUserHasListings={currentUserHasListings}
        currentUserListing={currentUserListing}
        currentUserListingFetched={currentUserListingFetched}
        isAuthenticated={isAuthenticated}
        notificationCount={notificationCount}
        onLogout={this.handleLogout}
      />
    );

    // Only render current search if full place object is available in the URL params
    const locationFieldsPresent = config.sortSearchByDistance
      ? address && origin && bounds
      : address && bounds;
    const initialSearchFormValues = {
      location: locationFieldsPresent
        ? {
            search: address,
            selectedPlace: { address, origin, bounds },
          }
        : null,
    };

    const classes = classNames(rootClassName || css.root, className);

    return (
      <div className={classes}>
        <LimitedAccessBanner
          authScopes={authScopes}
          currentPage={currentPage}
          currentUser={currentUser}
          isAuthenticated={isAuthenticated}
          onLogout={this.handleLogout}
        />
        <div className={classNames(mobileRootClassName || css.container, mobileClassName)}>
          <Button
            onClick={this.handleMobileMenuOpen}
            rootClassName={css.menu}
            title={intl.formatMessage({ id: 'Topbar.menuIcon' })}
          >
            <MenuIcon className={css.menuIcon} />
            {notificationDot}
          </Button>
          <NamedLink
            className={css.home}
            name="LandingPage"
            title={intl.formatMessage({ id: 'Topbar.logoIcon' })}
          >
            <Logo format="mobile" />
          </NamedLink>
          <Button
            onClick={this.handleMobileSearchOpen}
            rootClassName={css.searchMenu}
            title={intl.formatMessage({ id: 'Topbar.searchIcon' })}
          >
            <SearchIcon className={css.searchMenuIcon} />
          </Button>
        </div>
        <div className={css.desktop}>
          <TopbarDesktop
            className={desktopClassName}
            currentPage={currentPage}
            currentUser={currentUser}
            currentUserHasListings={currentUserHasListings}
            currentUserListing={currentUserListing}
            currentUserListingFetched={currentUserListingFetched}
            initialSearchFormValues={initialSearchFormValues}
            intl={intl}
            isAuthenticated={isAuthenticated}
            notificationCount={notificationCount}
            onLogout={this.handleLogout}
            onSearchSubmit={this.handleSubmit}
          />
        </div>
        <Modal
          id="TopbarMobileMenu"
          isOpen={isMobileMenuOpen}
          onClose={this.handleMobileMenuClose}
          onManageDisableScrolling={onManageDisableScrolling}
          usePortal
        >
          {authInProgress ? null : mobileMenu}
        </Modal>
        <Modal
          containerClassName={css.modalContainer}
          id="TopbarMobileSearch"
          isOpen={isMobileSearchOpen}
          onClose={this.handleMobileSearchClose}
          onManageDisableScrolling={onManageDisableScrolling}
          usePortal
        >
          <div className={css.searchContainer}>
            <TopbarSearchForm
              initialValues={initialSearchFormValues}
              isMobile
              onSubmit={this.handleSubmit}
            />
            <p className={css.mobileHelp}>
              <FormattedMessage id="Topbar.mobileSearchHelp" />
            </p>
          </div>
        </Modal>
        <ModalMissingInformation
          containerClassName={css.missingInformationModal}
          currentUser={currentUser}
          currentUserHasListings={currentUserHasListings}
          currentUserHasOrders={currentUserHasOrders}
          id="MissingInformationReminder"
          location={location}
          onManageDisableScrolling={onManageDisableScrolling}
          onResendVerificationEmail={onResendVerificationEmail}
          sendVerificationEmailError={sendVerificationEmailError}
          sendVerificationEmailInProgress={sendVerificationEmailInProgress}
        />

        <GenericError show={showGenericError} />
      </div>
    );
  }
}

TopbarComponent.defaultProps = {
  className: null,
  rootClassName: null,
  desktopClassName: null,
  mobileRootClassName: null,
  mobileClassName: null,
  notificationCount: 0,
  currentUser: null,
  currentUserHasOrders: null,
  currentPage: null,
  sendVerificationEmailError: null,
  authScopes: [],
};

TopbarComponent.propTypes = {
  className: string,
  rootClassName: string,
  desktopClassName: string,
  mobileRootClassName: string,
  mobileClassName: string,
  isAuthenticated: bool.isRequired,
  authScopes: array,
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  currentUserHasOrders: bool,
  currentPage: string,
  notificationCount: number,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onResendVerificationEmail: func.isRequired,
  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: propTypes.error,
  showGenericError: bool.isRequired,

  // These are passed from Page to keep Topbar rendering aware of location changes
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string.isRequired,
  }).isRequired,

  // from withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const Topbar = compose(
  withViewport,
  injectIntl
)(TopbarComponent);

Topbar.displayName = 'Topbar';

export default Topbar;
