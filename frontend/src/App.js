import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "@tableau/tableau-ui";

// Declare this so our linter knows that tableau is a global object
/* global tableau */

let unregisterEventFn = undefined;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSheet, setSelectedSheet] = useState(undefined);
  const [sheetNames, setSheetNames] = useState([]);
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [dataKey, setDataKey] = useState(1);
  const [filteredFields, setFilteredFields] = useState([]);
  const [dashboardName, setDashboardName] = useState("");

  const getSelectedSheet = (sheet) => {
    const sheetName = sheet || selectedSheet;
    return tableau.extensions.dashboardContent.dashboard.worksheets.find(
      (worksheet) => worksheet.name === sheetName
    );
  };

  const loadSelectedMarks = (sheet) => {
    if (unregisterEventFn) {
      unregisterEventFn();
    }

    const worksheet = getSelectedSheet(sheet);
    worksheet.getSelectedMarksAsync().then((marks) => {
      // Get the first DataTable for our selected marks (usually there is just one)
      const worksheetData = marks.data[0];

      // Map our data into the format which the data table component expects it
      const rows = worksheetData.data.map((row) =>
        row.map((cell) => cell.formattedValue)
      );
      const headers = worksheetData.columns.map((column) => column.fieldName);

      setRows(rows);
      setHeaders(headers);
      setDataKey(Date.now());
      setIsLoading(false);
    });

    unregisterEventFn = worksheet.addEventListener(
      tableau.TableauEventType.MarkSelectionChanged,
      () => {
        setIsLoading(true);
        loadSelectedMarks(sheet);
      }
    );
  };

  useEffect(() => {
    tableau.extensions.initializeAsync().then(() => {
      console.log("Dashboard loaded ");
      const selectedSheet = tableau.extensions.settings.get("sheet");
      console.log(selectedSheet);
      setSelectedSheet(selectedSheet);

      const sheetNames = tableau.extensions.dashboardContent.dashboard.worksheets.map(
        (worksheet) => worksheet.name
      );
      console.log(sheetNames);
      setSheetNames(sheetNames);

      const dashboardName = tableau.extensions.dashboardContent.dashboard.name;
      setDashboardName(dashboardName);
      console.log(dashboardName);

      const sheetSelected = !!selectedSheet;
      setIsLoading(sheetSelected);

      if (!!selectedSheet) {
        loadSelectedMarks(selectedSheet);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        Hello Tableau Extension! <br />
        Dashboard: {dashboardName}
        <Button
          kind={"primary"}
          key={"primary"}
          style={{ marginRight: 12 }}
          onClick={() => {
            console.log("hello");
          }}
        >
          I'm Dummy
        </Button>
      </header>
    </div>
  );
}

export default App;
