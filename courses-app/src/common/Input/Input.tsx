import React from 'react';

import { InputFieldProps } from 'src/helpers/type';

const Input: React.FC<InputFieldProps> = ({
	labelText,
	placeholderText,
	type,
	onChange,
	value,
	id,
	name,
	error,
	className,
}) => {
	const labelId = id ?? name;
	const inputClassName = error
		? `input_input error ${className}`
		: `input_input ${className}`;
	const errorClassName = error ? 'input_error visible' : 'input_error';

	return (
		<div className='input'>
			<label className='input_label' htmlFor={labelId}>
				{labelText}
			</label>
			<input
				className={inputClassName}
				id={labelId}
				type={type ?? 'text'}
				placeholder={placeholderText}
				onChange={onChange}
				value={value}
				name={name}
			/>
			<p className={errorClassName}>{error}</p>
		</div>
	);
};

export default Input;
