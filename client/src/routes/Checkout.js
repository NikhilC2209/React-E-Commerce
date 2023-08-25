import { 
	Form,
	Container,
	Button,
	Row,
	Col,
} from 'react-bootstrap'
import { useState, useEffect } from 'react'
import axios from 'axios';
import ErrorMessage from '../components/ErrorMessage';

const Checkout = ({history}) => {

	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const submitHandler = async (e) => {
		e.preventDefault();
		console.log(user,password);

		try {
			const config = {
				headers: {
					"Content-type": "application/json"
				}
			}
			const { data } = await axios.post(
				'/account/login', {
				user,
				password,
				error,
				config,
			});	
			if(data.error) {
				setError(data.error);	
			}
		} catch(err) {
			console.log(err);
			setError(err.response.data.message);
		}
	}

	return (
		<Container>
			<Form>
			  <Row className="mb-3">

			  <Form.Group as={Col} controlId="formGridPassword">
			      <Form.Label>First Name:</Form.Label>
			      <Form.Control type="text" placeholder="First Name" required isInvalid/>
			    </Form.Group>

			  <Form.Group as={Col} controlId="formGridPassword">
			      <Form.Label>Last Name:</Form.Label>
			      <Form.Control type="text" placeholder="Last Name" required isInvalid/>
			    </Form.Group>
			  </Row>

			  <Row>
			    <Form.Group as={Col} controlId="formGridEmail">
			      <Form.Label>Email</Form.Label>
			      <Form.Control type="email" placeholder="Enter email" required isInvalid/>
			    </Form.Group>

			  <Form.Group className="mb-3" controlId="formGridAddress1" >
			    <Form.Label>Address</Form.Label>
			    <Form.Control placeholder="1234 Main St" required isInvalid/>
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="formGridAddress2">
			    <Form.Label>Address 2</Form.Label>
			    <Form.Control placeholder="Apartment, studio, or floor" required isInvalid/>
			  </Form.Group>
			  </Row>

			  <Row className="mb-3">
			    <Form.Group as={Col} controlId="formGridCity">
			      <Form.Label>City</Form.Label>
			      <Form.Control required isInvalid/>
			    </Form.Group>

			    <Form.Group as={Col} controlId="formGridState">
			      <Form.Label>State</Form.Label>
			      <Form.Control required isInvalid/>
			    </Form.Group>

			    <Form.Group as={Col} controlId="formGridZip">
			      <Form.Label>ZipCode</Form.Label>
			      <Form.Control required isInvalid/>
			    </Form.Group>
			  </Row>

			  <Form.Group className="mb-3" id="formGridCheckbox">
			    <Form.Check type="checkbox" label="I agree to all the Terms and Conditions" required/>
			  </Form.Group>

			  <Button variant="primary" type="submit">
			    Submit
			  </Button>
			</Form>
		</Container>
	)	
}

export default Checkout;