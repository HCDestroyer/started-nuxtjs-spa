<template>	
	<v-container
        class="pt-0 pb-0 h-100"
        fluid>
        <v-row
			class="h-100"
          	align="center"
          	justify="center">
        	<v-col
        	    cols="12"
        	    sm="12"
        	    md="4"
				lg="3"
				class="bg-per h-100 py-0 shadow-3">
				<v-row
					class="h-100 white-cover"
					align="center"
					justify="center">
					<v-col 
						cols="12"
						class="p-0">
						<div class="text-center">
							<v-avatar
								color="transparent"
								size="175"
								tile>
								<img class="img-fluid" src="/imgs/app/logo/wservices.png" :alt="app_name">
							</v-avatar>
						</div>
						<div class="text-center">
							<h2 class="font-weight-black menu-title">
								{{ app_name }}
							</h2>
							<v-alert
								v-if="message.status"
								:type="mode_message.error?'error':'success'"
								text
								dense>
								{{ mode_message.error ? message.error : message.success }}
							</v-alert>
						</div>	
						<v-form autocomplete="off" @submit.prevent="login">
							<v-col cols="12">
								<v-text-field
									type="email"
									v-model="user.email"
									:label="trans('email')"
									:error="!!required.email"
									:hint="(required.email)? required.email:''"
                					:hide-details="(required.email)?false:true"
									persistent-hint
									filled
									rounded
									autofocus
								></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-text-field
									v-model="user.password"
									:append-icon="show1 ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
									:type="show1 ? 'text' : 'password'"
									@click:append="show1 = !show1"
									:label="trans('password')"
									:error="!!required.password"
									:hint="(required.password)? required.password:''"
                					:hide-details="(required.password)?false:true"
									persistent-hint
									filled
									rounded
								></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-btn 
									:loading="waiting"
									rounded
									block 
									large 
									class="pulse-3" 
									color="primary" 
									dark
									type="submit">
									{{ trans('log_in') }}
								</v-btn>
							</v-col>
						</v-form>
					</v-col>	
				</v-row>
        	</v-col>
			<v-col
				v-if="$vuetify.breakpoint.mdAndUp"
        	    cols="12"
        	    sm="12"
        	    md="8"
				lg="9"
                class="">
				<LoginCarosel/>
        	</v-col>
        </v-row>
		<v-snackbar
            v-model="snackbar.status"
            :color="snackbar.type"
            :timeout="snackbar.time"
            multi-line>
            {{ snackbar.text }}
            <v-btn
                icon
                @click="snackbar.status = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-snackbar>      
	</v-container>
</template>
<script>
import LoginCarosel from '@/components/carousel/Login';
export default
{
    layout:'default',
    middleware:'guest',
	components:{
		LoginCarosel
	},
	data()
	{
	 	return {
			message:{
				status:false,
				error: this.trans('log_in_error'),
				success: this.trans('welcome'),
			},	 
			show1: false,
			user:{
				email: "",
				password: "",
			},
			mode_message:{
				error:false,
				success:false,
			},
	 	}
	},
	methods: {
		login()
		{
			this.required = {};
			this.waiting = true;
			this.message.status = false;
			this.mode_message.success = false;
			this.mode_message.error = false;
			this.$auth.loginWith('local', {
				data: this.user
			})
			.then(() =>
			{
				this.$router.push({
					name: 'index'
				});
			})
			.catch((error) => 
			{
				if(error.response)
				{
					var res = error.response;
					switch (res.status) 
					{
						case 400:
							this.required = res.data.required;
							break;
						case 401:
							this.message.status = true;
							console.log(res);
							
							this.message.error = res.data.message.text;
							this.mode_message.error = true; 
							break;
					}
				}
				else
				{
					this.pushMessage(this.trans('check_connection_server'),'error');
				}	
			})
			.finally((fn) => 
			{
				this.waiting = false;
			});
		},

	},
};
</script>