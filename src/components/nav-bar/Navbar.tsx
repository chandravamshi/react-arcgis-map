import { Link, RouteObject } from "react-router-dom";
import { IRoute } from "../../interfaces/IRoute";
import { routes } from "../../routes/routesConfig";
import Toolbas from "../toolbar/ToolBar";
function Navbar() {
  return (
    <>
      <nav>
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            display: "flex",
            flexDirection: "row",
            columnGap: "16px",
          }}
        >
          {routes.map((route: IRoute, index: number) => (
            <li key={index}>
              <Link to={route.path}>{route.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {/*  <Toolbas/> */}
    </>
  );
}

export default Navbar;
