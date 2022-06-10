interface Response {
	accountId: string;
	analytics?: {
		id: string;
		canceledAt: number | null;
		disabledAt: number;
		enabledAt: number;
		paidAt?: number;
		sampleRatePercent?: number | null;
		spendLimitInDollars?: number | null;
	};
	autoExposeSystemEnvs?: boolean;
	buildCommand?: string | null;
	commandForIgnoringBuildStep?: string | null;
	createdAt?: number;
	devCommand?: string | null;
	directoryListing: boolean;
	installCommand?: string | null;
	env?: {
		id?: string;
		type: 'system' | 'secret' | 'encrypted' | 'plain';
		key: string;
		value: string;
		configurationId?: string | null;
		createdAt?: number;
		updatedAt?: number;
		target?:
			| (
					| 'production'
					| 'preview'
					| 'development'
					| 'preview'
					| 'development'
			  )[]
			| (
					| 'production'
					| 'preview'
					| 'development'
					| 'preview'
					| 'development'
			  );
		gitBranch?: string;
		createdBy?: string | null;
		updatedBy?: string | null;
		/** Whether `value` is decrypted. */
		decrypted?: boolean;
	}[];
	framework?:
		| (
				| 'blitzjs'
				| 'nextjs'
				| 'gatsby'
				| 'remix'
				| 'astro'
				| 'hexo'
				| 'eleventy'
				| 'docusaurus-2'
				| 'docusaurus'
				| 'preact'
				| 'solidstart'
				| 'dojo'
				| 'ember'
				| 'vue'
				| 'scully'
				| 'ionic-angular'
				| 'angular'
				| 'polymer'
				| 'svelte'
				| 'sveltekit'
				| 'ionic-react'
				| 'create-react-app'
				| 'gridsome'
				| 'umijs'
				| 'sapper'
				| 'saber'
				| 'stencil'
				| 'nuxtjs'
				| 'redwoodjs'
				| 'hugo'
				| 'jekyll'
				| 'brunch'
				| 'middleman'
				| 'zola'
				| 'vite'
				| 'parcel'
				| 'sanity'
		  )
		| null;
	gitForkProtection?: boolean;
	id: string;
	latestDeployments?: {
		alias?: string[];
		aliasAssigned?: (number | boolean) | null;
		builds?: {
			use: string;
			src?: string;
			dest?: string;
		}[];
		createdAt: number;
		createdIn: string;
		creator: {
			email: string;
			githubLogin?: string;
			gitlabLogin?: string;
			uid: string;
			username: string;
		} | null;
		deploymentHostname: string;
		name: string;
		forced?: boolean;
		id: string;
		meta?: { [key: string]: string };
		plan: string;
		private: boolean;
		readyState: string;
		requestedAt?: number;
		target?: string | null;
		teamId?: string | null;
		type: string;
		url: string;
		userId: string;
		withCache?: boolean;
	}[];
	link?:
		| {
				org?: string;
				repo?: string;
				repoId?: number;
				type?: 'github';
				createdAt?: number;
				deployHooks: {
					createdAt?: number;
					id: string;
					name: string;
					ref: string;
					url: string;
				}[];
				gitCredentialId?: string;
				updatedAt?: number;
				sourceless?: boolean;
				productionBranch?: string;
		  }
		| {
				projectId?: string;
				projectName?: string;
				projectNameWithNamespace?: string;
				projectNamespace?: string;
				projectUrl?: string;
				type?: 'gitlab';
				createdAt?: number;
				deployHooks: {
					createdAt?: number;
					id: string;
					name: string;
					ref: string;
					url: string;
				}[];
				gitCredentialId?: string;
				updatedAt?: number;
				sourceless?: boolean;
				productionBranch?: string;
		  }
		| {
				name?: string;
				slug?: string;
				owner?: string;
				type?: 'bitbucket';
				uuid?: string;
				workspaceUuid?: string;
				createdAt?: number;
				deployHooks: {
					createdAt?: number;
					id: string;
					name: string;
					ref: string;
					url: string;
				}[];
				gitCredentialId?: string;
				updatedAt?: number;
				sourceless?: boolean;
				productionBranch?: string;
		  };
	name: string;
	nodeVersion: '16.x' | '14.x' | '12.x' | '10.x';
	outputDirectory?: string | null;
	passwordProtection?: {
		deploymentType: 'all' | 'preview';
	} | null;
	publicSource?: boolean | null;
	rootDirectory?: string | null;
	serverlessFunctionRegion?: string | null;
	sourceFilesOutsideRootDirectory?: boolean;
	ssoProtection?: {
		deploymentType: 'all' | 'preview';
	} | null;
	targets?: { [key: string]: string };
	transferCompletedAt?: number;
	transferStartedAt?: number;
	transferToAccountId?: string;
	transferredFromAccountId?: string;
	updatedAt?: number;
	live?: boolean;
	permissions?: {
		aliasGlobal?: ACLAction[];
		aliasProject?: ACLAction[];
		analytics?: ACLAction[];
		analyticsSampling?: ACLAction[];
		analyticsUsage?: ACLAction[];
		billingAddress?: ACLAction[];
		billingInformation?: ACLAction[];
		billingInvoice?: ACLAction[];
		billingInvoiceEmailRecipient?: ACLAction[];
		billingInvoiceLanguage?: ACLAction[];
		billingPurchaseOrder?: ACLAction[];
		billingTaxId?: ACLAction[];
		cacheArtifact?: ACLAction[];
		cacheArtifactUsageEvent?: ACLAction[];
		concurrentBuilds?: ACLAction[];
		deployment?: ACLAction[];
		deploymentCheck?: ACLAction[];
		deploymentCheckPreview?: ACLAction[];
		deploymentPreview?: ACLAction[];
		deploymentPrivate?: ACLAction[];
		domain?: ACLAction[];
		domainAcceptDelegation?: ACLAction[];
		domainAuthCodes?: ACLAction[];
		domainCertificate?: ACLAction[];
		domainCheckConfig?: ACLAction[];
		domainMove?: ACLAction[];
		domainPurchase?: ACLAction[];
		domainRecord?: ACLAction[];
		domainTransferIn?: ACLAction[];
		event?: ACLAction[];
		fileUpload?: ACLAction[];
		gitRepository?: ACLAction[];
		integration?: ACLAction[];
		integrationConfiguration?: ACLAction[];
		integrationConfigurationProjects?: ACLAction[];
		job?: ACLAction[];
		logDrain?: ACLAction[];
		monitoring?: ACLAction[];
		notificationDomainConfiguration?: ACLAction[];
		notificationDomainExpire?: ACLAction[];
		notificationDomainMoved?: ACLAction[];
		notificationDomainPurchase?: ACLAction[];
		notificationDomainRenewal?: ACLAction[];
		notificationDomainTransfer?: ACLAction[];
		notificationDomainUnverified?: ACLAction[];
		notificationPaymentFailed?: ACLAction[];
		notificationUsageAlert?: ACLAction[];
		passwordProtection?: ACLAction[];
		paymentMethod?: ACLAction[];
		permissions?: ACLAction[];
		previewDeploymentSuffix?: ACLAction[];
		project?: ACLAction[];
		projectDeploymentHook?: ACLAction[];
		projectDomain?: ACLAction[];
		projectDomainMove?: ACLAction[];
		projectEnvVars?: ACLAction[];
		projectEnvVarsProduction?: ACLAction[];
		projectIntegrationConfiguration?: ACLAction[];
		projectLink?: ACLAction[];
		projectMember?: ACLAction[];
		projectProductionBranch?: ACLAction[];
		projectTransfer?: ACLAction[];
		rateLimit?: ACLAction[];
		remoteCaching?: ACLAction[];
		samlConfig?: ACLAction[];
		secret?: ACLAction[];
		supportCase?: ACLAction[];
		supportCaseComment?: ACLAction[];
		team?: ACLAction[];
		teamAccessRequest?: ACLAction[];
		teamFellowMembership?: ACLAction[];
		teamInvite?: ACLAction[];
		teamInviteCode?: ACLAction[];
		teamJoin?: ACLAction[];
		teamOwnMembership?: ACLAction[];
		teamOwnMembershipDisconnectSAML?: ACLAction[];
		token?: ACLAction[];
		usage?: ACLAction[];
		user?: ACLAction[];
		userConnection?: ACLAction[];
	};
}

/** Enum containing the actions that can be performed against a resource. Group operations are included. */
type ACLAction = 'create' | 'delete' | 'read' | 'update' | 'list' | 'count';
