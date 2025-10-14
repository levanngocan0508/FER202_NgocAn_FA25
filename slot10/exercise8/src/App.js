import logo from './logo.svg';
import './App.css';
import { Container } from 'react-bootstrap';
import FlightBookingForm from "./components/FlightBookingForm";

function App() {
  return (
    <div className="Booking">
      <Container className="my-4">
        <FlightBookingForm/>
      </Container>
     </div>
      
    );
}

export default App;
