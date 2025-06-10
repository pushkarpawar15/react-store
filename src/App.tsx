import { useEffect, useMemo, useState } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import moment from 'moment'; // Import moment
import _ from 'lodash'; // Import lodash

import Cart from './Store/Cart';
import Checkout from './Store/Checkout';
import Confirmation from './Store/Confirmation';
import Header from './Store/Header';
import Home from './Store/Home';
import ItemDetails from './Store/ItemDetails';
import List from './Store/List';

import { CartContext } from './Store/CartContext';
import { StoreData } from './Store/StoreData';
import { CategoryDetails } from './interfaces/CategoryDetails';
import { CartItemDetails } from './interfaces/CartItemDetails';

import './App.css';

/**Builds the base React app */
function App() {
 // Products, cart, and other shopping info
 const storeData = useMemo(() => new StoreData(), []);

 // T-shirt categories
 const [categories, setCategories] = useState([] as CategoryDetails[]);

 // Current user's shopping cart
 const [cart, setCart] = useState(storeData.getCart());

 // Updates the user's shopping cart
 function updateCart(cart: CartItemDetails[]) {
   storeData.setCart(cart);
   setCart(cart);
 }

 // Create list of categories and details
 useEffect(() => {
   storeData.getCategories().then(data => setCategories(data));
 }, [storeData]);

 // Generate the current timestamp with moment.js
 const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');

 // Use lodash to transform the timestamp to uppercase
 const uppercaseTimestamp = _.toUpper(currentTime);

 // Create the router
 return (
   <CartContext.Provider value={{ cart, setCart: updateCart }}>
     <BrowserRouter>
       <Header />
       <div style={{ textAlign: 'center', margin: '20px 0' }}>
         {/* Display the uppercase timestamp */}
         <h2>Current Date and Time: {uppercaseTimestamp}</h2>
       </div>
       <Routes>
         <Route path="/" element={<Home categories={categories} />} />
         <Route path="/list/:listId/:itemId" element={<ItemDetails />} />
         <Route path="/list/:listId" element={<List categories={categories} />} />
         <Route path="/cart" element={<Cart />} />
         <Route path="/checkout" element={<Checkout />} />
         <Route path="/confirm" element={<Confirmation />} />
       </Routes>
     </BrowserRouter>
   </CartContext.Provider>
 );
}

export default App;
