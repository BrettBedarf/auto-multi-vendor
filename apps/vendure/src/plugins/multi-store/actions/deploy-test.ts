import { deploy, DeployInput } from './deploy';

const deployInput: DeployInput = {
	storeName: 'My Store',
	subdomain: 'my-store',
	channelToken: 'v42hbha5v2y3mu2ygzu',
	apiUrl: 'http://localhost:3000/shop-api',
	gitRepo: 'BrettBedarf/auto-multi-vendor',
	channelRestUrl:
		'https://3000-brettbedarf-automultive-ozi5pftwioa.ws-us47.gitpod.io/channels',
	imageDomains:
		'https://3000-brettbedarf-automultive-ozi5pftwioa.ws-us47.gitpod.io',
};

process.env.VERCEL_TOKEN = 'M2oxLoRE4w9VhoHxLzqMHst5';
deploy(deployInput);
