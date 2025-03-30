import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ContextProvider } from './context/ContextProvider';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <ContextProvider>
    <RouterProvider router={router}/>
  </ContextProvider>
  </StrictMode>,
)
