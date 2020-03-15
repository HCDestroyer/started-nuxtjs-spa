<template>
    <div>      
        <v-container
            class="fill-height"
            fluid
            grid-list-md>
            <v-row
                align="center"
                justify="center">
                <v-col  
                    v-if="waiting"
                    cols="12"
                    sm="12"
                    md="4"
                    lg="3">
                    <v-skeleton-loader
                        type="list-item-three-line"
                        class="mx-auto"
                    ></v-skeleton-loader>
                </v-col>
                <v-col  
                    v-if="!waiting"
                    cols="12"
                    sm="12"
                    md="4"
                    lg="3">
                    <v-card>
                        <v-card-text>
                            <div class="text-center">
                                <img  
                                    :src="(configs.logo) ? app_asset + configs.logo :'/icon.png'"
                                    :alt="configs.name" 
                                    height="150">
                            </div>
                            <div class="d-flex" v-if="!change_avatar">
                                <div class="grow"></div>
                                <v-btn
                                    icon
                                    rounded
                                    @click="change_avatar=true" 
                                    color="info" dark>
                                    <v-icon>mdi-camera-retake-outline</v-icon>
                                </v-btn>
                                <div class="grow"></div>
                            </div>
                            <div class="text-center" v-if="change_avatar">
                                <v-file-input
                                    v-model="logo"
                                    accept="image/png, image/jpeg, image/bmp"
                                    :placeholder="trans('select_logo')"
                                    prepend-icon="mdi-camera-outline"
                                ></v-file-input>
                                <v-btn text 
                                    rounded color="primary" @click="changeLogo">
                                    {{trans('change_avatar')}}
                                </v-btn>
                                <div class="grow"></div>
                                <v-btn 
                                    @click="change_avatar=false"
                                    text 
                                    rounded
                                    color="secondary" dark>
                                    {{trans('cancel')}}
                                </v-btn>
                            </div>
                            <h3>
                                {{configs.name}}
                            </h3>   
                            <List :item="configs" class="py-2" set_color="indigo"/>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col  
                    v-if="$auth.user.access.includes(`app_configs_edit`)"
                    cols="12"
                    sm="12"
                    md="7"
                    lg="8">
                    <v-card
                        :loading="waiting"
                        class="shadow-2">
                        <v-toolbar
                            flat 
                            dense>
                            <v-toolbar-title class="subtitle-1 font-weight-bold">
                                {{trans('edit')}} {{ new String(trans('configs')).toLowerCase() }}
                            </v-toolbar-title>
                            <div class="flex-grow-1"></div>
                        </v-toolbar>
                        <v-form @submit.prevent="update">
                            <v-container
                                class="py-0" 
                                grid-list-md>
                                <Form v-model="configs" :required_value="required" outlined clearable persistentHint autoGrow/>
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
        </v-container>
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
    </div>
</template>
<script>
import List from '@/components/lists/Config';
import Form from '@/components/forms/universal/Config';
export default {
    components:{
        List,
        Form
    },
    auth:true,
    middleware:'auth',
    layout:'dashboard',
    validate ({ store }) 
    {
        if(!store.$auth.user.access.includes(`app_configs`))
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
            title: this.trans('configs')
        }
    },
    data()
    {
        return {
            query_key:'config',
            expanded:[],
            configs:{},
            change_avatar:false,
            logo:null,
        }
    },
    mounted() {
        this.getConfigs();
    },
    watch: {
        options: {
            handler () {
                this.getConfigs();
            },
            deep: true,
        },
    },
    created() {
        this.setMenu();
    },
    methods: {
        setMenu()
        {
            this.$store.commit('menu/change_name','config');
            this.$store.commit('menu/change_title','configs');
            this.$store.commit('menu/change_toolbar', {
                status: false,
                buttons:[]
            });
        },
        editRole(role)
        {
            this.$router.push({
                name:'configs-edit',
            });
        },
        getConfigs()
        {
            this.waiting = true;
            this.$axios.$get( `${this.$store.getters['translate/selectLang']['lang']}-${this.$store.getters['translate/selectLang']['country']}`
            +   '/configs')
            .then((data) =>  
            {
                this.configs = data.configs;
                this.configs.logo = data.configs.logo+'?v='+new Date();
            })
            .catch((error) =>  
            {
                if(this.app_debug)
                {
                    console.warn(error);
                }
            })
            .finally((fn)=>{
                setTimeout(() => {
                this.waiting= false; 
                }, this.time);
            });
        },
        changeLogo()
        {
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };
            const formData = new FormData();
            formData.append('avatar', this.logo);
            this.$axios.$post(`${this.$store.getters['translate/selectLang']['lang']}-${this.$store.getters['translate/selectLang']['country']}`
            +   '/configs'
            +   '/change-avatar' ,
                formData,
                config
            )
            .then((data) => 
            {
                this.change_avatar = false;
                this.logo = null;
                this.pushMessage(data.message.text,'success');
                this.getConfigs();
            })
            .catch((error) => 
            {
                if(error.response)
                {
                    let res = error.response;
                    switch (res.status) 
                    {
                        case 400: 
                            if(res.data.required)
                            {
                                this.required_value = res.data.required; 
                            }
                            else
                            {
                                this.pushMessage(res.data.message.text,'info');
                            }
                            break;
                    }
                }
                if(this.app_debug)
                {
                    console.warn(error);
                }
            });
        },
        update()	
        {
			this.waiting = true;
            this.required = Object.assign({},{});
			this.$axios.$put( `${this.$store.getters['translate/selectLang']['lang']}-${this.$store.getters['translate/selectLang']['country']}`
				+   '/configs/',
				this.configs
			)
			.then((data) =>
			{
				this.configs = data.configs;
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