import React from 'react';
import { string, oneOfType, bool } from 'prop-types';
import classNames from 'classnames';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import {
  ensureUser,
  ensureCurrentUser,
  userDisplayNameAsString,
  userAbbreviatedName,
} from '../../util/data';
import { ResponsiveImage, IconBannedUser, NamedLink } from "..";
import css from './Avatar.module.css';

// Responsive image sizes hint
const AVATAR_SIZES = '40px';
const AVATAR_SIZES_MEDIUM = '60px';
const AVATAR_SIZES_LARGE = '96px';

const AVATAR_IMAGE_VARIANTS = [
  // 40x40
  'square-xsmall',

  // 80x80
  'square-xsmall2x',

  // 240x240
  'square-small',

  // 480x480
  'square-small2x',
];

export const AvatarComponent = props => {
  const {
    rootClassName,
    className,
    initialsClassName,
    user,
    renderSizes,
    disableProfileLink,
    intl,
  } = props;
  const classes = classNames(rootClassName || css.root, className);

  const userIsCurrentUser = user && user.type === 'currentUser';
  const avatarUser = userIsCurrentUser ? ensureCurrentUser(user) : ensureUser(user);

  const isBannedUser = avatarUser.attributes.banned;
  const isDeletedUser = avatarUser.attributes.deleted;

  const bannedUserDisplayName = intl.formatMessage({
    id: 'Avatar.bannedUserDisplayName',
  });

  const deletedUserDisplayName = intl.formatMessage({
    id: 'Avatar.deletedUserDisplayName',
  });

  const defaultUserDisplayName = isBannedUser
    ? bannedUserDisplayName
    : isDeletedUser
    ? deletedUserDisplayName
    : '';

  const defaultUserAbbreviatedName = '';

  const displayName = userDisplayNameAsString(avatarUser, defaultUserDisplayName);
  const abbreviatedName = userAbbreviatedName(avatarUser, defaultUserAbbreviatedName);
  const rootProps = { className: classes, title: displayName };
  const linkProps = avatarUser.id
    ? { name: 'ProfilePage', params: { id: avatarUser.id.uuid } }
    : { name: 'ProfileBasePage' };
  const hasProfileImage = avatarUser.profileImage && avatarUser.profileImage.id;
  const profileLinkEnabled = !disableProfileLink;

  const classForInitials = initialsClassName || css.initials;

  if (isBannedUser || isDeletedUser) {
    return (
      <div {...rootProps}>
        <IconBannedUser className={css.bannedUserIcon} />
      </div>
    );
  } else if (hasProfileImage && profileLinkEnabled) {
    return (
      <NamedLink {...rootProps} {...linkProps}>
        <ResponsiveImage
          alt={displayName}
          image={avatarUser.profileImage}
          rootClassName={css.avatarImage}
          sizes={renderSizes}
          variants={AVATAR_IMAGE_VARIANTS}
        />
      </NamedLink>
    );
  } else if (hasProfileImage) {
    return (
      <div {...rootProps}>
        <ResponsiveImage
          alt={displayName}
          image={avatarUser.profileImage}
          rootClassName={css.avatarImage}
          sizes={renderSizes}
          variants={AVATAR_IMAGE_VARIANTS}
        />
      </div>
    );
  } else if (profileLinkEnabled) {
    // Placeholder avatar (initials)
    return (
      <NamedLink {...rootProps} {...linkProps}>
        <span className={classForInitials}>{abbreviatedName}</span>
      </NamedLink>
    );
  } else {
    // Placeholder avatar (initials)
    return (
      <div {...rootProps}>
        <span className={classForInitials}>{abbreviatedName}</span>
      </div>
    );
  }
};

AvatarComponent.defaultProps = {
  className: null,
  rootClassName: null,
  initialsClassName: null,
  user: null,
  renderSizes: AVATAR_SIZES,
  disableProfileLink: false,
};

AvatarComponent.propTypes = {
  rootClassName: string,
  className: string,
  initialsClassName: string,
  user: oneOfType([propTypes.user, propTypes.currentUser]),

  renderSizes: string,
  disableProfileLink: bool,

  // from injectIntl
  intl: intlShape.isRequired,
};

const Avatar = injectIntl(AvatarComponent);

export default Avatar;

export const AvatarMedium = props => (
  <Avatar renderSizes={AVATAR_SIZES_MEDIUM} rootClassName={css.mediumAvatar} {...props} />
);
AvatarMedium.displayName = 'AvatarMedium';

export const AvatarLarge = props => (
  <Avatar renderSizes={AVATAR_SIZES_LARGE} rootClassName={css.largeAvatar} {...props} />
);
AvatarLarge.displayName = 'AvatarLarge';
