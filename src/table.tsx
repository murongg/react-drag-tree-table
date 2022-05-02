/* eslint-disable react/prop-types */
import classnames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import type { DragTreeColumnProps } from './column'
import { DragTreeRow } from './row'
import { RowDataMap, setOpenAll, transformData } from './utils'
export interface DragTreeTableProps {
  data: Record<string, any>[]
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

export const DragTreeTable: React.FC<DragTreeTableProps> = ({ columns, data, resize, border }) => {
  const [realData, setRealData] = useState<RowDataMap[]>(transformData(columns, data))
  return (
    <table className={classnames("table-auto", "border-1")}>
      <thead className={classnames("border-1")}>
        <tr>
          {
            columns.map((col, index) => {
              return <th key={index} style={{ "width": typeof col.width === "number" ? `${col.width}px` : col.width }}>{col.key}</th>
            })
          }
        </tr>
      </thead>
      <tbody>
        <DragTreeRow data={realData} onClick={(event, data, current) => {
          const newData = setOpenAll(realData, data)
          setRealData(newData)
        }}></DragTreeRow>
      </tbody>
    </table>
  )
}
