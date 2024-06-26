export const getTime = (dateString: string): string => {
	const date = new Date(dateString);

	const hours = date.getHours();
	const minutes =
		date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
	const period = hours >= 12 ? 'PM' : 'AM';

	return `${hours}:${minutes} ${period}`;
};
