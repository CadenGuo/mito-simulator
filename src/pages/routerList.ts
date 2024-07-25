import MitoSimulator from 'pages/simulator/MitoSimulator';
import Landing from 'pages/Landing';




import { PATH } from './path';

// Landing
const landingPageStruct = {
  exactPath: true,
  path: PATH.ROOT,
  component: Landing,
};

const routerList = [
  landingPageStruct,
];

export default routerList;
