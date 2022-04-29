import { DragTreeTable } from '../../src/index'
import { column } from './data'
function App() {
  return (
    <div className="App">
      <DragTreeTable column={column} resize border/>
    </div>
  )
}

export default App
