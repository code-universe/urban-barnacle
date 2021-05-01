import "./App.css";
import { Button } from "@tableau/tableau-ui";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Hello Tableau Extension!
        <Button kind={"primary"} key={"primary"} style={{ marginRight: 12 }}>
          I'm Dummy
        </Button>
      </header>
    </div>
  );
}

export default App;
