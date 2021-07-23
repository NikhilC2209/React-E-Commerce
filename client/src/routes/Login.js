import { 
	Form,
	Container,
	Button,
} from 'react-bootstrap'
import { useState, useEffect } from 'react'
import axios from 'axios';
import ErrorMessage from '../components/ErrorMessage';

const Login = ({history}) => {

	useEffect(() => {
		const userCookie = document.cookie;
					//  		.split('; ')
					  //		.find(row => row.startsWith('user='))
		console.log(userCookie);
		if(userCookie) { 
			history.push("/browse");
		}

	}, [history])

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
		{error && <ErrorMessage>{error}</ErrorMessage>}
		 <Form onSubmit={submitHandler}>
			  <Form.Group className="mb-3" controlId="formBasicEmail">
			    <Form.Label>Enter Username</Form.Label>
			    <Form.Control 
			      type="text" 
			      placeholder="Enter username" 
			      value={user}
			      onChange={(e)=>setUser(e.target.value)}	
			      />
			    <Form.Text className="text-muted">
			      We'll never share your email with anyone else.
			    </Form.Text>
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="formBasicPassword">
			    <Form.Label>Password</Form.Label>
			    <Form.Control 
			      type="password" 
			      placeholder="Password" 
			      value={password}
			      onChange={(e)=>setPassword(e.target.value)}
			      />
			  </Form.Group>
			  <Form.Group className="mb-3" controlId="formBasicCheckbox">
			    <Form.Check type="checkbox" label="Check me out" />
			  </Form.Group>
			  <Button variant="primary" type="submit">
			    Submit
			  </Button>
			</Form>
		</Container>
	)
}

export default Login;