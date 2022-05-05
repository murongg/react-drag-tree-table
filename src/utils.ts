import { cloneDeep } from 'lodash-es'
import { number } from 'prop-types'
import type { DragTreeColumnProps } from '.'
export interface RowDataProps<T> {
  content: any
  _data: T
}
export interface RowDataMap<T = any | undefined> {
  key: string | number
  parentKey: string | number | null
  props: RowDataProps<T>[]
  children: RowDataMap<T>[]
  open: boolean
  childOpen: boolean
}

export function transformData(columns: DragTreeColumnProps[], data: Record<string, any>[], parentKey: string | number | null, key: string): RowDataMap<any>[] {
  const res: RowDataMap<any>[] = []
  const keys = columns.map(col => col.key)

  for (const i in data) {
    const d = data[i]
    res[i] = {
      key: String(d[key]),
      parentKey: parentKey || null,
      props: [],
      children: [],
      open: true,
      childOpen: true,
    }
    for (const k of keys) {
      res[i].props.push({
        content: d[k as string],
        _data: d,
      })
    }
    if (d.children && d.children.length > 0)
      res[i].children = transformData(columns, d.children, d.id, key)
  }
  return res
}

export function setOpenAll(rawData: RowDataMap[], currentData: RowDataMap) {
  const newCurrentData = cloneDeep(currentData)
  const openStatus = !newCurrentData.childOpen
  setDataOpenStatus(newCurrentData.children, openStatus)
  const result: RowDataMap[] = cloneDeep(rawData)
  const key = newCurrentData.key

  function deepSetData(data: RowDataMap[]) {
    for (const item of data) {
      if (item.key === key) {
        item.children = newCurrentData.children
        item.childOpen = openStatus
      }
      else {
        deepSetData(item.children)
      }
    }
  }
  deepSetData(result)
  return result
}

export function setDataOpenStatus(data: RowDataMap[], open: boolean) {
  function deepSetStatus(data: RowDataMap[]) {
    for (const item of data) {
      item.open = open
      if (item.children && item.children.length > 0)
        deepSetStatus(item.children)
      else
        item.childOpen = open
    }
  }
  deepSetStatus(data)
  return data
}

export function clearHoverStatus() {
  // const rows = document.querySelectorAll('.tree-row')
  // for (let i = 0; i < rows.length; i++) {
  //   const row = rows[i]
  //   const hoverBlock = row.children[row.children.length - 1]
  //   hoverBlock.style.display = 'none'
  //   hoverBlock.children[0].style.opacity = 0.1
  //   hoverBlock.children[1].style.opacity = 0.1
  //   hoverBlock.children[2].style.opacity = 0.1
  // }
}

export function findData(data: RowDataMap[], key: any) {
  let res: RowDataMap | undefined
  function deep(data: RowDataMap[]) {
    for (let item of data) {
      if (item.key === key) {
        res = item
      } else {
        if (item.children && item.children.length > 0) {
          deep(item.children)
        }
      }
    }
  }
  deep(data)
  return res
}

export function findAndDeleteData(data: RowDataMap[], key: any) {
  let res: RowDataMap | undefined
  function deep(data: RowDataMap[]) {
    for (let index in data) {
      const item = data[index]
      if (item.key === key) {
        res = item
        data.splice(Number(index), 1)
      } else {
        if (item.children && item.children.length > 0) {
          deep(item.children)
        }
      }
    }
  }
  deep(data)
  return res
}


export function exchangeData(data: RowDataMap[], currentKey: any, targetKey: any, whereInsert: string) {
  let result: RowDataMap[] = cloneDeep(data)
  const currentData = findAndDeleteData(result, currentKey)
  console.log(whereInsert)
  function deepFind(data: RowDataMap[]) {
    for (let index in data) {
      const item = data[index]
      if (item.key === targetKey) {
        if (currentData) {
          if (whereInsert === 'top') {
            data.splice(Number(index), 0, currentData)
          } else if (whereInsert === 'bottom') {
            data.splice(Number(index + 1), 0, currentData)
          } else if (whereInsert === 'center') {
            item.children.splice(0, 0, currentData)
          }
        }
      } else {
        if (item.children && item.children.length > 0) {
          deepFind(item.children)
        }
      }
    }
  }
  deepFind(result)
  return result
  // console.log(data)
}
