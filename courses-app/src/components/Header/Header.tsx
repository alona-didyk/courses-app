import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Logo } from './components/Logo/Logo';

import Button from 'src/common/Button/Button';

import { BUTTON_LOGOUT } from 'src/constants';

import { HeaderProps } from 'src/helpers/type';

const Header: React.FC<HeaderProps> = ({ loggedIn, onLogout, userName }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleLogout = () => {
		onLogout();
		navigate('/login');
	};

	const isAuthPage =
		location.pathname === '/login' || location.pathname === '/registration';

	return (
		<header className='header'>
			<div className='header__container'>
				<Logo />
				{loggedIn && !isAuthPage && (
					<div className='header__container_info'>
						<span className='header__container_name'>{userName}</span>
						<Button text={BUTTON_LOGOUT} onClick={handleLogout} />
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
