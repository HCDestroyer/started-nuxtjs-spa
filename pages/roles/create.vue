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
							{{trans('create')}} {{ new String(trans('role')).toLowerCase() }}
						</v-toolbar-title>
						<div class="flex-grow-1"></div>
					</v-toolbar>
					<v-form @submit.prevent="save" autocomplete="off">
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
import Form from '@/components/forms/universal/Role';
export default {
	components:{
		Form
    },
    auth:true,
    middleware:'auth',
    layout:'dashboard',
    validate ({ store }) 
    {
        if(!store.$auth.user.access.includes(`roles_create`))
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
            title: this.trans('roles')
        }
    },
    data(){
        return{
            role:{}
        }
    },
    created()
    {
        this.setMenu();
        
    },
    methods: {
        setMenu()
        {
            this.$store.commit('menu/change_name','roles');
            this.$store.commit('menu/change_title','add');
            this.$store.commit('menu/change_toolbar', {
                status: true,
                buttons:[
                    {
                        key: 'roles_index',
                        icon: 'mdi-clipboard-text-outline',
                        text:'list',
                        link: {
                            name:'roles'
                        }
                    },
                    {
                        key:'roles_create',
                        icon: 'mdi-plus-circle-outline',
                        text:'add',
                        link: {
                            name:'roles-create'
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
                +'/roles',
                this.role
            )
            .then((data) =>
            {
                this.role = Object.assign({},{});
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