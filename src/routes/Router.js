import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

//Common Routes
import Landing from '../Views/Landing/Landing';
import Basic from '../Views/Basic/Basic';
import Interactive from '../Views/Interactive/Interactive';
import Error from '../Views/Error/Error';

const Charts = [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/Basic',
    element: <Basic />,
  },
  {
    path: '/Interactive',
    element: <Interactive />,
  },
  {
    path: '*',
    element: <Error />,
  },
];

const Router = createBrowserRouter(Charts);

export default Router;
