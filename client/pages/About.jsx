import React from 'react'
import classNames from 'classnames'
import styles from './About.scss'

export default function About(props) {

  const testClass = classNames(styles['test'], {
    [styles['red']]: true,
    [styles['bold']]: false
  });

  return (
    <>
      <h1><span className={testClass}>red</span> About</h1>
      <p>{JSON.stringify(props, null, 2)}</p>
    </>
  )
}
