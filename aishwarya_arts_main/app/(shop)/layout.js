import Header from "../components/HomePage/Header";
import Footer from "../components/HomePage/Footer";
import { Toaster } from "react-hot-toast";
import Whatsapp from "../components/HomePage/whatsapp";

export default function ShopLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Toaster position="top-center" />
        {children}
      </main>
      <Footer />
      <Whatsapp />
    </>
  );
}
