import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from 'src/common/Input/Input';
import Button from 'src/common/Button/Button';

import { BUTTON_REGISTER } from 'src/constants';

import { RegistrationProps, IsRegistered } from 'src/helpers/type';

const Registration: React.FC<IsRegistered> = ({ onRegister }) => {
	const [form, setForm] = useState({ name: '', email: '', password: '' });
	const [error, setError] = useState<RegistrationProps>({});
	const [generalError, setGeneralError] = useState<string>('');
	const navigate = useNavigate();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};

	const validate = () => {
		const newError: RegistrationProps = {};
		if (!form.name) newError.name = 'Name is required.';
		if (!form.email) newError.email = 'Email is required.';
		else if (!isValidEmail(form.email))
			newError.email = 'Invalid email format.';
		if (!form.password) newError.password = 'Password is required.';
		return newError;
	};

	const isValidEmail = (email: string) => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const validationError = validate();
		if (Object.keys(validationError).length > 0) {
			setError(validationError);
		} else {
			try {
				const newUser = {
					name: form.name,
					email: form.email,
					password: form.password,
				};

				const response = await fetch('http://localhost:4000/register', {
					method: 'POST',
					body: JSON.stringify(newUser),
					headers: {
						'Content-Type': 'application/json',
					},
				});
				if (response.ok) {
					const result = await response.json();
					onRegister && onRegister(form.name);
					navigate('/login');
					console.log(result);
				} else {
					const errorRes = await response.json();
					setGeneralError(
						errorRes.message || 'Registration failed. Please try again.'
					);
				}
			} catch (error) {
				console.log(error);
				setGeneralError('An error occurred. Please try again.');
			}
		}
	};

	return (
		<div className='regist'>
			<form className='regist__container' onSubmit={handleSubmit}>
				<h3 className='login__container_title'>Registration</h3>
				<div className='regist__container_main'>
					<div className='login__input'>
						<Input
							labelText='Name'
							placeholderText='Enter your name'
							onChange={handleChange}
							value={form.name}
							type='text'
							name='name'
							error={error.name}
						/>
					</div>
					<div className='login__input'>
						<Input
							labelText='Email'
							placeholderText='Enter your email'
							onChange={handleChange}
							value={form.email}
							type='email'
							name='email'
							error={error.email}
						/>
					</div>
					<div className='login__input'>
						<Input
							labelText='Password'
							placeholderText='Enter your password'
							onChange={handleChange}
							value={form.password}
							type='password'
							name='password'
							error={error.password}
						/>
					</div>
					<Button
						className='login__button'
						text={BUTTON_REGISTER}
						type='submit'
					/>
					{generalError && <p className='error-message'>{generalError}</p>}
					<p className='login__container_regist'>
						If you have an account you may
						<Link to='/login'>Login</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Registration;
