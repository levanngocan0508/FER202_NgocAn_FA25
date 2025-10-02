
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css';
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import Column from "./components/Column";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="app">
      <Banner />
      <Navbar />
      <main className="container my-4">
        <Column />
      </main>
      <Footer />
    </div>
  );
}


