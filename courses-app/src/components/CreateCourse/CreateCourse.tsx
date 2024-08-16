import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import AuthorItem from './components/AuthorItem/AuthorItem';

import { mockedCoursesList, mockedAuthorsList } from '../../constants';

import { getCourseDuration } from '../../helpers/getCourseDuration';

import { Author, CreateCourseProps, Course } from 'src/helpers/type';

const CreateCourse: React.FC<CreateCourseProps> = ({ onAddCourse }) => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		title: '',
		description: '',
		duration: '',
		newAuthor: '',
	});
	const [error, setError] = useState<{ [key: string]: string }>({});
	const [allAuthors, setAllAuthors] = useState<{ id: string; name: string }[]>(
		[]
	);
	const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);
	const [formattedDuration, setFormattedDuration] = useState('');

	const validate = () => {
		const newError: { [key: string]: string } = {};
		if (!form.title || form.title.length < 2)
			newError.title =
				'Title is required and must be at least 2 characters long.';
		if (!form.description || form.description.length < 2)
			newError.description =
				'Description is required and must be at least 2 characters long.';
		if (!form.duration || Number(form.duration) <= 0)
			newError.duration = 'Duration must be greater than 0.';
		if (selectedAuthors.length === 0)
			newError.authors = 'Please add at least one author.';
		setError(newError);
		return newError;
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		const validationError = validate();
		if (Object.keys(validationError).length > 0) {
			setError(validationError);
			return;
		}

		const newCourse: Course = {
			id: uuidv4(),
			title: form.title,
			description: form.description,
			creationDate: new Date().toLocaleDateString(),
			duration: Number(form.duration),
			authors: selectedAuthors.map((author) => author.id),
		};

		// Retrieve existing courses from localStorage or initialize as empty array
		const existingCourses = JSON.parse(localStorage.getItem('courses') || '[]');
		existingCourses.push(newCourse);
		localStorage.setItem('courses', JSON.stringify(existingCourses));

		// Retrieve existing authors from localStorage or initialize as empty array
		const existingAuthors = JSON.parse(localStorage.getItem('authors') || '[]');
		selectedAuthors.forEach((author) => {
			if (
				!existingAuthors.some(
					(existingAuthor: Author) => existingAuthor.id === author.id
				)
			) {
				existingAuthors.push(author);
			}
		});
		localStorage.setItem('authors', JSON.stringify(existingAuthors));

		onAddCourse(newCourse);
		navigate('/courses');

		setForm({ title: '', description: '', duration: '', newAuthor: '' });
		setSelectedAuthors([]);
		setFormattedDuration('');
	};

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });

		if (name === 'duration') {
			if (/^\d*$/.test(value)) {
				const minutes = parseInt(value);
				const formattedDuration = getCourseDuration(minutes);
				setFormattedDuration(formattedDuration);
			}
		}
	};

	const addAuthor = () => {
		if (form.newAuthor.trim().length >= 2) {
			const newAuthor = { id: uuidv4(), name: form.newAuthor };
			setAllAuthors([...allAuthors, newAuthor]);
			setForm({ ...form, newAuthor: '' });
			setError({ ...error, newAuthor: '' });
		} else {
			setError({
				...error,
				newAuthor: 'Author name must be at least 2 characters long.',
			});
		}
	};

	const selectAuthorHandler = (authorToSelect: Author) => {
		setSelectedAuthors((prevSelectedAuthors) => [
			...prevSelectedAuthors,
			authorToSelect,
		]);
		setAllAuthors((prevAuthors) =>
			prevAuthors.filter((author) => author.id !== authorToSelect.id)
		);
	};

	const removeCourseAuthorHandler = (authorToRemove: Author) => {
		setSelectedAuthors((prevSelectedAuthors) =>
			prevSelectedAuthors.filter((author) => author.id !== authorToRemove.id)
		);
		setAllAuthors([...allAuthors, authorToRemove]);
	};

	return (
		<div className='create'>
			<form className='create__container' onSubmit={handleSubmit}>
				<h3 className='create__container_title'>Course edit/create page</h3>
				<div className='create__container_main'>
					<h3 className='create__container_subtitle'>Main Info</h3>
					<div className='create__container_first'>
						<Input
							labelText='Title'
							placeholderText='Enter course title'
							onChange={handleChange}
							value={form.title}
							type='text'
							name='title'
							error={error.title}
							className='wide-input'
						/>
					</div>
					<div className='create__container_description'>
						<Input
							labelText='Description'
							placeholderText='Enter course description'
							onChange={handleChange}
							value={form.description}
							type='text'
							name='description'
							error={error.description}
							className='big-input'
						/>
					</div>
					<h3 className='create__container_subtitle'>Duration</h3>
					<div className='create__duration_container'>
						<Input
							labelText='Duration'
							placeholderText='Enter course duration'
							onChange={handleChange}
							value={form.duration}
							type='number'
							name='duration'
							error={error.duration}
							className='mid-input'
						/>
						<span className='create__duration_display'>
							<strong>
								{form.duration ? formattedDuration : '00:00 hours'}
							</strong>
						</span>
					</div>

					<div className='create__container_authors'>
						<div className='create__author_input'>
							<h3 className='create__container_subtitle'>Authors</h3>
							<div className='create__container_buttons'>
								<Input
									labelText='Add Author'
									placeholderText='Enter author name'
									onChange={handleChange}
									value={form.newAuthor}
									type='text'
									name='newAuthor'
									error={error.newAuthor}
									className='mid-input'
								/>
								<Button
									text='Create Author'
									onClick={addAuthor}
									type='button'
								/>
							</div>
						</div>
						<div className='create__author_input'>
							<h3 className='create__container_subtitle'>Course Authors</h3>
							{selectedAuthors.length === 0 ? (
								<p>Author list is empty</p>
							) : (
								<div>
									{selectedAuthors.map((author) => (
										<AuthorItem
											key={author.id}
											author={author}
											onRemove={removeCourseAuthorHandler}
										/>
									))}
								</div>
							)}
						</div>
					</div>
					<div className='create__author_list'>
						<h3 className='create__container_subtitle'>Authors List</h3>
						{allAuthors.map((author) => (
							<AuthorItem
								key={author.id}
								author={author}
								onAdd={selectAuthorHandler}
							/>
						))}
					</div>
					<div className='create__course_authors'></div>
				</div>
				<div className='form-buttons'>
					<Button
						text='Cancel'
						onClick={() => navigate('/courses')}
						type='button'
					/>
					<Button text='Create Course' type='submit' />
				</div>
			</form>
		</div>
	);
};

export default CreateCourse;
