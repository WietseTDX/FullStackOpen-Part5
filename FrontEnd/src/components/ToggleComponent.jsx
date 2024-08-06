import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const VisibilityState = {
  SHOW: true,
  HIDE: false
}

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
      <div style={showWhenVisible} className='TogglableContent'>
        {children}
        <button onClick={toggleVisibility}>{hideButton}</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  defaultState: PropTypes.oneOf([VisibilityState.SHOW, VisibilityState.HIDE]),
  hideButton: PropTypes.string,
  children: PropTypes.node.isRequired
}

Togglable.defaultProps = {
  defaultState: VisibilityState.HIDE,
  hideButton: 'cancel'
}

export { Togglable, VisibilityState }
