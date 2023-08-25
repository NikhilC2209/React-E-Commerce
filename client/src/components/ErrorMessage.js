import { Alert } from 'react-bootstrap';

const ErrorMessage = ({children}) => {
	return (
		<Alert variant={"danger"}>
			<strong>{children}</strong>
		</Alert>	
	);
};

export default ErrorMessage;