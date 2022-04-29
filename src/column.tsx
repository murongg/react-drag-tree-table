/* eslint-disable react/prop-types */
import classnames from 'classnames'
import './column.less'

export interface DragTreeColumnProps {
  width: number | string
  title?: string
  flex?: number
  border?: boolean
  children?: any
}

export const DragTreeColumn: React.FC<DragTreeColumnProps> = ({ children, width, flex, border }) => {
  return (
    <div className={classnames('tree-column', `${border ? 'border' : ''}`)} style={{
      width: typeof width === 'number' ? `${width}px` : width,
      flex,
    }}>
      {children}
    </div>
  )
}
