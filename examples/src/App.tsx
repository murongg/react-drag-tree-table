import { DragTreeTable } from '../../src/index'
import { columns, data } from './data'
function App() {
  return (
    <div className="App">
      <DragTreeTable columns={columns} data={data} resize border />
    </div>
  )
}

export default App
