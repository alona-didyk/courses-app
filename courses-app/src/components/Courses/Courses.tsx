import React, { useState, useEffect } from 'react';
import CourseCard from './components/CourseCard/CourseCard';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';
import Button from 'src/common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import { Author, Course } from 'src/helpers/type';
import { BUTTON_ADD } from 'src/constants';

interface CoursesProps {
	courses: Course[];
	authors: Author[];
	onCourseSelect: (course: Course) => void;
	onAddCourseClick?: () => void;
}

const Courses: React.FC<CoursesProps> = ({
	courses,
	authors,
	onCourseSelect,
	onAddCourseClick,
}) => {
	const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

	useEffect(() => {
		const savedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
		const savedAuthors = JSON.parse(localStorage.getItem('authors') || '[]');

		setFilteredCourses(savedCourses);
	}, []);

	useEffect(() => {
		const uniqueCourses = courses.filter(
			(course, index, self) =>
				index === self.findIndex((c) => c.id === course.id)
		);
		setFilteredCourses(uniqueCourses);
	}, [courses]);

	const handleSearch = (query: string) => {
		const lowercasedQuery = query.toLowerCase();
		const filtered = courses.filter(
			(course) =>
				course.title.toLowerCase().includes(lowercasedQuery) ||
				course.id.toLowerCase().includes(lowercasedQuery)
		);
		setFilteredCourses(filtered);
	};

	const handleCourseSelect = (course: Course) => {
		onCourseSelect(course);
	};

	return (
		<div className='courses'>
			<div className='courses__container'>
				<div className='courses__container_search'>
					<SearchBar onSearch={handleSearch} />
					{courses.length > 0 && (
						<Button text={BUTTON_ADD} onClick={onAddCourseClick} />
					)}
				</div>
				<div className='courses__container_course'>
					{filteredCourses.length === 0 ? (
						<EmptyCourseList />
					) : (
						filteredCourses.map((course, index) => (
							<CourseCard
								key={`${course.id}_${index}`}
								course={course}
								authors={authors}
								onCourseSelect={handleCourseSelect}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default Courses;
