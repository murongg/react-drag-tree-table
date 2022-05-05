import { DragTreeTable } from '../../src/index'
import { columns, data } from './data'
function App() {
  return (
    <div className="App">
      <DragTreeTable columns={columns} data={data} resize border onDrag={(current, target, whereInsert) => {
        console.log('current: ', current)
        console.log('target:', target)
        console.log('whereInsert:', whereInsert)
      }} />
    </div>
  )
}

export default App
