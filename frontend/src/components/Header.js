import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';

const Header = () => {
	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>Foodie's</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							{/* <LinkContainer to='/login'>
								<Nav.Link>
									<i className='fas fa-user'></i> User
								</Nav.Link>
							</LinkContainer> */}

							<NavDropdown title='Admin' id='adminmenu'>
								<LinkContainer to='/addItem'>
									<NavDropdown.Item>Add Item</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to='/admin/items'>
									<NavDropdown.Item>Items List</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to='/admin/bills'>
									<NavDropdown.Item>Bills</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to='/admin/orderlist'>
									<NavDropdown.Item>Orders</NavDropdown.Item>
								</LinkContainer>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
