import _ from 'lodash';

const stringify = (item) => {
	if (typeof item === 'boolean' || typeof item === 'number') {
		return item;
	}
	if (typeof item === 'string') {
		return `'${item}'`;
	} if (_.isObject(item)) {
		return `[complex value]`;
	} 
};

const plain = (tree) => {
	const iter = (node, ancestry) => {
		// !!! попробовать заменить reduce на map
		const result = node.reduce((acc, item) => {
			const newAncestry = [...ancestry, item.name];
			// console.log(newAncestry);
			// console.log(item.children);

			if (item.status !== 'nested object') {
				if (item.status === 'added') {
					return [...acc, `Property '${newAncestry.join('.')}' was added with value: ${stringify(item.value)}`]
				}
				if (item.status === 'deleted') {
					return [...acc, `Property '${newAncestry.join('.')}' was removed`]
				}
				if (item.status === 'modified') {
					return [...acc, `Property '${newAncestry.join('.')}' was updated. From ${stringify(item.before)} to ${stringify(item.after)}`]
				}
				if (item.status === 'unmodified') {
					return [...acc, []]
				}
			}
			return [...acc, iter(item.children, [...newAncestry])]
		}, []);
		return result.flat().join('\n');
	}
	return iter(tree, []);
};

export default plain;
