import React from 'react';
import { ButtonProps } from 'src/helpers/type';

const Button: React.FC<ButtonProps> = ({
	text,
	onClick,
	type = 'button',
	className,
}) => (
	<button type={type} className={`button ${className}`} onClick={onClick}>
		{text}
	</button>
);

export default Button;
