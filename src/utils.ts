import { any, func } from "prop-types";
import { DragTreeColumnProps } from ".";
import { cloneDeep } from 'lodash-es'
export interface RowDataProps<T> {
  content: any
  _data: T
}
export interface RowDataMap<T = any | undefined> {
  key: string | number
  props: RowDataProps<T>[]
  children: RowDataMap<T>[]
  open: boolean,
  _childOpen: boolean
}

export function transformData(columns: DragTreeColumnProps[], data: Record<string, any>[]): RowDataMap<any>[] {
  let res: RowDataMap<any>[] = []
  let keys = columns.map(col => col.key)
  for (let i in data) {
    let d = data[i]
    res[i] = {
      key: d.id,
      props: [],
      children: [],
      open: true,
      _childOpen: true
    }
    for (let k of keys) {
      res[i].props.push({
        content: d[k as string],
        _data: d
      })
    }
    if (d.children && d.children.length > 0) {
      res[i].children = transformData(columns, d.children)
    }
  }
  return res
}


export function setOpenAll(rawData: RowDataMap[], currentData: RowDataMap) {
  const newCurrentData = cloneDeep(currentData)
  const openStatus =  !newCurrentData._childOpen
  setDataOpenStatus(newCurrentData.children, openStatus)
  let result: RowDataMap[] = cloneDeep(rawData)
  const key = newCurrentData.key

  function deepSetData(data: RowDataMap[]) {
    for (let item of data) {
      if (item.key === key) {
        item.children = newCurrentData.children
        item._childOpen = openStatus
      } else {
        deepSetData(item.children)
      }
    }
  }
  deepSetData(result)
  return result
}


export function setDataOpenStatus(data: RowDataMap[], open: boolean) {
  function deepSetStatus(data: RowDataMap[]) {
    for (let item of data) {
      item.open = open
      if (item.children && item.children.length > 0) {
        deepSetStatus(item.children)
      } else {
        item._childOpen = open
      }
    }
  }
  deepSetStatus(data)
  return data
}
