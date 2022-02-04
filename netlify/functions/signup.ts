import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import GoTrueAuth from '../lib/gotrue';
import { SignupInfo } from '../lib/types';

// @ts-ignore
global.fetch = fetch;

export const handler: Handler = async (event, context) => {
	if (event.body) {
		const { email, password, data } = JSON.parse(event.body) as SignupInfo;

		try {
			const user = await GoTrueAuth.signup(email, password, data);

			return {
				statusCode: 200,
				data,
				body: JSON.stringify(user),
			};
		} catch (error) {
			console.log(error);

			return {
				statusCode: 500,
				error,
			};
		}
	}

	return {
		statusCode: 400,
	};
};
