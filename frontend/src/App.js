import React from "react";
import "./App.css";
import { Button } from "@tableau/tableau-ui";

// Declare this so our linter knows that tableau is a global object
/* global tableau */

let unregisterEventFn = undefined;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      selectedSheet: undefined,
      sheetNames: [],
      rows: [],
      headers: [],
      dataKey: [],
      filteredFields: [],
      dashboardName: '',
      startTime: '',
      endTime: ''
    };
  }

  // when component is mounted
  componentDidMount() {
    this.setState({
      startTime: new Date().toLocaleString()
    });
    console.log('Start Time: '+ this.state.startTime);
    const getSelectedSheet = (sheet) => {
      const sheetName = sheet || this.state.selectedSheet;
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
        this.setState({
          rows:rows,
          headers:headers,
          dataKey: Date.now(),
          isLoading:false
        })
      });
  
      unregisterEventFn = worksheet.addEventListener(
        tableau.TableauEventType.MarkSelectionChanged,
        () => {
          this.setState({isLoading: true});
          loadSelectedMarks(sheet);
        }
      );
    };
    tableau.extensions.initializeAsync().then(() => {
      console.log("Dashboard loaded ");
      const selectedSheet = tableau.extensions.settings.get("sheet");
      console.log(selectedSheet);
      this.setState({selectedSheet:selectedSheet});

      const sheetNames = tableau.extensions.dashboardContent.dashboard.worksheets.map(
        (worksheet) => worksheet.name
      );
      console.log(sheetNames);
      this.setState({sheetNames:sheetNames});

      this.setState({dashboardName: tableau.extensions.dashboardContent.dashboard.name});
      console.log(this.state.dashboardName);

      const sheetSelected = !!selectedSheet;
      this.setState({isLoading: sheetSelected});

      if (!!selectedSheet) {
        loadSelectedMarks(selectedSheet);
      }
    });
  }

  // executed whenever there are updates
  componentDidUpdate() {
    console.log('Update time: '+new Date().toLocaleString());  
  }

  // when component is unmounted
  componentWillUnmount() {  
    this.setState({endTime : new Date().toLocaleString()});
    console.log('End Time: '+this.state.endTime);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Hello Tableau Extension! <br />
          Dashboard: {this.state.dashboardName} <br/>
          Start Time: {this.state.startTime} <br/>
          End Time: {this.state.endTime} <br/>
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
};
export default App;
