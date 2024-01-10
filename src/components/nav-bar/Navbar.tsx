import { Link } from 'react-router-dom';
import { IRoute } from '../../interfaces/IRoute';
import { routes } from '../../routes';
function Navbar() {
  return (
    <nav>
      <ul>
        {routes.map((route: IRoute, index: number) => (
          <li key={index}>
            <Link to={route.path}>{route.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar