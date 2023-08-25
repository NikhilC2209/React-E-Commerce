import { 
	Container,
} from 'react-bootstrap'
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Error404.css';

const Error404 = () => {
	return (
		<Container fluid className = "back-img">
			<div className="text-center my-5">
				<h1>Error 404!</h1>
				<p>The page you're looking for doesn't exist</p>
			</div>
		</Container>
	)
}

export default Error404;