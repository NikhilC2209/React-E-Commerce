import { 
	Navbar,
	Nav,
	NavDropdown,
	Container,
} from 'react-bootstrap'
import { useEffect, useState } from 'react';
import { GiShoppingCart } from "react-icons/gi";
import axios from 'axios';

const Header = ({history}) => {

	useEffect(() => {
		const userCookie = document.cookie;
					//  		.split('; ')
					  //		.find(row => row.startsWith('user='))
		console.log(userCookie);
		if(userCookie) { 
			setLoggedIn(true);
			//history.push("/form");
		}

	},)

	const [loggedIn, setLoggedIn] = useState(false);

	const logHandler = async (e) => {
		e.preventDefault();
		try {
			const data = await axios.post(
				'/account/logout');
			console.log(data);
		} catch(err) {
			console.log(err);
		}
		setLoggedIn(false);
		history.push("/form/login");
		console.log("Logged out");
	}

	return (
		<Navbar bg="light" expand="lg">
		  <Container>
		    <Navbar.Brand href="/">Game-Store</Navbar.Brand>
		    <Navbar.Toggle aria-controls="basic-navbar-nav" />
		    <Navbar.Collapse id="basic-navbar-nav">
		      <Nav className="me-auto">
		        <Nav.Link href="/browse">Browse</Nav.Link>
		        <Nav.Link href="/cart"><GiShoppingCart />View Cart</Nav.Link>
		        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
		          <NavDropdown.Item href="/form/login">Login</NavDropdown.Item>
		          <NavDropdown.Item href="/form/register">Register</NavDropdown.Item>
		          <NavDropdown.Divider />
		          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
		        </NavDropdown>
		        {loggedIn && <Nav.Link href="/account/logout" onClick={logHandler}>Logout</Nav.Link>}
		      </Nav>
		    </Navbar.Collapse>
		  </Container>
		</Navbar>
	)
}

export default Header;