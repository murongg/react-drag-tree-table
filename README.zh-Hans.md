# <p align="center">react-drag-tree-table</p>

<p align="center">

   [![NPM version](https://img.shields.io/npm/v/react-drag-tree-table?color=a1b858&label=)](https://www.npmjs.com/package/react-drag-tree-table)
   
   [English](https://github.com/murongg/react-drag-tree-table/blob/main/README.md) | 简体中文

</p>

## 📦 Install

```
npm i react-drag-tree-table
```

## 👽 Usage

```tsx
import { DragTreeTable } from 'react-drag-tree-table'
import 'react-drag-tree-table/dist/index.css'

<DragTreeTable columns={columns} data={data} />
```

## 📁 Options

|  option   | description  | default | type |
|  ----  | ----  | ----  | ----  |
| columns  | 表格的列 | - | DragTreeColumnProps |
| data  | 表格数据 | - | - |
| key  | 渲染数据时所用到的key | - | "id" |
| isdraggable  | 是否可拖拽 | - | true |
| height  | 表格高度 | - | 400(px) |
| border  | 表格边框 | - | false |
| fixed  | 固定表头 | - | false |
| flex  | 自动填充剩余区域，遵循CSS的flex布局 | - | false |
| onlySameLevelCanDrag  | 禁止更改拖放层次结构 | - | false |

## 📁 Events

|  event   | description  | default | type |
|  ----  | ----  | ----  | ----  |
| onDrag  | 在拖动行时执行的回调 | function(current, target, whereInsert) | - |
| onExpand  | 单击行展开图标时执行的回调 | function(expanded, record) | - |


## ⛱ Interface

```ts
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
  onClick: (event: React.MouseEvent<any, MouseEvent>, data: RowDataMap, current: RowDataProps) => void
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
```

## 💗 Thanks

- [mafengwo/vue-drag-tree-table](https://github.com/mafengwo/vue-drag-tree-table)

## 📄 TODO
- [ ] 完善文档
- [x] onDrag
- [x] isdraggable
- [x] fixed
- [x] height
- [x] border
- [x] onlySameLevelCanDrag
