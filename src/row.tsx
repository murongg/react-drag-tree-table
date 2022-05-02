import classnames from 'classnames'
import React from 'react'
import type { RowDataMap } from './utils'

export interface DragTreeRowProps {
  data: RowDataMap<any>[]
  depth?: number
  onClick: (event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>, data: RowDataMap, current: any) => void
}

export const DragTreeRow: React.FC<DragTreeRowProps> = ({ data, depth = 0, onClick }) => {
  const depths: any[] = []
  for (let i = 0; i < new Array(depth).length; i++)
    depths.push(i)

  const Space = depths.map(d => <div style={{ width: '10px' }} key={d}></div>)
  const DragTr = (d: RowDataMap) => {
    return d.props.map((p: any, index: number) => {
      if (!d.children || d.children.length === 0) {
        if (!d.open) {
          return null
        }
        else {
          return <td key={index} className={classnames(`${index === 0 ? 'flex' : ''}`)}>
            {depth !== 0 ? Space : ''}
            <span>{p.content}</span>
          </td>
        }
      }
      else if (d.open) {
        return (
          <td
            key={index}
            className={classnames(`${index === 0 && 'flex'}`, 'cursor-pointer')}
            onClick={(e) => { onClick(e, d, p._data) }}>
            {depth !== 0 ? Space : ''}
            <span>{p.content}</span>
          </td>
        )
      }
      return null
    })
  }
  return (
    <>
      {
        data.map((d) => {
          return (
            <>
              <tr key={d.key} >
                {
                  DragTr(d)
                }
              </tr>
              {
                d.children && d.children.length > 0 && DragTreeRow({ data: d.children, depth: depth + 1, onClick })
              }
            </>
          )
        })
      }
    </>
  )
}
