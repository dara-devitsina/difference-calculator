import stylish from './stylish.js';
import plain from './plain.js';

const format = (diff, f) => {
	switch (f) {
		case 'plain':
			return plain(diff)
		case 'json':
			return JSON.stringify(diff)
		default:
			return stylish(diff);
	} 	
};

export default format;
