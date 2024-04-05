
import './App.css';
import { Routes,Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { routes } from "./routes";
import ReactToPrint from 'react-to-print';
function App() {
  return (
    <div>
      <Routes>
        {routes.map(route => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={route.Component}
            />
          )
        })}
      </Routes>

    </div>
  );
}

export default App;
