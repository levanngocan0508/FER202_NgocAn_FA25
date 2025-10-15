
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginForm2 from './components/LoginForm2';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import SearchItem from './components/SearchItem';
import AccountSearch from './components/AccountSearch';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <>
      <CounterComponent />
      <LightSwitch />
      <LoginForm />
      <LoginForm2 />
      <SearchItem />
      <AccountSearch />
      <RegisterForm />
      
    </>
  );
}


export default App;
