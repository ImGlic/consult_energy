import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Consulta from "./components/consultaEnergia/index";
import CadastrarFornecedor from "./components/CadastrarFornecedor/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Consulta />,
  },
  {
    path: "/cadastrar_fornecedor",
    element: <CadastrarFornecedor />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
