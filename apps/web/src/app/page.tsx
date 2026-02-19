"use client";

import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";

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

	const onChange = (e: ChangeEvent<HTMLInputElement>) =>
		setName(e.target.value);

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

	const onReset = () => {
		setName("");
	};

	return (
		<div>
			<h1>Web</h1>
		</div>
	);
}
