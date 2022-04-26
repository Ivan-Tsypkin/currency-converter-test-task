import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';

import "./utils/i18n";
import { CircularProgress } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Suspense 
      fallback={
      <CircularProgress 
        sx={{
          position: "absolute",
          top: "10%",
          left: "calc(50% - 20px)",
        }}
      />
    }>
      <App />
    </Suspense>
  </React.StrictMode>
);
