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
                <v-alert
                    icon="mdi-shield-lock-outline"
                    prominent
                    text
                    dense
                    dismissible
                    type="info">
                    {{password.text}}
                </v-alert>
				<v-card
					class="shadow-2">
					<v-toolbar
						flat 
						dense>
						<v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    v-on="on"
                                    :to="{name:'users'}"  
                                    icon
                                    exact
                                    color="indigo">
                                    <v-icon>mdi-chevron-left</v-icon>
                                </v-btn>
                            </template>
                            <span>{{    trans('return')    }}</span>
                        </v-tooltip>
						<v-toolbar-title class="subtitle-1 font-weight-bold">
							{{trans('create')}} {{ new String(trans('user')).toLowerCase() }}
						</v-toolbar-title>
						<div class="flex-grow-1"></div>
					</v-toolbar>
					<v-form @submit.prevent="save" autocomplete="off">
						<v-container
							class="py-0" 
							grid-list-md>
							<Form v-model="user" :required_value="required" outlined clearable persistentHint autoGrow/>
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
											color="success"  
											type="submit">
											{{trans('save')}}
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
import Form from '@/components/forms/universal/User';
export default {
	components:{
		Form
    },
    auth:true,
    middleware:'auth',
    layout:'dashboard',
    validate ({ store }) 
    {
        if(!store.$auth.user.access.includes(`users_create`))
        {
            return new Promise((resolve, reject) => {
                reject({
                    statusCode: 403,
                    message:'forbidden_access'
                });
            });
        }
        return true;
    },
    head(){
        return{
            title: this.trans('users')
        }
    },
    data(){
        return{
            password:{
                text: this.trans('started_password')
            },
            user:{}
        }
    },
    created()
    {
        this.setMenu();
        
    },
    methods: {
        setMenu()
        {
            this.$store.commit('menu/change_name','users');
            this.$store.commit('menu/change_title','add');
            this.$store.commit('menu/change_toolbar', {
                status: true,
                buttons:[
                    {
                        key: 'users_index',
                        icon: 'mdi-clipboard-text-outline',
                        text:'list',
                        link: {
                            name:'users'
                        }
                    },
                    {
                        key:'users_create',
                        icon: 'mdi-plus-circle-outline',
                        text:'add',
                        link: {
                            name:'users-create'
                        }
                    },
                ]
            });
        },
        save()
        {
            this.waiting = true;
            this.required = Object.assign({},{});
            this.$axios.$post( `${this.$store.getters['translate/selectLang']['lang']}-${this.$store.getters['translate/selectLang']['country']}`
                +'/users',
                this.user
            )
            .then((data) =>
            {
                this.user = Object.assign({},{});
                this.pushMessage(data.message.text,'success');
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