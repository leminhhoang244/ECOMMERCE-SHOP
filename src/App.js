import { useLocation } from 'react-router-dom';
import './App.css';
import Account from './components/Account/Account';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import MenuLeft from './components/Layout/MenuLeft';

function App(props) {
  let params1 = useLocation()
  // console.log(params1.pathname);
  return (
    <>
      <Header/>
      <section>
        <div className="container">
          <div className="row">
            {params1['pathname'].includes("account") ? <Account/> : <MenuLeft/>}
            {props.children}
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default App;
