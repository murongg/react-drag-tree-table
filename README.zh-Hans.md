# <center>react-drag-tree-table</center>

<center>

   [![NPM version](https://img.shields.io/npm/v/react-drag-tree-table?color=a1b858&label=)](https://www.npmjs.com/package/react-drag-tree-table)
   
   [English](https://github.com/murongg/react-drag-tree-table/blob/v0.1.1/README.md) | 简体中文

</center>

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
| onlySameLevelCanDrag  | 禁止更改拖放层次结构 | - | false |


## ⛱ Interface

```ts
interface DragTreeColumnProps {
  width?: number | string
  key?: string | number
  lable?: string
  flex?: number
  border?: boolean
  children?: any
}

interface DragTreeTableProps {
  data: Record<string, any>[]
  key: string
  columns: DragTreeColumnProps[]
  isdraggable?: boolean
  onDrag?: (current: Record<string, any>, target: Record<string, any>, whereInsert: WHERE_INSERT | null) => void
  fixed?: string | boolean
  height?: string | number
  border?: boolean
  onlySameLevelCanDrag?: boolean
}

enum WHERE_INSERT {
  TOP = 'TOP', // 拖拽至目标数据上方
  CENTER = 'CENTER', // 拖拽至目标数据子节点
  BOTTOM = 'BOTTOM', // 拖拽至目标数据下方
}
```

## 💗 Thanks

- [mafengwo/vue-drag-tree-table](https://github.com/mafengwo/vue-drag-tree-table)

## 📄 TODO
- [ ] 完善文档
- [x] onDrag
- [ ] isdraggable
- [ ] fixed
- [ ] height
- [ ] border
- [ ] onlySameLevelCanDrag
- [ ] border