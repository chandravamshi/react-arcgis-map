import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes/routesConfig";
import Navbar from "./components/nav-bar/Navbar";
import esriConfig from "@arcgis/core/config";

// Set the ArcGIS API key globally
esriConfig.apiKey = import.meta.env.VITE_ARCGIS_API_KEY;

function App() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Routes>
        {routes.map(({ path, element: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

// div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
