import { useRoutes } from "react-router-dom"
import AuthRoutes from './authRoutes'
import MainRoutes from './mainRoutes'

export default function ThemeRoutes() {
  return useRoutes(
    [
      AuthRoutes,
      MainRoutes,
      {
        path: "*",
        element: <div>not found</div>
      }
    ],
    //config.basename
  );
}