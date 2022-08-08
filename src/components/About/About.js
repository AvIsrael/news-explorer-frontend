import React from 'react';
import './About.css';
import authorImage from '../../images/author-photo.jpg';

const About = () => (
  <section className="about">
    <img className="about__image" src={authorImage} aria-hidden alt="author photo" />
    <div className="about__wrapper">
      <h2 className="about__title">About the author</h2>
      <p className="about__text">
        Hi! My name is Avihail Stepovyi. I am fullstack developer creating web
        applications with responsive design. This app was created with React, Node, Express,
        MongoDB technologies.
        {' '}
      </p>
      <p className="about__text">
        This app I created using knowledge and technologies that I was learned in Practicum100.
      </p>
    </div>
  </section>
);

export default About;
