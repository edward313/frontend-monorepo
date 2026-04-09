import type { NextRequest, NextResponse } from "next/server";

import authentication from "./authentication";
import authorization from "./authorization";

type Middleware = (
	req: NextRequest,
	res: NextResponse,
	next: (req: NextRequest, res: NextResponse) => Promise<NextResponse> | NextResponse,
) => Promise<NextResponse> | NextResponse;

class MiddlewareChain {
	private chain: Middleware[];
	private current: number;

	constructor(...middlewares: Middleware[]) {
		this.run = this.run.bind(this);
		this.next = this.next.bind(this);

		this.chain = middlewares ?? [];
		this.current = 0;
	}

	use(...middlewares: Middleware[]) {
		this.chain.push(...middlewares);
		return this;
	}

	async next(request: NextRequest, response: NextResponse) {
		this.current++;
		if (this.current >= this.chain.length) return response;

		return await this.run(request, response);
	}

	async run(request: NextRequest, response: NextResponse) {
		if (this.chain.length === 0) {
			return response;
		}

		const middleware = this.chain[this.current];

		return await middleware(request, response, this.next);
	}
}

export default async function createMiddlewareChain(
	request: NextRequest,
	response: NextResponse,
) {
	const chain = new MiddlewareChain(authentication, authorization);

	return await chain.run(request, response);
}
