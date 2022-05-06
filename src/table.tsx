/* eslint-disable react/prop-types */
import classnames from 'classnames'
import React, { useState } from 'react'
import type { DragTreeColumnProps } from './column'
import { DragTreeColumn } from './column'
import { DragTreeRow } from './row'
import type { RowDataMap } from './utils'
import { clearHoverStatus, exchangeData, findData, setOpenAll, transformData } from './utils'
export interface DragTreeTableProps {
  data: Record<string, any>[]
  key?: string
  columns: DragTreeColumnProps[]
  isdraggable?: boolean
  onDrag?: (current: Record<string, any>, target: Record<string, any>, whereInsert: WHERE_INSERT | null) => void
  fixed?: boolean
  height?: string | number
  border?: boolean
  onlySameLevelCanDrag?: string
  hightRowChange?: string
  resize?: boolean
  beforeDragOver?: Function
}

export enum WHERE_INSERT {
  TOP = 'TOP', // drag onto target data
  CENTER = 'CENTER', // drag to the target data children
  BOTTOM = 'BOTTOM', // drag it below the target data
}

export const DragTreeTable: React.FC<DragTreeTableProps> = ({ columns, data, onlySameLevelCanDrag, isdraggable, key = 'id', border, fixed, height = 400, onDrag }) => {
  const [realData, setRealData] = useState<RowDataMap[]>(transformData(columns, data, null, key))
  const [bodyStyle] = useState({
    overflow: fixed ? 'auto' : 'hidden',
    height: fixed ? height + 'px' : 'auto'
  })
  const onDragOver: React.DragEventHandler<HTMLTableSectionElement> = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    filter(event.pageX, event.clientY)
    if (event.clientY < 100)
      window.scrollTo(0, scrollY - 6)
    else if (event.clientY > (document.body.clientHeight - 160))
      window.scrollTo(0, scrollY + 6)
  }

  const [targetKey, setTargetKey] = useState<number | string>()
  const [whereInsert, setWhereInsert] = useState<WHERE_INSERT | null>(null)

  const onDrop: React.DragEventHandler<HTMLTableSectionElement> = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    const dragKey = (window as any)._dragKey as string
    clearHoverStatus()
    const exchange = exchangeData(realData, dragKey, targetKey, whereInsert || WHERE_INSERT.TOP)
    if (exchange) {
      setRealData(exchange)
      const currentData = findData(exchange, dragKey)?._data
      const targetData = findData(exchange, targetKey)?._data
      onDrag && onDrag(currentData, targetData, whereInsert)
    }
  }

  function filter(x: number, y: number) {
    const dragTarget = (window as any)._dragTarget as Element
    const dragParentKey = (window as any)._dragParentKey as string
    const dragRect = dragTarget.getBoundingClientRect()
    const dragW = dragRect.left + dragTarget.clientWidth
    const dragH = dragRect.top + dragTarget.clientHeight
    if (x >= dragRect.left && x <= dragW && y >= dragRect.top && y <= dragH) {
      // 当前正在拖拽原始块不允许插入
      return
    }
    let hoverBlock: HTMLElement | undefined
    let targetKey
    let whereInsert: WHERE_INSERT | null = null
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
        hoverBlock = row.children[row.children.length - 1] as HTMLElement
        const rowHeight = (row as any).offsetHeight
        if (diffY / rowHeight > 3 / 4) {
          whereInsert = WHERE_INSERT.BOTTOM
        }
        else if (diffY / rowHeight > 1 / 4) {
          if (onlySameLevelCanDrag !== undefined) {
            // 不允许改变层级结构，只能改变上下顺序逻辑
            return
          }
          whereInsert = WHERE_INSERT.CENTER
        }
        else {
          whereInsert = WHERE_INSERT.TOP
        }
        break
      }
    }
    if (!targetKey) {
      // 匹配不到清空上一个状态
      clearHoverStatus()
      whereInsert = null
      return
    }
    if (hoverBlock) {
      hoverBlock.style.display = 'block'
      const children = hoverBlock.children
      const children0 = children[0] as HTMLDivElement
      const children1 = children[1] as HTMLDivElement
      const children2 = children[2] as HTMLDivElement
      if (whereInsert === WHERE_INSERT.BOTTOM && children2.style.opacity !== '0.5')
        children2.style.opacity = '0.5'

      else if (whereInsert === WHERE_INSERT.CENTER && children1.style.opacity !== '0.5')
        children1.style.opacity = '0.5'

      else if (children0.style.opacity !== '0.5')
        children0.style.opacity = '0.5'
    }
    setTargetKey(targetKey)
    setWhereInsert(whereInsert)
  }

  return (
    <div className={classnames('table-auto', 'drag-tree-table', border ? 'border' : '')}>
      <div className={'drag-tree-table-header'}>
        {
          columns.map((col) => {
            return <DragTreeColumn width={col.width} key={col.key} lable={col.lable} border={border}>
              {col.children}
            </DragTreeColumn>
          })
        }
      </div>
      <div className={classnames("drag-tree-table-body")} style={bodyStyle} onDragOver={onDragOver} onDrop={onDrop} >
        <DragTreeRow data={realData} isdraggable={isdraggable} border={border} onClick={(event, data) => {
          const newData = setOpenAll(realData, data)
          setRealData(newData)
        }}></DragTreeRow>
      </div>
    </div>
  )
}
