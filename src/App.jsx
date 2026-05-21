import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { useSelector } from "react-redux";
import { useGetMeQuery } from "./services/authApi";

export default function App() {
  const { data: meData, isLoading: meLoading } = useGetMeQuery();
  console.log( "meData", meData);
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}
