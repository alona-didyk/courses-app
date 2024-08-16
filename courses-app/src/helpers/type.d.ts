export interface Course {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

export interface Author {
	id: string;
	name: string;
}

export interface InputProps {
	labelText?: string;
	placeholderText?: string;
	type: 'text' | 'password' | 'email' | 'number';
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	id?: string;
	name?: string;
	error?: string;
	style?: React.CSSProperties;
	className?: string;
}

export interface InputFieldProps extends InputProps {
	className?: string;
	placeholder?: string;
}

export interface ButtonProps {
	text: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	type?: 'button' | 'submit' | 'reset';
	className?: string;
	disabled?: boolean;
}

export interface CourseInfoProps {
	course: Course;
	authors: Author[];
}

export interface CourseCardProps {
	course: Course;
	authors: Author[];
	onCourseSelect?: (course: Course) => void;
}

export interface SearchBarProps {
	onSearch: (query: string) => void;
}

export interface AuthorItemProps {
	author: { id: string; name: string };
	onRemove?: (authorToRemove: { id: string; name: string }) => void;
	onAdd?: (authorToAdd: { id: string; name: string }) => void;
}

export interface CreateCourseProps {
	onAddCourse?: (newCourse: Course) => void;
	onCancel?: () => void;
}

export interface HeaderProps {
	loggedIn: boolean;
	onLogout: () => void;
	userName: string;
}

export interface LoginProps {
	email?: string;
	password?: string;
}

export interface IsLoggedIn {
	onLogin: (userName: string) => void;
}

export interface RegistrationProps {
	name?: string;
	email?: string;
	password?: string;
}

export interface IsRegistered {
	onRegister?: (userName: string) => void;
	onLoginClick?: () => void;
}
