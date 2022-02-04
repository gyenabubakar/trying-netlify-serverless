import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

const Home: NextPage = () => {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [submitting, setSubmitting] = useState(false);

	function handleSignup(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setSubmitting(true);
		axios
			.post('/.netlify/functions/signup', {
				fullName,
				email,
				password,
				confirmPassword,
			})
			.catch((err) => {
				console.dir(err);
			})
			.finally(() => {
				setSubmitting(false);
			});
	}

	async function getMessage() {
		const response = await fetch('/.netlify/functions/hello-world');
		const data = await response.json();
		console.log(data);
	}

	useEffect(() => {
		getMessage();
	}, []);

	return (
		<div>
			<Head>
				<title>Signup - Trying out Serverless Functions</title>
			</Head>

			<main>
				<h1 className="text-3xl font-bold underline">Hello world!</h1>

				<form
					autoComplete="off"
					className="flex flex-col items-center"
					onSubmit={handleSignup}
				>
					<div className="input-group">
						<label htmlFor="full-name">Full name</label>
						<input
							type="text"
							id="full-name"
							value={fullName}
							placeholder="Full name"
							className="w-full"
							onChange={(e) => setFullName(e.target.value)}
						/>
					</div>

					<div className="input-group">
						<label htmlFor="email">Email address</label>
						<input
							type="text"
							id="email"
							value={email}
							placeholder="Your email address"
							className="w-full"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="input-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							placeholder="Your password"
							className="w-full"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className="input-group">
						<label htmlFor="confirm-password">Confirm password</label>
						<input
							type="password"
							id="confirm-password"
							value={confirmPassword}
							placeholder="Confirm your password"
							className="w-full"
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>

					<div className="text-center">
						<button
							type="submit"
							className="px-8 py-4 rounded-md bg-green-500 text-white outline-none border-none hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={submitting}
						>
							{submitting ? 'Please wait...' : 'Sign up'}
						</button>
					</div>
				</form>
			</main>
		</div>
	);
};

export default Home;
