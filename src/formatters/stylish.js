import _ from 'lodash';

const stringify = (item, currentDepth) => {
	if (_.isObject(item)) {
		const space = ' ';
		const [key, value] = Object.entries(item).flat();
		return `{\n${space.repeat(currentDepth + 8)}${key}: ${value}\n${space.repeat(currentDepth + 4)}}`;
	}
	return item;
};

const stylish = (tree) => {
	// console.log(tree);
	const iter = (node, depth) => {
		const space = ' ';
		//console.log(depth);
		const result = node.reduce((acc, obj) => {
			if (obj.status !== 'nested object') {
				if (obj.status === 'added') {
					return [...acc, `${space.repeat(depth + 2)}+ ${obj.name}: ${stringify(obj.value, depth)}`];
				} if (obj.status === 'deleted') {
					return [...acc, `${space.repeat(depth + 2)}- ${obj.name}: ${stringify(obj.value, depth)}`];
				} if (obj.status === 'modified') {
					return [...acc, `${space.repeat(depth + 2)}+ ${obj.name}: ${stringify(obj.after, depth)}\n${space.repeat(depth + 2)}- ${obj.name}: ${stringify(obj.before, depth)}`];
				} if (obj.status === 'unmodified') {
					return [...acc, `${space.repeat(depth + 4)}${obj.name}: ${stringify(obj.value, depth)}`];
				}
			}
			return [...acc, `${space.repeat(depth + 4)}${obj.name}: ${iter(obj.children, depth + 4)}`];
		}, []);
		return `{\n${result.join('\n')}\n${space.repeat(depth)}}`;
	}
	return iter(tree, 0)
};

export default stylish;
