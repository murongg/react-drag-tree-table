import classnames from 'classnames'
import React from 'react'
import { DragTreeColumn } from './column'
import type { RowDataMap, RowDataProps } from './utils'
export interface DragTreeRowProps {
  data: RowDataMap<any>[]
  depth?: number
  onClick: (event: React.MouseEvent<any, MouseEvent>, data: RowDataMap, current: any) => void
}

export const DragTreeRow: React.FC<DragTreeRowProps> = ({ data, depth = 0, onClick }) => {
  const Space: any = []
  for (let i = 0; i < new Array(depth).length; i++)
    Space.push(<span className="space" key={i}></span>)

  const DragTd = (d: RowDataMap) => {
    return d.props.map((p: RowDataProps, index: number) => {
      const TdContent = () => {
        return <DragTreeColumn width={p.width}>
          <span onClick={(e) => {
            d.open && onClick(e, d, p)
          }}>
            {depth !== 0 && index === 0 ? Space : ''}
            <span>{p.content}</span>
          </span>
        </DragTreeColumn>
      }

      if (d.children && d.children.length > 0 && d.open)
        return <TdContent key={index}></TdContent>
      else
        return d.open ? <TdContent key={index}></TdContent> : null
    })
  }

  const onDragStart: React.DragEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLElement
    target.style.opacity = '0.5'
    const key = target.children[0].getAttribute('data-key') as string
    const parentKey = target.children[0].getAttribute('data-parentkey') as string

    (window as any)._dragKey = key;
    (window as any)._dragParentkey = parentKey;
    (window as any)._dragTarget = target
  }

  const onDragEnd: React.DragEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLElement
    target.style.opacity = '1'
  }

  return (
    <>
      {
        data.map((d) => {
          return (
            <div
              key={d.key}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              draggable
            >
              <div
                className={classnames('tree-row')}
                data-key={d.key}
                data-parentkey={d.parentKey}
              >
                {DragTd(d)}
                <div className="hover-model" style={{ display: 'none' }}>
                  <div className="hover-block prev-block">
                    <i className="el-icon-caret-top"></i>
                  </div>
                  <div className="hover-block center-block">
                    <i className="el-icon-caret-right"></i>
                  </div>
                  <div className="hover-block next-block">
                    <i className="el-icon-caret-bottom"></i>
                  </div>
                </div>
              </div>
              {
                d.children && d.children.length > 0 && DragTreeRow({ data: d.children, depth: depth + 1, onClick })
              }
            </div>
          )
        })
      }
    </>
  )
}
