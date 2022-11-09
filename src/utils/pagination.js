export default function pagination(data, options) {
	let { page, size } = options
	const pageCount = Math.ceil(data.length / size);
	let pageno = parseInt(page);
	let total = data?.length;
	if (!pageno) { pageno = 1; }
	if (pageno > pageCount) {
		return {
			"page": pageno,
			"pageCount": pageCount,
			"total": total,
			"data": []
		}
	} else {
		return {
			"page": pageno,
			"pageCount": pageCount,
			"total": total,
			"data": data.slice(pageno * size - size, pageno * size)
		};
	}

}