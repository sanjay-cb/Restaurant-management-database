import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import './bootstrap.min.css';
import Header from './components/Header';
import AddItemScreen from './screens/AddItemScreen';
import BillScreen from './screens/BillScreen';
import EditItemScreen from './screens/EditItemScreen';
import HomeScreen from './screens/HomeScreen';
import ItemListScreen from './screens/ItemListScreen';
import ItemScreen from './screens/ItemScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderScreen from './screens/OrderScreen';

function App() {
	return (
		<Router>
			<Header />
			<Container>
				<main className='py-3'>
					<Route path='/' component={HomeScreen} exact />
					<Route path='/item/:id' component={ItemScreen} />
					<Route path='/order/:id' component={OrderScreen} />
					<Route path='/addItem' component={AddItemScreen} />
					<Route path='/admin/orderlist' component={OrderListScreen} />
					<Route path='/admin/bills' component={BillScreen} />
					<Route path='/admin/items' component={ItemListScreen} />
					<Route path='/admin/item/:id/edit' component={EditItemScreen} />
				</main>
			</Container>
		</Router>
	);
}

export default App;
