import _ from 'lodash';

const stringify = (item) => {
	if (typeof item === 'boolean' || typeof item === 'number') {
		return item;
	}
	if (typeof item === 'string') {
		return `'${item}'`;
	} if (_.isObject(item)) {
		return '[complex value]';
	} 
};
const plain = (tree) => {
	const iter = (node, ancestry) => {
	
		const result = node.flatMap((item) => {
			const newAncestry = `${ancestry}${item.name}`;
			// console.log(newAncestry);
			// console.log(item.children);

			if (item.status !== 'nested object') {
				if (item.status === 'added') {
					return `Property '${newAncestry}' was added with value: ${stringify(item.value)}`
				}
				if (item.status === 'deleted') {
					return `Property '${newAncestry}' was removed`
				}
				if (item.status === 'modified') {
					return `Property '${newAncestry}' was updated. From ${stringify(item.before)} to ${stringify(item.after)}`
				}
				if (item.status === 'unmodified') {
					return [];
				}
			}
			return iter(item.children, `${newAncestry}.`)
		});
		return result.join('\n');
		return result;
	};
	return iter(tree, '');
};

export default plain;
