import React, {useEffect, useState} from 'react';
import './App.css'
import Form from "./components/Form";
import axios from "axios";
import Title from "./components/Title";


const App = () => {
const [data, setData] = useState(null)
	useEffect(() => {
		axios.get(`http://localhost:3000/cities.json`)
			.then(({data}) => {
				setData(data.map((obj) => {
					return { 'city': obj.city, 'population': Number(obj.population)}
				}))
			})
	}, [])


	const cityWithMaxPopulation = data && data.reduce((prev, curr) => {
		if (prev.population > curr.population) {
			return prev
		}
		return curr
	})

	return (
		<div className="App">
			<Title/>
			<Form
				data={data}
				cityWithMaxPopulation={cityWithMaxPopulation}
			/>
		</div>
	);
}

export default App;