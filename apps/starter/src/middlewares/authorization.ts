import type { NextRequest, NextResponse } from "next/server";

type MiddlewareNext = (
	req: NextRequest,
	res: NextResponse,
) => Promise<NextResponse> | NextResponse;

// import type { NextRequest } from 'next/server'

export default async function authorization(
	req: NextRequest,
	res: NextResponse,
	next: MiddlewareNext,
) {
	return next(req, res);
}
