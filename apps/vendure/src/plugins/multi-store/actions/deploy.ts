import axios from 'axios';

type DeployInput = {
	storeName: string;
	subdomain: string;
	channelToken: string;
	apiUrl: string;
	gitRepo: string;
	channelRestUrl: string;
};
export const deploy = async ({
	storeName,
	subdomain,
	channelToken,
	apiUrl,
	gitRepo,
	channelRestUrl
}: DeployInput): Promise<any> => {
	const ax = axios.create({
		baseURL: 'https://api.vercel.com',
		headers: {
			Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
		},
	});

	const projectName = `multistore-${storeName
		.replace(/\s+/g, '-') //replace whitespace with -
		.toLowerCase()}`;
	const vercelProjectInput = {
		name: projectName,
		framework: 'nextjs',
		gitRepository: gitRepo,
		buildCommand: 'cd ../.. && yarn build:frontend',
		installCommand: 'cd ../.. && yarn install',
		rootDirectory: 'apps/frontend',
		environmentVariables: [
			{
				type: 'plain',
				key: 'COMMERCE_PROVIDER',
				value: '@vercel/commerce-vendure',
				target: 'production',
			},
			{
				type: 'plain',
				key: 'NEXT_PUBLIC_VENDURE_SHOP_API_URL',
				value: apiUrl,
				target: 'production',
			},
			{
				type: 'plain',
				key: 'NEXT_PUBLIC_VENDURE_CHANNEL_TOKEN',
				value: channelToken,
				target: 'production',
			},
			{
				type: 'plain',
				key: 'NEXT_PUBLIC_VENDURE_CHANNEL_REST_URL',
				value: channelRestUrl,
				target: 'production',
			},
		],
	};
	try {
		const { data } = await ax.post('/v9/projects', vercelProjectInput);

		console.log(data);

		return { success: true };
	} catch (err) {
		console.log(err);
	}
};

// const apiUrl = process.env.VENDURE_SHOP_API_URL;
