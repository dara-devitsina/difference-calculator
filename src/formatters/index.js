import recursive from './recursive.js';
import plain from './plain.js';

const format = (diff, neededFormat) => {
	switch (neededFormat) {
		case 'plain':
			return plain(diff);
		case 'json':
			return JSON.stringify(diff);
		default:
			return recursive(diff);
	} 	
};

export default format;
