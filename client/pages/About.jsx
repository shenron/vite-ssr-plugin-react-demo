import React from 'react';
import classNames from 'classnames';
import style from './About.module.scss';

export default function About(props) {
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
        About
      </h1>
      <p>{JSON.stringify(props, null, 2)}</p>
    </>
  );
}
