import React, { useState } from 'react';

import Input from 'src/common/Input/Input';
import Button from 'src/common/Button/Button';

import { SearchBarProps } from 'src/helpers/type';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [searchQuery, setSearchQuery] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
		onSearch(event.target.value);
	};

	return (
		<div className='search'>
			<div className='search__container'>
				<Input
					placeholderText='Search by title or ID'
					onChange={handleInputChange}
					value={searchQuery}
					type='text'
					name='search'
					style={{ width: '400px' }}
				/>
				<Button text='Search' type='button' />
			</div>
		</div>
	);
};

export default SearchBar;
