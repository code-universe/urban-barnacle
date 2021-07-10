import { useEffect, React } from "react";
// Declare this so our linter knows that tableau is a global object
/* global tableau */

export default function DashboardEnvironment() {
  const environment = tableau.extensions.environment;
  console.log(environment);
  return (
    <ul>
      {Object.keys(environment).map((key, value) => (
        <li key={key}>
          {key}: {environment[key]}
        </li>
      ))}
    </ul>
  );
}
