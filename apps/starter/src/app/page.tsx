"use client";

import { Button, Input } from "@repo/ui";
import { type FormEvent, useEffect, useState } from "react";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

export default function Web() {
	const [name, setName] = useState<string>("");
	const [response, setResponse] = useState<{ message: string } | null>(null);
	const [error, setError] = useState<string | undefined>();

	useEffect(() => {
		if (name.trim().length === 0) {
			setResponse(null);
			setError(undefined);
			return;
		}

		setResponse(null);
		setError(undefined);
	}, [name]);

	const onChange = (value: string) => setName(value);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const result = await fetch(`${API_HOST}/message/${name}`);
			const response = await result.json();
			setResponse(response);
		} catch (err) {
			console.error(err);
			setError("Unable to fetch response");
		}
	};

	return (
		<div>
			<h1>Web</h1>
			<form onSubmit={onSubmit}>
				<label htmlFor="name">Name </label>
				<div className="bg-amber-400">
					<Input
						type="text"
						name="name"
						id="name"
						value={name}
						onChange={onChange}
					/>
				</div>
				<Button type="submit">Submit</Button>
			</form>
			{error && (
				<div>
					<h3>Error</h3>
					<p>{error}</p>
				</div>
			)}
			{response && (
				<div>
					<h3>Greeting</h3>
					<p>{response.message}</p>
				</div>
			)}
		</div>
	);
}
