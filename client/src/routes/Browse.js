import { 
	Container,
	Row,
	Col,
	Card,
	ButtonGroup
} from 'react-bootstrap';
import { GiShoppingCart } from "react-icons/gi";
import { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import axios from 'axios';
import './Browse.css';

const Browse = ({history}) => {

	const [data, setData] = useState([]);

	const fetchData = async () => {
		try {
			const gameData = await axios.post(
				'/game/data');
			console.log(gameData.data);
			return gameData.data;
		} catch(err) {
			console.log(err);
		}
	}

	useEffect(async () => {
		const userCookie = document.cookie;
					//  		.split('; ')
					  //		.find(row => row.startsWith('user='))
		console.log(userCookie);
		if(!userCookie) { 
			history.push("/form/login");
		}
		setData(await fetchData());

	}, [history])

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
				          <button type="button" class="mx-3 btn btn-success">ADD TO CART <GiShoppingCart /></button>
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