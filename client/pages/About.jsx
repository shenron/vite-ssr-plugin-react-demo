import React from 'react'
import classNames from 'classnames'
import './About.scss'

export default function About(props) {

  const isRed = true
  const isBold = false

  const testClass = classNames('test', {
    ['red']: isRed,
    ['bold']: isBold
  })

  return (
    <>
      <h1><span className={testClass}>red</span> About</h1>
      <p>{JSON.stringify(props, null, 2)}</p>
    </>
  )
}
