import { Handler } from '@netlify/functions';
import GoTrueAuth from '../lib/gotrue';
import { SignupInfo } from '../lib/types';

export const handler: Handler = async (event, context) => {
	if (event.body) {
		const { email, password, data } = JSON.parse(event.body) as SignupInfo;

		try {
			const user = await GoTrueAuth.signup(email, password);
			return {
				statusCode: 200,
				user,
			};
		} catch (error) {
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
