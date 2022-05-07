# <p align="center">react-drag-tree-table</p>

<p align="center">

   [![NPM version](https://img.shields.io/npm/v/react-drag-tree-table?color=a1b858&label=)](https://www.npmjs.com/package/react-drag-tree-table)

   English | [简体中文](https://github.com/murongg/react-drag-tree-table/blob/main/README.zh-Hans.md)
   
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
| columns  | table columns | - | DragTreeColumnProps |
| data  | table data | - | - |
| key  | key from render data | - | "id" |
| isdraggable  | whether it can be dragged | - | true |
| height  | table height | - | 400(px) |
| border  | table border | - | false |
| fixed  | fixed table header | - | false |
| flex  | automatic filling of remaining areas, follow the flex layout of CSS | - | false |
| onlySameLevelCanDrag  | drag-and-drop hierarchy changes are  prohibited | - | false |


## ⛱ Interface

```ts
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
```

## 💗 Thanks

- [mafengwo/vue-drag-tree-table](https://github.com/mafengwo/vue-drag-tree-table)

## 📄 TODO
- [ ] Perfect the documents
- [x] onDrag
- [x] isdraggable
- [x] fixed
- [x] height
- [x] border
- [x] onlySameLevelCanDrag
