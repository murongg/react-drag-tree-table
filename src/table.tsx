/* eslint-disable react/prop-types */
import classnames from 'classnames'
import React, { useState } from 'react'
import type { DragTreeColumnProps } from './column'
import { DragTreeRow } from './row'
import { exchangeData, RowDataMap } from './utils'
import { clearHoverStatus, setOpenAll, transformData } from './utils'
export interface DragTreeTableProps {
  data: Record<string, any>[]
  key: string
  columns: DragTreeColumnProps[]
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

export const DragTreeTable: React.FC<DragTreeTableProps> = ({ columns, data, onlySameLevelCanDrag, key = 'id' }) => {
  const [realData, setRealData] = useState<RowDataMap[]>(transformData(columns, data, null, key))

  const onDragOver: React.DragEventHandler<HTMLTableSectionElement> = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const onDrop: React.DragEventHandler<HTMLTableSectionElement> = (event) => {
    filter(event.pageX, event.clientY)
    if (event.clientY < 100)
      window.scrollTo(0, scrollY - 6)
    else if (event.clientY > (document.body.clientHeight - 160))
      window.scrollTo(0, scrollY + 6)
  }

  function filter(x: number, y: number) {
    const dragTarget = (window as any)._dragTarget as Element
    const dragKey = (window as any)._dragKey as string
    const dragParentKey = (window as any)._dragParentKey as string
    const dragRect = dragTarget.getBoundingClientRect()
    const dragW = dragRect.left + dragTarget.clientWidth
    const dragH = dragRect.top + dragTarget.clientHeight
    if (x >= dragRect.left && x <= dragW && y >= dragRect.top && y <= dragH) {
      // 当前正在拖拽原始块不允许插入
      return
    }
    let hoverBlock
    let targetKey
    let whereInsert = ''
    const rows = document.querySelectorAll('.tree-row')
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      const rect = row.getBoundingClientRect()
      const rx = rect.left
      const ry = rect.top
      const rw = row.clientWidth
      const rh = row.clientHeight
      if (x > rx && x < (rx + rw) && y > ry && y < (ry + rh)) {
        const diffY = y - ry
        const parentKey = row.getAttribute('data-parentkey')
        // 不允许改变层级结构，只能改变上下顺序逻辑
        if (onlySameLevelCanDrag !== undefined && parentKey !== dragParentKey)
          return

        targetKey = row.getAttribute('data-key')
        hoverBlock = row.children[row.children.length - 1]
        const rowHeight = (row as any).offsetHeight
        if (diffY / rowHeight > 3 / 4) {
          whereInsert = 'bottom'
        }
        else if (diffY / rowHeight > 1 / 4) {
          if (onlySameLevelCanDrag !== undefined) {
            // 不允许改变层级结构，只能改变上下顺序逻辑
            return
          }
          whereInsert = 'center'
        }
        else {
          whereInsert = 'top'
        }
        break
      }
    }
    if (!targetKey) {
      // 匹配不到清空上一个状态
      clearHoverStatus()
      whereInsert = ''
      return
    }
    const exchange = exchangeData(realData, dragKey, targetKey, whereInsert)
    console.log(exchange)
    setRealData(exchange)
    // console.log(dragRect, dragW, dragH)
  }

  return (
    <table className={classnames('table-auto', 'border-1')}>
      <thead className={classnames('border-1')}>
        <tr>
          {
            columns.map((col, index) => {
              return <th key={index} style={{ width: typeof col.width === 'number' ? `${col.width}px` : col.width }}>{col.key}</th>
            })
          }
        </tr>
      </thead>
      <tbody onDragOver={onDragOver} onDrop={onDrop} >
        <DragTreeRow data={realData} onClick={(event, data) => {
          const newData = setOpenAll(realData, data)
          setRealData(newData)
        }}></DragTreeRow>
      </tbody>
    </table>
  )
}
