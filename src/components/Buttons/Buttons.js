import React from 'react';
import './Buttons.css';
import classNames from 'classnames';

const Buttons = ({ children, pattern, ...props }) => (
  <button
    {...props}
    className={classNames(
      'button',
      `button-${pattern}`,
      props.className,
    )}
  >
    {children}
  </button>
);

export default Buttons;
