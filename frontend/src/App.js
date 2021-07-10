import { useEffect, useState } from "react";
import "./App.css";
import { Spinner, Tabs } from "@tableau/tableau-ui";
import DashboardEnvironment from "./components/DashboardEnvironment";
import AccessModification from "./components/AccessModification";
// Declare this so our linter knows that tableau is a global object
/* global tableau */

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardName, setDashboardName] = useState("");

  const tabs = [
    { content: "Check Access", commponent: "Four content" },
    { content: "Modify Access", commponent: <AccessModification /> },
    { content: "Dashboard Environment", commponent: <DashboardEnvironment /> },
  ];
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    tableau.extensions.initializeAsync().then(() => {
      const dashboardName = tableau.extensions.dashboardContent.dashboard.name;
      setDashboardName(dashboardName);
      console.log(`Dashboard loaded: ${dashboardName}`);
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="App">
      <Tabs
        activation="manual"
        alignment="left"
        onTabChange={(index) => {
          console.log(`onChange: ${index}`);
          setSelectedTab(index);
        }}
        selectedTabIndex={selectedTab}
        tabs={tabs}
      >
        <span>{tabs[selectedTab].commponent}</span>
      </Tabs>
    </div>
  );
}

export default App;
