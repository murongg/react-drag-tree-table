import classnames from 'classnames'
import React from 'react'
import { DragTreeColumn } from './column'
import type { DragTreeRowProps, RowDataMap, RowDataProps } from './interface'

export const DragTreeRow: React.FC<DragTreeRowProps> = ({ data, depth = 0, isdraggable, border, onClick }) => {
  const Space: any = []
  for (let i = 0; i < new Array(depth).length; i++)
    Space.push(<span className="space" key={i}></span>)

  const DragTd = (d: RowDataMap) => {
    return d.props.map((p: RowDataProps, index: number) => {
      const TdContent = () => {
        return <DragTreeColumn width={p.width} border={border} flex={p.flex}>
          <span>
            {depth !== 0 && index === 0 ? Space : ''}
            {d.children && d.children.length > 0 && index === 0 && <span className={classnames('zip-icon', d.childOpen ? 'arrow-bottom' : 'arrow-right')} onClick={(e) => {
              d.open && onClick(e, d, p)
            }}></span>}
            <span>{p.render ? p.render(p.content, p._data, index) : p.content}</span>
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
    const key = target.getAttribute('data-key') as string
    const parentKey = target.getAttribute('data-parentkey') as string

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
            <div key={d.key}>
              <div
                className={classnames('tree-row')}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                draggable={isdraggable}
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
                d.children && d.children.length > 0 && DragTreeRow({ data: d.children, depth: depth + 1, border, isdraggable, onClick })
              }
            </div>
          )
        })
      }
    </>
  )
}
