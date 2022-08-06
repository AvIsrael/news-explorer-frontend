import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import facebookIcon from '../../images/footer-facebook-icon.svg';
import githubIcon from '../../images/footer-github-icon.svg';

const Footer = () => (
  <footer className="footer">
    <span
      className="footer__copyright"
    >
      &copy;
      {' '}
      {new Date().getFullYear()}
      {' '}
      News Explorer, Powered by News API
    </span>
    <ul className="footer__content footer__content_type_links">
      <li>
        <Link
          to="/"
          className="footer__link"
        >
          Home
        </Link>
      </li>
      <li>
        <a
          className="footer__link"
          href="https://practicum.com/"
          target="_blank"
          rel="noreferrer"
        >
          Practicum By Yandex
        </a>
      </li>
    </ul>
    <ul className="footer__content footer__content_type_icons">
      <li>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="footer__icon"
            src={githubIcon}
            alt="github icon"
          />
        </a>
      </li>
      <li>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="footer__icon"
            src={facebookIcon}
            alt="facebook icon"
          />
        </a>
      </li>
    </ul>
  </footer>
);

export default Footer;
