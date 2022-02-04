import GoTrue from 'gotrue-js';

const GoTrueAuth = new GoTrue({
	APIUrl: 'https://trying-serverless.netlify.app/.netlify/identity',
	audience: '',
	setCookie: false,
});

export default GoTrueAuth;
