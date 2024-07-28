import React, { useState, forwardRef, useImperativeHandle } from 'react'

const VisibilityState = {
  SHOW: true,
  HIDE: false
};

const Togglable = forwardRef(({ buttonLabel, defaultState = VisibilityState.HIDE, hideButton = 'cancel', children }, refs) => {
  const [visible, setVisible] = useState(defaultState)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>{hideButton}</button>
      </div>
    </div>
  )
})

Togglable.displayName = "Togglable"

export { Togglable, VisibilityState }
