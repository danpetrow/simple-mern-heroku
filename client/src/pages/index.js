import React from 'react';

const Home = () => {
	const [data, setData] = React.useState(null);

	React.useEffect(() => {
	  fetch("/api/user")
		.then((res) => res.json())
		.then((data) => setData(data.message));
	}, []);
return (
	<div>
	<h1>Welcome to Red Cape Hard Goods</h1>
	</div>
);
};

export default Home;
