import { 
	Form,
	Container,
	Button,
	Row,
	Col,
	Card,
	ButtonGroup,

} from 'react-bootstrap'
import { useState, useEffect } from 'react';
import {IconContext} from "react-icons";
import { GiShoppingCart } from "react-icons/gi";
import { FaArrowCircleRight } from "react-icons/fa";
import axios from 'axios';
import './Cart.css';

const Cart = ({history}) => {

	const [data, setData] = useState([]);
	const [price, setPrice] = useState(0);

	const fetchData = async (cookie) => {
		try {
			const userID = {"user": cookie};
			const gameData = await axios.post(
				'/cart/view',userID);
			console.log(gameData.data);
			return gameData.data;
		} catch(err) {
			console.log(err);
		}
	}

	useEffect(async () => {
		const userCookie = document.cookie
							.split('; ')
					  		.find(row => row.startsWith('user='))
		//console.log(userCookie);

		const calcPrice = (data) => {
			let total = 0;
			data.forEach(item=> {
				console.log(item.price);
				const itemPrice =parseInt(item.price.slice(1,item.length));
				console.log(itemPrice);
				if(!isNaN(itemPrice)) {
					total+=itemPrice;
				}
			})
			console.log(total);
			setPrice(total);
		}

		if(!userCookie) { 
			history.push("/form/login");
		}
		setData(await fetchData(userCookie));
		calcPrice(await fetchData(userCookie));
	}, [history])

	const linkHandler = () => {
		history.push("/checkout");
	}

	const removeHandler = async (e) => {
		const removeID = e.currentTarget.getAttribute('value');
		const userCookie = document.cookie.split('=')[1];

		try {
			const config = {
				headers: {
					"Content-type": "application/json"
				}
			}
			const { data } = await axios.post(
				`/cart/remove/${removeID}`, {
				userCookie,
				config,
			})
		
		console.log(data);	
		setData(await fetchData(userCookie));

		// data.forEach((item,index) => {
		// 	if(item._id==removeID) {
		// 		data.splice(index,1);
		// 	}
		// })

	} catch(err) {
		console.log(err);
	}}

	return (
		<Container>
			<Container className = "f-cont">
			<IconContext.Provider value={{  size: '40px' }}>
				<h1 className = "my-5"> <GiShoppingCart /> Your Cart</h1>
			</IconContext.Provider>		
			<IconContext.Provider value={{ color: 'white', size: '25px' }}>
				<Button className = "checkout-btn" onClick={linkHandler}>TOTAL: ₹ {price} Checkout <FaArrowCircleRight /></Button>
			</IconContext.Provider>	
			</Container>
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
				          <button type="button" class="mx-3 btn btn-danger" value={_._id} onClick={removeHandler} >REMOVE FROM CART </button>
				       </ButtonGroup>   
			        </Card.Body>
			      </Card>
			    </Col>
			  ))}
			</Row>
		</Container>
	)
}

export default Cart;