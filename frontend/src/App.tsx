import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Booking from "./pages/booking";

const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Booking/>
      <Footer/>
    </div>
  );
};

export default App;
