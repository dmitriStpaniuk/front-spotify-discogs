import PropTypes from 'prop-types';
import {type NextPageContext} from 'next';

function Error({statusCode}: {statusCode: number}) {
	return (
		<p>
			{statusCode
				? `An error ${statusCode} occurred on server`
				: 'An error occurred on client'}
		</p>
	);
}

Error.propTypes = {
	statusCode: PropTypes.number,
};

Error.getInitialProps = ({res, err}: NextPageContext) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return {statusCode};
};

export default Error;
