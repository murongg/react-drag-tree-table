/* eslint-disable react/prop-types */
import classnames from 'classnames'

export interface DragTreeColumnProps {
  width?: number | string
  key?: string | number
  lable?: string
  flex?: number
  border?: boolean
  children?: any
}

export const DragTreeColumn: React.FC<DragTreeColumnProps> = ({ children, width, flex, border, lable }) => {
  return (
    <div className={classnames('tree-column', `${border ? 'border' : ''}`)} style={{
      width: typeof width === 'number' ? `${width}px` : width,
      flex,
    }}>
      {children || lable}
    </div>
  )
}
