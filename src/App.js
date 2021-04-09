import "./App.css";
import DataTable from "./components/DataTable";
import { DATA_TABLE } from "./constants/datatable";

function App() {
  return (
    <div>
      <DataTable data={DATA_TABLE} numPerPage={10} />
    </div>
  );
}

export default App;
