import React from 'react';

import Button from 'src/common/Button/Button';

import { BUTTON_ADD } from 'src/constants';

const EmptyCourseList: React.FC = () => {
	return (
		<div className='empty'>
			<div className='empty__container'>
				<h1 className='empty__container_title'>Course List is Empty</h1>
				<p className='empty__container_description'>
					'Please use "Add New Course" button to add your first course
				</p>
				<Button text={BUTTON_ADD} />
			</div>
		</div>
	);
};

export default EmptyCourseList;
