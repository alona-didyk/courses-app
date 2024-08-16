// import { Author } from './type';

// export function getAuthorNames(
// 	ids: string[],
// 	authorsList: Author[],
// 	maxLength: number
// ): string {
// 	const authorNames = ids
// 		.map((id) => {
// 			const author = authorsList.find((author) => author.id === id);
// 			return author ? author.name : 'Unknown Author';
// 		})
// 		.join(', ');

// 	if (authorNames.length > maxLength) {
// 		return authorNames.slice(0, maxLength - 3) + '...';
// 	}
// 	return authorNames;
// }
