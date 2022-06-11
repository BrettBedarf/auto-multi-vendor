import axios from 'axios';
import { DeployResponse, GithubLink, ProjectResponse } from './vercel.types';

type DeployInput = {
	storeName: string;
	subdomain: string;
	channelToken: string;
	apiUrl: string;
	gitRepo: string;
	channelRestUrl: string;
	imageDomains:string;
};
export const deploy = async ({
	storeName,
	subdomain,
	channelToken,
	apiUrl,
	gitRepo,
	channelRestUrl,
	imageDomains
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
		gitRepository: { repo: gitRepo, type: 'github', sourceless: true },
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
				key: 'VENDURE_CHANNEL_REST_URL',
				value: channelRestUrl,
				target: 'production',
			},
			{
				type: 'plain',
				key: 'IMAGE_DOMAINS',
				value: imageDomains,
				target: 'production',
			},
		],
	};
	try {
		const { data: projectRespData } = await ax.post<
			ProjectResponse<GithubLink>
		>('/v9/projects', vercelProjectInput);

		const { name, id: projectId, link } = projectRespData;
		const repoId = link?.repoId;
		if (!repoId) {
			throw new Error(
				'Could not find repoId. Needed to create deployment'
			);
		}
		const { data: deployRespData } = await ax.post<DeployResponse>(
			'/v13/deployments',
			{
				name,
				source: 'import',
				target: 'production',
				gitSource: {
					type: 'github',
					repoId,
					ref: 'main',
				},
			}
		);

		const { readyState, id: deployId, url } = deployRespData;
		// check if deploy has error
		if (readyState === 'ERROR') {
			console.error('Deploy to vercel error state');
			return {
				success: false,
			};
		}

		console.log('Ready state: ', readyState);
		console.log('Deploy id: ', deployId);
		console.log('Deploy url: ', url);

		return { success: true };
	} catch (err) {
		console.log(err);
	}
};

// const apiUrl = process.env.VENDURE_SHOP_API_URL;
