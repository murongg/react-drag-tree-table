# <center>react-drag-tree-table</center>

<center>

   [![NPM version](https://img.shields.io/npm/v/react-drag-tree-table?color=a1b858&label=)](https://www.npmjs.com/package/react-drag-tree-table)
   
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
| columns  | table columns | - | DragTreeColumnProps |
| data  | table data | - | - |
| key  | key from render data | - | "id" |
| isdraggable  | whether it can be dragged | - | true |
| onlySameLevelCanDrag  | drag-and-drop hierarchy changes are  prohibited | - | false |


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
  TOP = 'TOP',
  CENTER = 'CENTER',
  BOTTOM = 'BOTTOM'
}
```

## 💗 Thanks

- [mafengwo/vue-drag-tree-table](https://github.com/mafengwo/vue-drag-tree-table)

## 📄 TODO
- [ ] Perfect the documents
- [x] onDrag
- [ ] isdraggable
- [ ] fixed
- [ ] height
- [ ] border
- [ ] onlySameLevelCanDrag
- [ ] border
