import { cloneDeep } from 'lodash-es'
import { WHERE_INSERT } from './table'
import type { DragTreeColumnProps } from '.'
export interface RowDataProps<T = any | undefined> {
  width?: number | string
  content: any
  flex?: number
  _data: T
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

export function transformData(columns: DragTreeColumnProps[], data: Record<string, any>[], parentKey: string | null, key: string): RowDataMap<any>[] {
  const res: RowDataMap<any>[] = []

  for (const i in data) {
    const d = data[i]
    res[i] = {
      key: String(d[key]),
      parentKey: parentKey || null,
      props: [],
      children: [],
      open: true,
      childOpen: true,
      _data: d,
    }
    for (const col of columns) {
      res[i].props.push({
        width: col.width,
        content: d[col.key as string],
        flex: col.flex,
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
  const rows = document.querySelectorAll('.tree-row')
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const hoverBlock = row.children[row.children.length - 1] as HTMLDivElement
    hoverBlock.style.display = 'none'
    const children = hoverBlock.children as HTMLCollection
    const children0 = children[0] as HTMLDivElement
    const children1 = children[1] as HTMLDivElement
    const children2 = children[2] as HTMLDivElement
    children0.style.opacity = '0.1'
    children1.style.opacity = '0.1'
    children2.style.opacity = '0.1'
  }
}

export function findData(data: RowDataMap[], key: any) {
  let res: RowDataMap | undefined
  function deep(data: RowDataMap[]) {
    for (const item of data) {
      if (item.key === key) {
        res = item
      }
      else {
        if (item.children && item.children.length > 0)
          deep(item.children)
      }
    }
  }
  deep(data)
  return res
}

export function findAndDeleteData(data: RowDataMap[], key: any) {
  let res: RowDataMap | undefined
  function deep(data: RowDataMap[]) {
    for (const index in data) {
      const item = data[index]
      if (item.key === key) {
        res = item
        data.splice(Number(index), 1)
      }
      else {
        if (item.children && item.children.length > 0)
          deep(item.children)
      }
    }
  }
  deep(data)
  return res
}
/**
 * Check parent move to child
 * @param currentKey
 * @param targetKey
 */
export function mergeCheck(data: RowDataMap[], currentKey: any, targetKey: any) {
  let result = false
  const currentData = findData(data, currentKey)
  function deep(data: RowDataMap[]) {
    for (const item of data) {
      if (item.key === targetKey) {
        result = true
        break
      }
    }
  }
  if (currentData)
    deep(currentData?.children)

  return result
}

export function exchangeData(data: RowDataMap[], currentKey: any, targetKey: any, whereInsert: WHERE_INSERT) {
  // console.log(currentKey, targetKey, whereInsert)
  if (!currentKey || !targetKey || !whereInsert)
    return
  if (currentKey === targetKey)
    return
  if (mergeCheck(data, currentKey, targetKey))
    return

  const result: RowDataMap[] = cloneDeep(data)
  const currentData = findAndDeleteData(result, currentKey)
  function deepFind(data: RowDataMap[]) {
    for (const index in data) {
      const item = data[index]
      if (item.key === targetKey) {
        if (currentData) {
          if (whereInsert === WHERE_INSERT.TOP)
            data.splice(Number(index), 0, currentData)
          else if (whereInsert === WHERE_INSERT.BOTTOM)
            data.splice(Number(index + 1), 0, currentData)
          else if (whereInsert === WHERE_INSERT.CENTER)
            item.children.splice(0, 0, currentData)
        }
      }
      else {
        if (item.children && item.children.length > 0)
          deepFind(item.children)
      }
    }
  }
  deepFind(result)
  return result
}
