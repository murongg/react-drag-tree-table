/* eslint-disable react/prop-types */
import classnames from 'classnames'
import React from 'react'
import type { DragTreeColumnProps } from './interface'

export const DragTreeColumn: React.FC<React.PropsWithChildren<DragTreeColumnProps>> = ({ children, width, flex, border, lable }) => {
  return (
    <div className={classnames('tree-column', `${border ? 'border' : ''}`)} style={{
      width: typeof width === 'number' ? `${width}px` : width,
      flex,
    }}>
      {children || lable}
    </div>
  )
}
