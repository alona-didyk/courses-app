export const getCourseDuration = (minutes: number): string => {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
	const minsStr = mins < 10 ? `0${mins}` : `${mins}`;
	const hour = hours === 1 ? 'hour' : 'hours';
	return `${hoursStr}:${minsStr} ${hour}`;
};
