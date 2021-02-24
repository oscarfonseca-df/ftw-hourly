import React from 'react';
import { AvatarLarge, AvatarMedium } from '../../components';
import css from './ListingPage.module.css';

const SectionAvatar = props => {
  const { user } = props;
  return (
    <div className={css.sectionAvatar}>
      <AvatarLarge
        className={css.avatarDesktop}
        disableProfileLink
        initialsClassName={css.initialsDesktop}
        user={user}
      />

      <AvatarMedium className={css.avatarMobile} disableProfileLink user={user} />
    </div>
  );
};

export default SectionAvatar;
