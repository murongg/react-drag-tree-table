/* eslint-disable react/prop-types */
import classnames from 'classnames'
import React, { useRef, useState } from 'react'
import type { DragTreeColumnProps } from './column'
import { DragTreeColumn } from './column'

export interface DragTreeTableProps {
  data?: Record<string, any>
  column: DragTreeColumnProps[]
  isdraggable?: boolean
  onDrag?: () => void
  fixed?: string | boolean
  height?: string | number
  border?: boolean
  onlySameLevelCanDrag?: string
  hightRowChange?: string
  resize?: boolean
  beforeDragOver?: Function
}

export const DragTreeTable: React.FC<DragTreeTableProps> = ({ column, resize, border }) => {
  const tableRef = useRef<HTMLDivElement | null>(null)
  const [mouse, setMouse] = useState({
    status: 0,
    startX: 0,
    curColWidth: 0,
    curIndex: 0,
  })

  const mousedown = (index: number, event: any) => {
    const startX = event.target.getBoundingClientRect().x
    const curColWidth = event?.target?.parentElement.offsetWidth
    setMouse({
      ...mouse,
      status: 1,
      startX,
      curIndex: index,
      curColWidth,
    })
  }

  return (
    <div className="drag-tree-table" ref={tableRef}>
      <div
        className={classnames('drag-tree-table-header')}
      >
        {
          column.map((col, index) => {
            return (
              <DragTreeColumn
                width={col.width}
                flex={col.flex}
                border={border}
                key={index}
              >
                {col.children || col.title}
                <div
                  className="resize-line"
                  onMouseDown={$event => mousedown(index, $event)}
                  style={{ display: resize ? '' : 'none' }}
                > </div>
              </DragTreeColumn>
            )
          })
        }
      </div>
    </div >
  )
}
