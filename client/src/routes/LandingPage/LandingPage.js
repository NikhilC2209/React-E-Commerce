import { 
	Container,
} from 'react-bootstrap'
import landing from "../../assets/landing.png";
import './LandingPage.css';

const Landing = ({history}) => {
	return (
		 <Container>
		 	<div className="f-cont">
		 		<div>
		 			<h3 className="sub-head">Welcome to the Game Store!</h3>
		 			<p>Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet
		 			Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet
		 			Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet
		 			Lorem Ipsum dolor sit amet</p>
		 			<button className="land-btn" onClick={()=>history.push('/form/login')}>Get Started</button>
		 		</div>
		 		<img src={landing} className="land-img"/>
		 	</div>	
		 </Container>
	)
}

export default Landing;