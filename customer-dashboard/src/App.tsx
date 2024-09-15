// App.tsx
import React from "react";
import "./App.css"; // Import your global CSS
import LiveTable from "./components/LiveTable";
import HistoryTable from "./components/HistoryTable";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Store Customer Dashboard</h1>
      </header>
      <main>
        <section>
          <h2>Live Data</h2>
          <LiveTable /> {/* Renders the live data table */}
        </section>
        <section>
          <h2>History Data (Last 24 Hours)</h2>
          <HistoryTable /> {/* Renders the historical data table */}
        </section>
      </main>
    </div>
  );
}

export default App;
