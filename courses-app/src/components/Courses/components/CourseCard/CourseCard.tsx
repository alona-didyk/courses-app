import React from 'react';

import { getCourseDuration } from 'src/helpers/getCourseDuration';
import { formatCreationDate } from 'src/helpers/formatCreationDate';

import { CourseCardProps } from 'src/helpers/type';

import Button from 'src/common/Button/Button';

import { BUTTON_SHOW } from 'src/constants';

const CourseCard: React.FC<CourseCardProps> = ({
	course,
	authors,
	onCourseSelect,
}) => {
	const courseAuthors = course.authors
		.map((authorId) => authors.find((author) => author.id === authorId)?.name)
		.filter(Boolean)
		.join(', ');

	return (
		<div className='courses__container_card'>
			<div className='courses__container_left'>
				<h2>{course.title}</h2>
				<p className='courses__container_description'>{course.description}</p>
			</div>

			<div className='courses__container_right'>
				<div className='courses__container_top'>
					<p className='courses__container_authors'>
						<strong>Authors:</strong> {courseAuthors}
					</p>
					<p className='courses__container_description'>
						<strong>Duration:</strong> {getCourseDuration(course.duration)}
					</p>
					<p className='courses__container_description'>
						<strong>Created:</strong> {formatCreationDate(course.creationDate)}
					</p>
				</div>
				<div className='courses__container_bottom'>
					<Button text={BUTTON_SHOW} onClick={() => onCourseSelect(course)} />
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
