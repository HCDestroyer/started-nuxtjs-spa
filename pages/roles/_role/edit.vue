<template>
	<v-container
		fluid>
		<v-row
		  	align="center"
		  	justify="center">
			<v-col
				cols="12"
				sm="12"
				md="6"
				lg="5">
				<v-card
					class="shadow-2">
					<v-toolbar
						flat 
						dense>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn
									v-on="on"
									:to="{name:'roles'}"  
									icon
									exact
									color="indigo">
									<v-icon>mdi-chevron-left</v-icon>
								</v-btn>
							</template>
							<span>{{    trans('return')    }}</span>
						</v-tooltip>
						<v-toolbar-title class="subtitle-1 font-weight-bold">
							{{trans('edit')}} {{ new String(trans('role')).toLowerCase() }}
						</v-toolbar-title>
						<div class="flex-grow-1"></div>
					</v-toolbar>
					<v-form @submit.prevent="update">
						<v-container
							class="py-0" 
							grid-list-md>
							<Form v-model="role" :required_value="required" outlined clearable persistentHint autoGrow/>
							<v-row
								align="center"
								justify="center">
								<v-col 
									cols="6">
									<div class="text-center">
										<v-btn 
											:loading="waiting"
											:disabled="waiting"
											large 
											block
											rounded 
											class="shadow-2" 
											color="info"  
											type="submit">
											{{trans('update')}}
										</v-btn>
									</div>
								</v-col>
							</v-row>
						</v-container>
					</v-form>
				</v-card>
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
import Form from '@/components/forms/universal/Role';
export default {
	components:{
		Form
    },
    validate ({ params, store }) 
    {
        if(!store.$auth.user.access.includes(`roles_edit`))
        {
            return new Promise((resolve, reject) => {
                reject({
                    statusCode: 403,
                    message:'forbidden_access'
                });
            });
        }
        return /^\d+$/.test(params.role);
    },
	data(){
		return{
			role:{}
		}
	},
	created()
	{
		this.show(this.$route.params.role)
	},
	methods: {
		show(id)
		{
			this.waiting = true;
			this.$axios.$get( `${this.$store.getters['translate/selectLang']['lang']}-${this.$store.getters['translate/selectLang']['country']}`
				+'/roles/'
				+id
			)
			.then((data) =>
			{
				this.role = data.role;
			})
			.catch((error)=>
			{
				if(error.response)
				{
					let res = error.response;
					switch (res.status) 
					{
						case 404: 
							this.pushMessage(res.data.message.text,'error');
							setTimeout(() => {
								this.$router.push({name:'roles'});
							}, this.snackbar.time);                    
							break;
					}
				}
                if(this.app_debug)
                {
                    console.warn(error);
                }
			})
			.finally((fn)=>
			{
				this.waiting = false;
			});
		},
        update()	
        {
			this.waiting = true;
            this.required = Object.assign({},{});
			this.$axios.$put( `${this.$store.getters['translate/selectLang']['lang']}-${this.$store.getters['translate/selectLang']['country']}`
				+'/roles/'
				+this.$route.params.role,
				this.role
			)
			.then((data) =>
			{
				this.role = data.role;
				this.pushMessage(data.message.text,'info');
			})
			.catch((error)=>
			{
				if(error.response)
				{
					let res = error.response;
					switch (res.status) 
					{
						case 400: 
                            this.required = res.data.required;                        
                            break;
					}
				}
				if(this.app_debug)
                {
                    console.warn(error);
                }
			})
			.finally((fn)=>
			{
				this.waiting = false;
			});
		}
	},
}
</script>