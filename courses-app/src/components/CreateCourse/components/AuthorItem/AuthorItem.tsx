import React from 'react';

import { AuthorItemProps } from 'src/helpers/type';

const AuthorItem: React.FC<AuthorItemProps> = ({ author, onRemove, onAdd }) => {
	return (
		<div className='author-item'>
			<p>{author.name}</p>
			{onAdd && (
				<button className='icon-add' onClick={() => onAdd(author)}></button>
			)}
			{onRemove && (
				<button
					className='icon-delete'
					onClick={() => onRemove(author)}
				></button>
			)}
		</div>
	);
};

export default AuthorItem;
