import { 
	Container,
	Row,
	Col,
	Card,
	ButtonGroup
} from 'react-bootstrap';
import { GiShoppingCart } from "react-icons/gi";
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Browse.css';

const Browse = ({history}) => {

	const [data, setData] = useState([]);

	const fetchData = async () => {
		try {
			const gameData = await axios.post(
				'/game/data');
			//console.log(gameData.data);
			return gameData.data;
		} catch(err) {
			console.log(err);
		}
	}

	useEffect(async () => {
		const userCookie = document.cookie;
					//  		.split('; ')
					  //		.find(row => row.startsWith('user='))
		//console.log(userCookie);
		if(!userCookie) { 
			history.push("/form/login");
		}
		setData(await fetchData());

	}, [history])

	const cartHandler = async (e) => {
		const userCookie = document.cookie.split('=')[1];
		console.log(userCookie);
		const gameID = e.currentTarget.getAttribute('value')
		console.log(gameID);

		try {
			const config = {
				headers: {
					"Content-type": "application/json"
				}
			}
			const { data } = await axios.post(
				`/cart/add/${gameID}`, {
				userCookie,
				config,
			})
		} catch(err) {
			console.log(err);
		}	
	}

	return (
		<Container>
			<Row xs={1} md={4} className="g-4">
			  {data.map((_, idx) => (
			    <Col>
			      <Card className="game-card">
			        <Card.Img variant="top" src={_.imageUrl} className="game-img"/>
			        <Card.Body>
			          <Card.Title>{_.name}</Card.Title>
			          <p>By {_.developer}</p>
			          <Card.Text>
			          	Lorem
			          </Card.Text>
			          <h5>PRICE: {_.price}</h5>
			          <ButtonGroup aria-label="Basic example">
				          <button type="button" class="btn btn-info discount">{_.discount}</button>
				          <button type="button" class="mx-3 btn btn-success" value={_._id} onClick={cartHandler}>ADD TO CART <GiShoppingCart /></button>
				       </ButtonGroup>   
			        </Card.Body>
			      </Card>
			    </Col>
			  ))}
			</Row>
		</Container>

	)
}

export default Browse;