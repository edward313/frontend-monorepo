export const fNumber = (
	value: number | undefined | null,
	decimal = 2,
): string => {
	if (value === undefined || value === null) return "";
	const formatted = new Intl.NumberFormat("vi-VN", {
		style: "decimal",
		minimumFractionDigits: 0,
		maximumFractionDigits: decimal,
	}).format(value);
	return formatted;
};

export const fCurrency = (value: number | undefined, decimal = 0): string => {
	const formatted = fNumber(value, decimal);

	return `${formatted}đ`;
};
