import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home/index.tsx';
import Avaliacao from './routes/Avaliacao/index.tsx';
import Login from './routes/Login/index.tsx';
import Perfil from './routes/Perfil/index.tsx';
import TrilhaPersonalizada from './routes/TrilhaPersonalizada/index.tsx';
import TrilhasProntas from './routes/TrilhasProntas/index.tsx';
import DetalhesTrilha from './routes/DetalhesTrilha/DetalhesTrilha.tsx';
import Sugestoes from './routes/Sugestoes/index.tsx';
import Contato from './routes/Contato/index.tsx';
import FAQ from './routes/Faq/index.tsx';
import Integrantes from './routes/Integrantes/index.tsx';
import Error from './routes/Error/index.tsx';

const router = createBrowserRouter([
  {
    path: "/", element: <App />, errorElement: <Error />, children: [
      { path: "/", element: <Home /> },
      { path: "/avaliacao", element: <Avaliacao /> },
      { path: "/integrantes", element: <Integrantes /> },
      { path: "/login", element: <Login /> },
      { path: "/contato", element: <Contato /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/perfil", element: <Perfil /> },
      { path: "/trilha-personalizada", element: <TrilhaPersonalizada /> },
      { path: "/trilhas-prontas", element: <TrilhasProntas /> },
      { path: "/trilha/:id", element: <DetalhesTrilha /> },
      { path: "/sugestoes", element: <Sugestoes /> },
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
