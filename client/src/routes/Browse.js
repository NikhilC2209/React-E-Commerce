import { 
	Container,
} from 'react-bootstrap';
import { useEffect } from 'react';

const Browse = ({history}) => {

	useEffect(() => {
		const userCookie = document.cookie;
					//  		.split('; ')
					  //		.find(row => row.startsWith('user='))
		console.log(userCookie);
		if(!userCookie) { 
			history.push("/form/login");
		}

	}, [history])

	return (
		<Container>
			<h1>Browse games here!</h1>
		</Container>
	)
}

export default Browse;