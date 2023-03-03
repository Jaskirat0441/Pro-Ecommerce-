import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Components/About';
import Cart from './Components/Cart';
import Header from './Components/Header';
import ProductListing from './Components/ProductListing';
import SingleProduct from './Components/SingleProduct';

function App() {
  return (
<>
      <Header/>
      <Routes>
<Route path="/" element={ <ProductListing/>}/>
<Route path="/about" element={ <About/>}/>
<Route path="/product/:prodId" element={<SingleProduct/>}/>
<Route path="/cart" element={<Cart/>}/>
</Routes>
</>
  );
}

export default App;
