"use client";

import * as React from "react";

type ColumnWidthContextValue = {
	registerCell: (colIdx: number, el: HTMLTableCellElement | null) => void;
	widthsCol: number[];
	leftOffsets: number[];
	rightOffsets: number[];
};

const ColumnWidthContext = React.createContext<ColumnWidthContextValue | null>(
	null,
);

const useColumnWidthContext = () => {
	const ctx = React.useContext(ColumnWidthContext);
	if (!ctx) {
		throw new Error(
			"useColumnWidthContext must be used within ColumnWidthContext.Provider",
		);
	}
	return ctx;
};

export { ColumnWidthContext, useColumnWidthContext };
