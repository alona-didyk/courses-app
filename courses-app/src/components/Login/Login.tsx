import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from 'src/common/Input/Input';
import Button from 'src/common/Button/Button';
import { BUTTON_LOGIN } from 'src/constants';
import { LoginProps, IsLoggedIn } from 'src/helpers/type';

const Login: React.FC<IsLoggedIn> = ({ onLogin }) => {
	const [form, setForm] = useState({ email: '', password: '' });
	const [error, setError] = useState<LoginProps>({});
	const [generalError, setGeneralError] = useState<string>('');
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			navigate('/courses');
		}
	}, [navigate]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setForm((prevForm) => ({ ...prevForm, [name]: value }));
	};

	const validate = () => {
		const newError: LoginProps = {};
		if (!form.email) newError.email = 'Email is required.';
		if (!form.password) newError.password = 'Password is required.';
		return newError;
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const validationError = validate();
		if (Object.keys(validationError).length > 0) {
			setError(validationError);
		} else {
			try {
				const response = await fetch('http://localhost:4000/login', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify(form),
				});
				const data = await response.json();
				if (response.ok) {
					console.log('Login response:', data);
					localStorage.setItem('token', data.result);
					const userName = data.user.name;
					if (userName) {
						localStorage.setItem('userName', userName);
						onLogin(userName);
					} else {
						console.error('userName is undefined in the response');
						setGeneralError('An error occurred. Please try again later.');
					}
					navigate('/courses');
				} else {
					setError({});
					setGeneralError('Invalid email or password.');
				}
			} catch (error) {
				console.log(error);
				setGeneralError('An error occurred. Please try again later.');
			}
		}
	};

	return (
		<div className='login'>
			<form className='login__container' onSubmit={handleSubmit}>
				<h3 className='login__container_title'>Login</h3>
				<div className='login__container_main'>
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
						text={BUTTON_LOGIN}
						onClick={handleSubmit}
					/>
					{generalError && <p className='error-message'>{generalError}</p>}
					<p className='login__container_regist'>
						If you don't have an account you may{' '}
						<Link to='/registration'>Register</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Login;
