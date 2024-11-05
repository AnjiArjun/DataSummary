import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadData } from "./store";
import "./App.css";
import Workflow from "./components/Workflow";
import DataTable from "./components/DataTable";

export default function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.data.data);
  const error = useSelector((state) => state.data.error);

  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>{state && state.project_name}</h1>
      {error && <p>Error: {error}</p>}
      <div className="container">
        <DataTable headers={state ? state.table_headers : []} data={state ? state.table_data : []} />
        <div className="workflowContainer">
          <Workflow workflow_steps={state ? state.workflow_steps : []} />
        </div>
      </div>
    </div>
  );
}
