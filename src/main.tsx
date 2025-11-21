import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home/index.tsx';
import Avaliacao from './routes/Avaliacao/index.tsx';
import Error from './routes/Error/index.tsx';
import Integrantes from './routes/Integrantes/index.tsx';
import Contato from './routes/Contato/index.tsx';
import Faq from './routes/Faq/index.tsx';

const router = createBrowserRouter([
  {path:"/", element:<App/>, errorElement:<Error/>, children:[
    {path:"/", element: <Home/>},
    {path:"/avaliacao", element: <Avaliacao/>},
    {path:"/integrantes", element: <Integrantes/>},
    {path:"/contato", element: <Contato/>},
    {path:"/faq", element: <Faq/>},
  ]}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
