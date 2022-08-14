import './notify.css';
import React from 'react';
import classNames from 'classnames';
import notifyIcon from '../../images/notify.svg';

const Notify = ({ message, isVisible }) => (
  <div
    className={classNames('notify', isVisible && 'notify_visible')}
  >
    <img
      src={notifyIcon}
      aria-hidden
      alt="bell image"
      className="notify__image"
    />

    <p className="notify__description">
      {message}
    </p>
  </div>
);

export default Notify;
