import './App.css';
import DataTable from './components/test/DataTable';
import Testb from "./components/test/Testb"
import Testc from "./components/test/Testc"

function App() {
  return (
    <div className="App">
      {/* DataGrid is used showing 10 results per page */}
      {/* <DataTable /> */}

      {/* without using params fetch data showing as 10 per page  */}
      {/* <Testb /> */}

      {/* // using params from URL only giving 10 results on one page */}
      <Testc />
    </div>
  );
}

export default App;
