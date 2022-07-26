import "./App.css";
import NewUserForm from "./components/NewUserForm";
import Table from "./components/Table";
import { ContextProvider } from "./context/GlobalContext";

//Lucas Lopez ;)

function App() {
  return (
    <>
 <ContextProvider>
      <div className="App">
      <div className="container">
        <h1 className="text-title">Panel Clientes</h1>
        <NewUserForm />
      </div>
      <Table />
    </div>
 </ContextProvider>
 </>
  );
}

export default App;
