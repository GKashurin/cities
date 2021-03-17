import React, {useState} from 'react'
import * as Yup from "yup";
import {Formik} from "formik"

const Form = ({data, cityWithMaxPopulation}) => {
	const [date, setDate] = useState(null)
	const validationSchema = Yup.object().shape({
		city: Yup.string(),
		password: Yup.string().typeError('Должно быть строкой').required('Поле обязательно'),
		confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Пароли не совпадают').required('Поле обязательно'),
		email: Yup.string().email('Введите верный email').required('Поле обязательно'),
	})

	const handleSubmit = (values) => {
		console.log(values);
		setDate(Date(date))
	}

	return (
		<div>
			<Formik initialValues={{
				city: '',
				password: '',
				confirmPassword: '',
				email: '',
				checkbox: false
			}
			}
					onSubmit={handleSubmit}
					validateOnBlur
					validationSchema={validationSchema}
			>
				{ ( {

						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						isValid,
						handleSubmit,
						dirty
					} ) => (
					<div className='form'>
						<p>
							<label htmlFor={'city'}>Ваш город</label><br/>
							<select
								className={'input'}
								name='city'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.city}

							>{data &&
							data.map((obj) => (
								obj.population > 50000 ?
									<option
										disabled={obj.city === cityWithMaxPopulation.city}
										//selected={obj.city === cityWithMaxPopulation.city}
										key={obj.city}
									>{obj.city}
									</option> : null
							))}
							</select>
						</p>
						{touched.city && errors.city && <p className={'error'}>{errors.city}</p>}

						<p>
							<label htmlFor={'password'}>Пароль</label><br/>
							<input
								className={'input'}
								type='password'
								name='password'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
							/>
						</p>
						{touched.password && errors.password && <p className={'error'}>{errors.password}</p>}

						<p>
							<label htmlFor={'password'}>Пароль еще раз</label><br/>
							<input
								className={'input'}
								type='password'
								name='confirmPassword'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.confirmPassword}
							/>
						</p>
						{touched.confirmPassword && errors.confirmPassword && <p className={'error'}>{errors.confirmPassword}</p>}

						<p>
							<label htmlFor={'email'}>email</label><br/>
							<input
								className={'input'}
								type='text'
								name='email'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
							/>
						</p>
						{touched.email && errors.email && <p className={'error'}>{errors.email}</p>}
						<p>
							<label htmlFor={'checkbox'}>Я согласен</label>
							<input
								className={'input'}
								type='checkbox'
								name='checkbox'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.checkbox}
							/>
							<label htmlFor={'checkbox'}>принимать актуальную информацию на e-mail</label>
						</p>
						<button
							className="btn"
							disabled={!isValid && !dirty}
							onClick={handleSubmit}
							type='submit'
						>Отправить
						</button>
						<div>{date ? `Последнее изменение ${date}` : null}</div>
					</div>
				)}
			</Formik>
		</div>
	);
}

export default Form;