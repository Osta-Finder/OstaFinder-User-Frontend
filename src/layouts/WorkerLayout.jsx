import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export default function WorkerLayout() {
  return (
    <>
      <Navbar />
      <Sidebar />
      {/* Children */}
      <Footer />
    </>
  );
}
