export type Middleware<Req, Res> = (
	req: Req,
	res: Res,
	next: (req: Req, res: Res) => Promise<Res> | Res,
) => Promise<Res> | Res;

export class MiddlewareChain<Req, Res> {
	private chain: Middleware<Req, Res>[];
	private current: number;

	constructor(...middlewares: Middleware<Req, Res>[]) {
		this.run = this.run.bind(this);
		this.next = this.next.bind(this);

		this.chain = middlewares ?? [];
		this.current = 0;
	}

	use(...middlewares: Middleware<Req, Res>[]) {
		this.chain.push(...middlewares);
		return this;
	}

	async next(request: Req, response: Res) {
		this.current++;
		if (this.current >= this.chain.length) return response;

		return await this.run(request, response);
	}

	async run(request: Req, response: Res) {
		if (this.chain.length === 0) {
			return response;
		}

		const middleware = this.chain[this.current];

		return await middleware(request, response, this.next);
	}
}

export const createMiddlewareChain = <Req, Res>(
	...middlewares: Middleware<Req, Res>[]
) => new MiddlewareChain<Req, Res>(...middlewares);
