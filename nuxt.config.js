import colors from 'vuetify/es5/util/colors'
require('dotenv').config();
export default {
	mode: 'spa',
	generate: {
		fallback: true,
	},
	server: {
		host: process.env.SERVE_HOST,
		port: process.env.SERVE_PORT,
	},
	/*
	** Headers of the page
	*/
	head: {
		titleTemplate: '%s - ' + process.env.APP_NAME,
		title: process.env.APP_NAME || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.APP_DESCRIPTION || '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},
	pwa: {
		manifest: {
			name: process.env.APP_NAME,
			description: process.env.APP_DESCRIPTION,
			start_url: "/login",
			display: "fullscreen",
			orientation: 'portrait',
			lang: 'es',
			background_color: "#fff",
			theme_color: "transparent",
			//serviceworker: {
			//	src: "/sw.js",
			//	update_via_cache: "none"
			//},
			/*related_applications: [{
			  platform: "play",
			  url: "https://play.google.com/store/apps/details?id=cheeaun.hackerweb"
			}],*/
		}
	},
	/*
	** Customize the progress-bar color
	*/
	loading: { color: '#fff' },
	/*
	** Global CSS
	*/
	css: [
		'~/assets/scss/_main.scss'
	],
	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		{
			ssr: false,
			src: '@/plugins/config'
		},
		{ src: '@/plugins/filters' },
		{ src: '@/plugins/moment' },
	],
	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
		'@nuxtjs/vuetify',
	],
	/*
	** Nuxt.js modules
	*/
	modules: [
		'@nuxtjs/auth',
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		'@nuxtjs/pwa',
		// Doc: https://github.com/nuxt-community/dotenv-module
		'@nuxtjs/dotenv',
	],
	/*
	** Axios module configuration
	** See https://axios.nuxtjs.org/options
	*/
	axios: {
		baseURL: process.env.API_URL,
		credentials: false
	},
	auth: {
		namespace: 'auth',
		strategies: {
			local: {
				endpoints: {
					login: { url: '/auth/users', method: 'post', propertyName: 'credentials.token' },
					user: { url: '/auth/users/me', method: 'post', propertyName: 'user' },
					logout: false
				}
			},
			tokenRequired: true,
			tokenType: false
		},
	},
	router: {
		middleware: [
			'auth',
			'guest'
		],
		linkActiveClass: 'active-link'
	},
	/*
	** vuetify module configuration
	** https://github.com/nuxt-community/vuetify-module
	*/
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
			dark: false,
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3
				}
			}
		}
	},
	/*
	** Build configuration
	*/
	build: {
		/*
		** You can extend webpack config here
		*/
		extend(config, ctx) {
		}
	}
}
