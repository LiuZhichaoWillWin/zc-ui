export const virtualListProps = {
	data: {
		type: Array<object>,
		default: () => [],
	},
	visibleSize: {
		type: Number,
		default: 6,
	},
	itemHeight: {
		type: Number,
    default: 30,
		required: true,
	}
};
