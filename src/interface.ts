import type { ReactNode } from 'react'

export type render = (value: any, record: any, index: number) => ReactNode
export type onExpand = (expanded: boolean, record: any) => void

export interface DragTreeTableProps {
  data: Record<string, any>[]
  key?: string
  columns: DragTreeColumnProps[]
  isdraggable?: boolean
  onDrag?: (current: Record<string, any>, target: Record<string, any>, whereInsert: WHERE_INSERT | null) => void
  onExpand?: onExpand
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

export interface DragTreeColumnProps extends Pick<DragTreeTableProps, "key" | "border"> {
  width?: number | string
  lable?: string
  flex?: number
  render?: render
}

export interface DragTreeRowProps extends Pick<DragTreeTableProps, "border"> {
  data: RowDataMap<any>[]
  depth?: number
  isdraggable?: boolean
  border?: boolean
  onClick: (event: React.MouseEvent<any, MouseEvent>, data: RowDataMap, current: RowDataProps) => void
}

export interface RowDataProps extends Pick<RowDataMap, "_data"> {
  width?: number | string
  content: any
  flex?: number
  render?: render
}

export interface RowDataMap<T = any | undefined> {
  key: string
  parentKey: string | number | null
  props: RowDataProps[]
  children: RowDataMap<T>[]
  open: boolean
  childOpen: boolean
  _data: T
}
