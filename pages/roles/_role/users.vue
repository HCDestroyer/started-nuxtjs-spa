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
                    md="8"
                    lg="7">
                    <v-row>
                        <v-col
                            cols="12"
                            class="py-0">
                            <v-toolbar
                                flat 
                                dense
                                color="rgba(199, 201, 202, 0.25)">
                                <v-icon class="mr-2" color="info">mdi-security</v-icon>
                                <v-toolbar-title class="body-2 info--text">
                                    {{ trans('select') }} {{ new String(trans('users')).toLowerCase() }}
                                </v-toolbar-title>
                            </v-toolbar>
                        </v-col>
                        <v-col
                            cols="12">
                            <v-card>
                                <v-card-title
                                    class="px-0 pb-0">
                                    <v-toolbar 
                                        color="transparent"
                                        flat>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn
                                                    color="black"
                                                    dark
                                                    icon
                                                    v-on="on"
                                                    @click="dialog.search = true">
                                                    <v-icon>mdi-filter-menu-outline</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>{{    trans('search_filter')    }}</span>
                                        </v-tooltip>
                                        <v-text-field
                                            v-model="query_value"
                                            :label="`${trans('search')} ${trans('user').toLowerCase()}`"
                                            @keyup="getUsers()"
                                            type="search"
                                            autocomplete="off"
                                            filled
                                            rounded
                                            dense
                                            hide-details
                                            clearable
                                        ></v-text-field>
                                    </v-toolbar>
                                </v-card-title>
                                <v-card-text
                                    class="py-0">
                                    <v-data-table
                                        v-model="users.selecteds"
                                        :loading="waiting"
                                        :headers="headers"
                                        :items="users.list | reverse"
                                        :options.sync="options"
                                        :server-items-length="users.total"
                                        :search="query_value"
                                        item-key="id"
                                        :show-expand="false"
                                        show-select
                                        single-expand
                                        :no-results-text="trans('not_results')">
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="info" :value="isSelected" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                                <v-card-text
                                    class="py-0">
                                    <v-row
                                        align="center"
                                        justify="center">
                                        <v-col>
                                            <span
                                                class="caption black--text">
                                                {{ trans('users') }} {{ new String(trans('selecteds')).toLowerCase() }}:
                                                {{  users.selecteds.length  }}
                                            </span>
                                        </v-col>
                                        <v-fade-transition>
                                            <v-col
                                                v-if="users.selecteds.length > 0">
                                                <div class="text-center">
                                                    <v-btn 
                                                        :loading="waiting"
                                                        :disabled="waiting"
                                                        @click="update()"
                                                        block
                                                        rounded 
                                                        class="shadow-2" 
                                                        color="info">
                                                        {{trans('save_changes')}}
                                                    </v-btn>
                                                </div>
                                            </v-col>
                                        </v-fade-transition>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>   
                    </v-row>
                </v-col>
                <v-col
                    cols="12"
                    sm="12"
                    md="4"
                    lg="5">
                    <v-row>
                        <v-col
                            cols="12"
                            class="pt-0">
                            <v-card>
                                <v-card-title>
                                    <v-icon class="mr-2" color="info">mdi-information-outline</v-icon>
                                    <span class="body-2 info--text">{{trans('details')}}</span>
                                </v-card-title>
                                <v-card-text
                                    class="pt-0">
                                    <List :item="role"/>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col
                            cols="12"
                            class="py-0">
                            <v-toolbar
                                flat 
                                dense
                                color="rgba(199, 201, 202, 0.25)">
                                <v-icon class="mr-2" color="info">mdi-security</v-icon>
                                <v-toolbar-title class="body-2 info--text">
                                    {{ trans('users') }} {{ new String(trans('selecteds')).toLowerCase() }}
                                </v-toolbar-title>
                            </v-toolbar>
                        </v-col>
                        <v-col
                            cols="12"
                            class="py-0">
                            <v-responsive
                                class="overflow-y-auto scrollbar-light-black thin"
                                max-height="500">
                                <v-container 
                                    class="py-0"
                                    grid-list-xs>
                                    <v-slide-y-transition
                                        class="align-center justify-center"
                                        group
                                        tag="v-row">
                                        <v-col
                                            cols="12"
                                            md="6"
                                            v-for="rol in users.selecteds"
                                            :key="rol.id">
                                            <v-card>
                                                <v-toolbar
                                                    color="transparent"
                                                    flat 
                                                    dense>
                                                    <v-icon 
                                                        color="black"
                                                        class="pr-2">mdi-information-variant</v-icon>
                                                    <v-toolbar-title 
                                                        class="subtitle-2">
                                                        <p class="mb-0">
                                                            {{rol.fname}} {{rol.lname}}
                                                        </p>
                                                    </v-toolbar-title>
                                                </v-toolbar>
                                                <v-card-text
                                                    class="py-0">
                                                    <ListUser :item="rol"/>
                                                </v-card-text>
                                            </v-card>
                                        </v-col>
                                    </v-slide-y-transition>
                                </v-container>
                            </v-responsive>
                        </v-col>
                    </v-row>
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
        <v-row justify="center">
            <v-dialog v-model="dialog.search" persistent max-width="600">
                <v-card>
                    <v-card-title
                        class="subtitle-2">
                        {{ trans('select_search_filter') }}:
                    </v-card-title>
                    <v-card-text
                        class="text-center py-0">
                        <div class="d-flex">
                            <v-spacer></v-spacer>
                            <v-radio-group
                                class="p-0 m-0"
                                v-model="query_key"
                                :error="!!required.query_key"
                                :hint="(required.query_key)? required.query_key:''"
                                :hide-details="(required.query_key)?false:true"
                                persistent-hint
                                row>
                                <v-radio 
                                    v-for="(role,key) in search_options" 
                                    :key="key" 
                                    :label="role.text" 
                                    :value="role.key"
                                    color="indigo">
                                </v-radio>
                            </v-radio-group>
                            <v-spacer></v-spacer>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <div class="grow"></div>
                        <v-btn rounded color="success" text @click="dialog.search = false">
                            {{trans('accept')}}
                        </v-btn>
                        <div class="grow"></div>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
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
import List from '@/components/lists/Role';
import ListUser from '@/components/lists/User';
import { mapState } from 'vuex';
export default {
    components:{
        List,
        ListUser
    },
    validate ({ params, store }) 
    {
        if(!store.$auth.user.access.includes(`roles_users`))
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
            role:{},
            query_key:'name',
            expanded:[],
            users:{
                list:[],
                total: 0, 
                selecteds:[],
            },
            options:{},
		}
    },
    mounted() {
        this.getUsers();
    },
    watch: {
        options: {
            handler () {
                this.getUsers();
            },
            deep: true,
        },
    },
    computed: {
        headers()
        {
            return [
                {
                    text: this.trans('card_id'), 
                    align: 'left',
                    sortable: true,
                    value: 'card_id' 
                },
                { 
                    text: this.trans('fname'), 
                    align: 'left',
                    sortable: true,
                    value: 'fname' 
                },
                { 
                    text: this.trans('lname'), 
                    align: 'left',
                    sortable: true,
                    value: 'lname' 
                },
                {
                    text: this.trans('email'), 
                    align: 'left',
                    sortable: true,
                    value: 'email' 
                },
            ];
        },
        search_options()
        {
            let options = [];
            this.headers.map((header)=>
            {
                if(header.sortable)
                {
                    let option = Object.assign({},{
                        text: header.text,
                        key: header.value,
                    });
                    options.push(option);
                }
            });
            let option = Object.assign({},{
                text: this.trans('name_complete'),
                key: 'name',
            });
            options.push(option);
            return options;
        }
    },
	created()
	{
		this.show(this.$route.params.role)
	},
    methods: 
    {
        getUsers()
        {
            this.waiting = true;
            this.$axios.$get( `${this.$store.getters['translate/selectLang']['lang']}-${this.$store.getters['translate/selectLang']['country']}`
            +'/users'
            +'?per_page='+      this.options.itemsPerPage
            +'&page='+          this.options.page
            +'&query_key='+     this.query_key
            +'&query_value='+   this.query_value)
            .then((data) =>  
            {
                const { sortBy, sortDesc, page, itemsPerPage } = this.options;
                this.users.list = data.users.data;
                this.users.total = data.users.total;
            })
            .catch((error) =>  
            {
                this.waiting = false; 
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
		show(id)
		{
			this.waiting = true;
			this.$axios.$get( `${this.$store.getters['translate/selectLang']['lang']}-${this.$store.getters['translate/selectLang']['country']}`
				+   '/roles/'
                +   id
                +   '/users'
			)
			.then((data) =>
			{
                this.role = data.role;
                this.users.selecteds = data.users;
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
            let usersID = [];
            this.users.selecteds.map((selected)=>{
                usersID.push(selected.id);
            });
			this.waiting = true;
            this.required = Object.assign({},{});
			this.$axios.$post( `${this.$store.getters['translate/selectLang']['lang']}-${this.$store.getters['translate/selectLang']['country']}`
				+   '/roles/'
                +   this.$route.params.role
                +   '/users',
				{
                    users: usersID,
                }
			)
			.then((data) =>
			{
				this.role = data.role;
                this.users.selecteds = data.users;
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
                            if(this.required.users)
                            {
                                this.pushMessage(this.trans('users')+':\t'+this.required.users,'error');
                            }            
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