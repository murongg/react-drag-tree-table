import type { ReactNode } from 'react'

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

export type render = (value: any, record: any, index: number) => ReactNode

export interface DragTreeColumnProps {
  width?: number | string
  key?: string | number
  lable?: string
  flex?: number
  border?: boolean
  render?: render
}

export interface DragTreeRowProps {
  data: RowDataMap<any>[]
  depth?: number
  isdraggable?: boolean
  border?: boolean
  onClick: (event: React.MouseEvent<any, MouseEvent>, data: RowDataMap, current: any) => void
}

export interface RowDataProps<T = any | undefined> {
  width?: number | string
  content: any
  flex?: number
  _data: T
  render?: render
}
export interface RowDataMap<T = any | undefined> {
  key: string
  parentKey: string | number | null
  props: RowDataProps<T>[]
  children: RowDataMap<T>[]
  open: boolean
  childOpen: boolean
  _data: T
}
