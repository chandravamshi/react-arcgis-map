
import Home from "../components/Home";
import OwnMap from "../components/OwnMap";
import Polygon from "../components/Polygon";
import Test from "../components/Test";
import Webmap from "../components/Webmap";
import { IRoute } from "../interfaces/IRoute";


export const routes: IRoute[] = [
  { path: '/', label:'Home', element:  Home },
  { path: '/webmap', label:'WebMap', element: Webmap },
  { path: '/test', label:'Test', element: Test },
  { path: '/polygon', label:'Polygon', element: Polygon },
  { path: '/ownmap', label:'OwnMap', element: OwnMap }
  //{ path: '/contact', label:'Home', component: 'Contact' },
  // Add more routes as needed
];