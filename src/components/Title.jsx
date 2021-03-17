import React, {useState} from 'react'

const Title = () => {
	const [editable, setEditable] = useState(false)
	const [status, setStatus] = useState('Ваш статус')

	const handleClick = () => {
		if (editable) {
			setStatus(status);
		}
		setEditable(!editable);
	}

	return (
		<div>
			<div>
				{editable ? <input
						type="text"
						value={status}
						onChange={(event) => setStatus(event.target.value)}
					/> :
					<h1>Здравствуйте, Человек</h1>}
			</div>
			<button
				onClick={handleClick}
			>{editable ? "Сохранить" : "Сменить статус"}
			</button>
			<div>{status}</div>
		</div>
	)
}
export default Title