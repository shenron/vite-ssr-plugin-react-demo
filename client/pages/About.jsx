import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import style from './About.module.scss';

function About({ body } = {}) {
  const isRed = true;
  const isBold = true;

  const testClass = classNames(style.test, {
    [style.red]: isRed,
    [style.bold]: isBold,
  });

  return (
    <>
      <h1>
        <span className={testClass}>red bold</span>
        <span className={`${style.test} ${style.pink}`}>pink</span>
        <p>
          About
          <br />
          {' '}
          {body.res}
        </p>
      </h1>
    </>
  );
}

About.propTypes = {
  body: PropTypes.object.isRequired,
};

export default About;
