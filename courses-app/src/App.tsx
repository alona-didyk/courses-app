import React, { useEffect, useState } from 'react';
import {
	Navigate,
	Route,
	Routes,
	useNavigate,
	useParams,
} from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';

import { mockedCoursesList, mockedAuthorsList } from './constants';

import { Course, Author } from './helpers/type';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

const App: React.FC = () => {
	const navigate = useNavigate();
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
	const [loggedIn, setLoggedIn] = useState(false);
	const [showRegistration, setShowRegistration] = useState(true);
	const [courses, setCourses] = useState<Course[]>(mockedCoursesList);
	const [authors, setAuthors] = useState<Author[]>(mockedAuthorsList);
	const [userName, setUserName] = useState('');

	useEffect(() => {
		const storedUserName = localStorage.getItem('userName');
		if (storedUserName) {
			setLoggedIn(true);
			setUserName(storedUserName);
			setShowRegistration(false);
		}
	}, []);

	const handleLogin = (userName: string) => {
		setLoggedIn(true);
		setUserName(userName);
		localStorage.setItem('userName', userName);
		setShowRegistration(false);
	};

	const handleSuccessfulRegister = (userName: string) => {
		setLoggedIn(true);
		setUserName(userName);
		localStorage.setItem('userName', userName);
		setShowRegistration(false);
	};

	const handleAddCourse = (newCourse: Course) => {
		newCourse.id = uuidv4();
		setCourses([...courses, newCourse]);
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userName');
		setLoggedIn(false);
		setShowRegistration(true);
		setUserName('');
		navigate('/login', { replace: true });
	};

	const CourseInfoWrapper = () => {
		const { courseId } = useParams<{ courseId: string }>();
		const course = courses.find((c) => c.id === courseId);
		return course ? (
			<CourseInfo course={course} authors={authors} />
		) : (
			<Navigate to='/courses' />
		);
	};

	const handleCourseSelect = (course: Course) => {
		setSelectedCourse(course);
		navigate(`/courses/${course.id}`);
	};

	const handleCreateCourseClick = () => {
		navigate('/courses/add');
	};

	return (
		<div className='app'>
			<Header loggedIn={loggedIn} onLogout={handleLogout} userName={userName} />
			<Routes>
				<Route
					path='/'
					element={
						loggedIn ? <Navigate to='/courses' /> : <Navigate to='/login' />
					}
				/>
				<Route element={<ProtectedRoute loggedIn={loggedIn} />}>
					<Route
						path='/courses'
						element={
							<Courses
								courses={courses}
								authors={authors}
								onCourseSelect={handleCourseSelect}
								onAddCourseClick={handleCreateCourseClick}
							/>
						}
					/>
					<Route
						path='/courses/add'
						element={<CreateCourse onAddCourse={handleAddCourse} />}
					/>
					<Route path='/courses/:courseId' element={<CourseInfoWrapper />} />
				</Route>
				<Route path='/login' element={<Login onLogin={handleLogin} />} />
				<Route
					path='/registration'
					element={<Registration onRegister={handleSuccessfulRegister} />}
				/>
			</Routes>
		</div>
	);
};

export default App;
