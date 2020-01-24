<template>
	<v-container 
		class="fill-height"
		fluid
		grid-list-sm>
		<v-row
			v-if="error && error.statusCode === 403"
			align="center"
			justify="center">
			<v-col 
				cols="12" 
				md="4"
				class="text-center">
				<v-card
					class="heavy-rain-gradient">
					<v-img
						width="400px"
						src="/imgs/icons/clip/bad-gateaway.png">
					</v-img>
					<v-card-text
						class="text-center">
						<p class="headline">
							{{
								trans('forbidden_access')
							}}
						</p>
						<v-btn
							rounded
							class="subtitle-1"
							@click="home" 
							color="info">
							{{
								trans('return_home')
							}}
						</v-btn>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<v-row
			v-else-if="error && error.statusCode === 404"
			align="center"
			justify="center">
			<v-col 
				cols="12" 
				md="4"
				class="text-center">
				<v-card
					class="heavy-rain-gradient">
					<v-img
						width="400px"
						src="/imgs/icons/clip/page-not-found.png">
					</v-img>
					<v-card-text
						class="text-center">
						<p class="headline">
							{{
								trans('not_found')
							}}
						</p>
						<v-btn
							
							rounded
							class="subtitle-1"
							@click="home" 
							color="info">
							{{
								trans('return_home')
							}}
						</v-btn>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<v-row
			v-else
			align="center"
			justify="center">
			<v-col 
				cols="12" 
				md="4">
				<v-card
					class="heavy-rain-gradient">
					<v-img
						width="400px"
						src="/imgs/icons/clip/fatal-error.png"
						class="black--text">
					</v-img>
					<v-card-text
						class="text-center">
						<p class="headline">
							{{
								trans('have_barricade')
							}}
						</p>
						<v-btn
							
							rounded
							class="subtitle-1"
							@click="tryAgain" 
							color="info">
							{{
								trans('please_try_again')
							}}
						</v-btn>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
export default {
	props: {
		error: {
			type: Object,
			default: null
		}
	},
	head () {
		const title =
			this.error.statusCode === 404 ? this.pageNotFound : this.otherError
		return {
			title
		}
	},
	data () {
		return {
			pageNotFound: '404 No encontrado',
			otherError: 'Ocurrió un error'
		}
	},
	methods: {
		tryAgain()
		{
			this.$router.go({ path:'/', force: true})
		},
		home()
		{
			this.$router.push('/');
		}
	},
}
</script>

<style scoped>
h1 {
	font-size: 20px;
}
</style>
