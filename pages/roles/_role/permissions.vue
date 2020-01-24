<template>
	<div>
        <v-toolbar
            flat 
            dense
            color="transparent">
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
            <v-toolbar-title class="body-1 font-weight-bold">
                {{ role.name }}
            </v-toolbar-title>
            <div class="flex-grow-1"></div>
        </v-toolbar>
        <v-container
            class="py-0"
            fluid>
            <v-row>
                <v-col
                    cols="12"
                    sm="12"
                    md="6"
                    lg="5">
                    <v-card
                        class="shadow-2">
                        <v-card-title>
                            <v-icon class="mr-2" color="info">mdi-information-outline</v-icon>
                            <span class="body-2 info--text">{{trans('details')}}</span>
                        </v-card-title>
                        <v-card-text
                            class="pt-0">
                            <List :item="role"/>
                            <p
                                v-if="permissions.actions && permissions.actions.length > 0"
                                class="mb-0">
                                <v-icon class="mr-2" color="black">mdi-shield-lock</v-icon>
                                <span class="body-2 font-weight-medium">{{trans('permissions')}}:</span>
                            </p>
                            <v-responsive
                                v-if="permissions.actions && permissions.actions.length > 0"
                                class="overflow-y-auto scrollbar-light-black thin"
                                max-height="125">
                                <v-chip-group
                                    column>
                                    <v-container grid-list-xs>
                                        <v-row justify="center" align="center">
                                            <v-chip
                                                dark
                                                v-for="(tag, key) in permissions.actions" 
                                                :key="key">
                                                {{ trans(tag) }}
                                            </v-chip>
                                        </v-row>
                                    </v-container>
                                </v-chip-group>
                            </v-responsive>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card>
                        <v-card-title
                            class="pb-0">
                            <v-icon class="mr-2" color="info">mdi-shield-lock</v-icon>
                            <span class="body-2 info--text">{{trans('roles_permissions')}}:</span>
                        </v-card-title>
                        <v-card-text>
                            <v-expansion-panels
                                focusable
                                hover
                                multiple>
                                <v-expansion-panel
                                    v-for="permission in menu.permissions"
                                    :key="permission.key">
                                    <v-expansion-panel-header>
                                        <p  class="mb-0">
                                            <v-icon color="black">{{  permission.icon  }}</v-icon>
                                            <span class="">{{    trans(permission.title)    }}</span>
                                        </p>
                                        <template v-slot:actions>
                                            <v-switch 
                                                class="checkbox-app"
                                                hide-details
                                                color="success"
                                                :key="permission.key"
                                                v-model="permissions.actions"  
                                                :value="permission.key">
                                            </v-switch>
                                        </template>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content
                                        class="pb-0">
                                        <v-row
                                            v-if="permission.actions">
                                            <v-col  
                                                v-for="option in permission.options"
                                                :key="option.key"
                                                cols="6"
                                                class="py-0">
                                                <v-checkbox
                                                    :disabled="(permissions.actions.includes(permission.key))?false:true"
                                                    class="checkbox-app"
                                                    hide-details
                                                    color="info"
                                                    :key="option.key"
                                                    v-model="permissions.actions"  
                                                    :value="option.key"
                                                    :label="trans(option.title)">
                                                </v-checkbox>
                                                <v-row
                                                    align="center"
                                                    justify="center">
                                                    <v-col
                                                        class="py-0"
                                                        cols="11">
                                                        <v-checkbox
                                                            v-model="permissions.actions"  
                                                            v-for="action in option.actions"
                                                            :key="action.key"
                                                            :disabled="(permissions.actions.includes(option.key))?false:true"
                                                            :value="action.key"
                                                            :label="trans(action.title)"
                                                            class="checkbox-app"
                                                            color="info"
                                                            hide-details>
                                                        </v-checkbox>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                        <v-row
                                            v-else
                                            align="center"
                                            justify="center">
                                            <v-col
                                                class="py-0"
                                                cols="12">
                                                <v-row>
                                                    <v-checkbox 
                                                        :disabled="(permissions.actions.includes(permission.key))?false:true"
                                                        class="checkbox-app"
                                                        hide-details
                                                        color="info"
                                                        v-model="permissions.actions" 
                                                        v-for="action in permission.options"
                                                        :key="action.key"
                                                        :value="action.key"
                                                        :label="trans(action.title)">
                                                    </v-checkbox>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                            <v-row
                                align="center"
                                justify="center">
                                <v-col 
                                    cols="6">
                                    <div class="text-center">
                                        <v-btn 
                                            :loading="waiting"
                                            :disabled="waiting"
                                            @click="update()"
                                            large 
                                            block
                                            rounded 
                                            class="shadow-2" 
                                            color="info">
                                            {{trans('save_changes')}}
                                        </v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-text>
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
<style lang="scss">
    .v-expansion-panel-header
    {
        min-height: auto!important;
        padding: 12px 12px!important;
    }
    .v-expansion-panel-content__wrap
    {
        padding: 5px 24px!important;
        
    }
    .v-expansion-panel 
    {
        margin-top: 0px!important;
    }
</style>
<script>
import Form from '@/components/forms/universal/Role';
import List from '@/components/lists/Role';
import { mapState } from 'vuex';
export default {
    components:{
        List,
		Form
    },
    validate ({ params, store }) 
    {
        if(!store.$auth.user.access.includes(`roles_permissions`))
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
            permissions:{
                index:[],
                actions:[]
            },
			role:{}
		}
    },
    computed:{
		...mapState({
			menu: 'menu'
		})
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
				+   '/roles/'
                +   id
                +   '/permissions'
			)
			.then((data) =>
			{
                this.role = data.role;
                this.permissions.actions = data.permissions;
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
			this.$axios.$post( `${this.$store.getters['translate/selectLang']['lang']}-${this.$store.getters['translate/selectLang']['country']}`
				+   '/roles/'
                +   this.$route.params.role
                +   '/permissions',
				{
                    permissions: this.permissions.actions
                }
			)
			.then((data) =>
			{
				this.role = data.role;
                this.permissions.actions = data.permissions;
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