"use client";
import { Button } from "@repo/ui/button";
import { useState } from "react";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

export default function Web() {
	const [name, setName] = useState<string>("");
	const [response, setResponse] = useState<{ message: string } | null>(null);
	const [error, setError] = useState<string | undefined>();

	const onReset = () => {
		setName("");
	};

	return (
		<div>
			<h1>Web</h1>
			<form>
				<label htmlFor="name">Name </label>
				<input type="text" name="name" id="name" value={name}></input>
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
					<Button onClick={onReset}>Reset</Button>
				</div>
			)}
		</div>
	);
}
