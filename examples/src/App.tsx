import { DragTreeTable } from '../../src/index'
import { columns, data } from './data'
function App() {

  const onDrag = (current, target, whereInsert) => {
    console.log('current: ', current)
    console.log('target:', target)
    console.log('whereInsert:', whereInsert)
  }

  const onExpand = (expanded, record) => {
    console.log('expanded:', expanded)
    console.log('record:', record)
  }

  return (
    <div className="App">
      <DragTreeTable 
        columns={columns} 
        data={data} 
        resize 
        border 
        onDrag={onDrag}
        onExpand={onExpand}
      />
    </div>
  )
}

export default App
