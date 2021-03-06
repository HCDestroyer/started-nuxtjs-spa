<template>
    <div>
        <v-toolbar 
            class="mt-2"
            flat
            dense
            color="transparent">
            <v-menu top :close-on-click="true">
                <template v-slot:activator="{ on }">
                    <v-btn
                        color="black"
                        dark
                        v-on="on"
                        icon>
                        <v-icon>mdi-view-list</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item-group v-model="display_info.selected" color="primary">
                        <v-list-item
                            key="display_card"
                            @click="displayInfoCard">
                            <v-list-item-icon>
                                <v-icon>mdi-card-bulleted-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>{{ trans('card') }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                            color="primary"
                            key="display_list"
                            @click="displayInfoList">
                            <v-list-item-icon>
                                <v-icon>mdi-format-list-bulleted-square</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>{{ trans('list') }}</v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-menu>
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
        <div v-if="display_info.list">
            <v-container
                fluid
                grid-list-xs>
                <v-card>
                    <v-card-text>
                        <v-data-table
                            :loading="waiting"
                            :headers="headers"
                            :items="user.list | reverse"
                            :options.sync="options"
                            :server-items-length="user.total"
                            :search="query_value"
                            item-key="id"
                            :show-expand="true"
                            single-expand
                            :no-results-text="trans('not_results')">
                            <template v-slot:expanded-item="{ headers, item }">
                                <td :colspan="headers.length">
                                    <v-row
                                        justify="center"
                                        align="center">
                                        <v-col cols="12">
                                            <List :item="item"/>
                                        </v-col>
                                    </v-row>
                                </td>
                            </template>
                            <template v-slot:item.action="{ item }">
                                <v-row
                                    align="center"
                                    justify="center">
                                    <v-col
                                        v-show="$auth.user.access.includes(`users_edit`)"
                                        class="p-0">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn
                                                    @click="editUser(item.id)"
                                                    v-on="on"
                                                    color="info" 
                                                    dark
                                                    icon>
                                                    <v-icon>mdi-pencil</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>{{    trans('edit')    }}</span>
                                        </v-tooltip>
                                    </v-col>
                                    <v-col
                                        v-show="$auth.user.access.includes(`users_delete`)"
                                        class="p-0">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn 
                                                    @click="trashUser(item.id)"
                                                    v-on="on"
                                                    color="error" 
                                                    dark
                                                    icon>
                                                    <v-icon>mdi-delete-outline</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>{{    trans('delete')    }}</span>
                                        </v-tooltip>
                                    </v-col>
                                    <v-col
                                        v-show="$auth.user.access.includes(`users_roles`)"
                                        class="p-0">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn 
                                                    @click="userRoles(item.id)"
                                                    color="indigo"
                                                    icon 
                                                    dark
                                                    v-on="on">
                                                    <v-icon>mdi-security</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>
                                                {{ trans('roles') }}
                                            </span>
                                        </v-tooltip>
                                    </v-col>
                                    <v-col
                                        v-show="$auth.user.access.includes(`users_edit`)"
                                        class="p-0">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-switch
                                                    class="checkbox-app"
                                                    @change="toggleStatus(item)"
                                                    :input-value="(item.status=='desactive')?false:true"
                                                    dense
                                                    inset
                                                    hide-details
                                                    v-on="on">
                                                </v-switch>
                                            </template>
                                            <span>
                                                {{
                                                    (item.status=='desactive') ?
                                                        trans('enabled')
                                                    : trans('disabled')
                                                }}
                                            </span>
                                        </v-tooltip>
                                    </v-col>
                                </v-row>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-container>
        </div>
        <div v-if="display_info.card">
            <v-container
                v-show="waiting" 
                class="fill-height pt-0"
                fluid
                grid-list-md>
                <v-row
                    align="center"
                    justify="center">
                    <v-col  
                        cols="12"
                        sm="12"
                        md="4"
                        lg="3"
                        v-for="i in 8"
                        :key="i">
                        <v-skeleton-loader
                            type="card"
                            class="mx-auto"
                        ></v-skeleton-loader>
                    </v-col>
                </v-row>
            </v-container>
            <v-container
                v-show="!waiting"
                fluid
                grid-list-xs>
                <v-data-iterator
                    :items="user.list | reverse"
                    :options.sync="options"
                    :server-items-length="user.total"
                    :search="query_value"
                    item-key="id"
                    single-expand
                    :no-results-text="trans('not_results')">
                    <template v-slot:default="{ items }">
                        <v-row
                            align="center"
                            justify="center">
                            <v-col
                                v-for="(item,key) in items"
                                :key="key"
                                cols="12"
                                sm="6"
                                md="4"
                                lg="3">
                                <v-hover
                                    v-slot:default="{ hover }">
                                    <v-card
                                        :class="[{'shadow-1':!hover},{'shadow-3':hover}]">
                                        <v-img 
                                            class="align-end"
                                            gradient="to bottom, rgba(94, 113, 136, 0.75), rgba(62, 75, 91, 0.75)"
                                            contain 
                                            height="200px" 
                                            :src="app_asset+item.src">
                                            <v-toolbar
                                                color="rgba(62, 75, 91, 0.30)"
                                                flat 
                                                dense>
                                                <v-icon 
                                                    color="white"
                                                    class="pr-2">mdi-clipboard-account-outline</v-icon>
                                                <v-toolbar-title 
                                                    class="subtitle-2 white--text">
                                                    <p class="mb-0">
                                                        {{item.fname}} {{item.lname}}
                                                    </p>
                                                </v-toolbar-title>
                                                <div class="grow"></div>
                                                <v-menu 
                                                    bottom 
                                                    left>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn
                                                            color="white"
                                                            icon
                                                            v-on="on">
                                                            <v-icon>mdi-dots-vertical</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <v-list
                                                        dense>
                                                        <v-list-item
                                                            v-show="$auth.user.access.includes(`users_edit`)"
                                                            @click="editUser(item.id)">
                                                            <v-list-item-icon>
                                                                <v-icon color="info">mdi-pencil</v-icon>
                                                            </v-list-item-icon>
                                                            <v-list-item-content>
                                                                <v-list-item-title>{{ trans('edit') }}</v-list-item-title>
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                        <v-list-item
                                                            v-show="$auth.user.access.includes(`users_delete`)"
                                                            @click="trashUser(item.id)">
                                                            <v-list-item-icon>
                                                                <v-icon color="error">mdi-delete-outline</v-icon>
                                                            </v-list-item-icon>
                                                            <v-list-item-content>
                                                                <v-list-item-title>{{ trans('delete') }}</v-list-item-title>
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                    </v-list>
                                                </v-menu>
                                            </v-toolbar>
                                        </v-img>
                                        <v-card-text
                                            class="py-0">
                                            <List :item="item"/>
                                            <v-list-item
                                                v-show="$auth.user.access.includes(`users_edit`)"
                                                class="p-0">
                                                <v-list-item-action>
                                                    <v-switch
                                                        @change="toggleStatus(item)"
                                                        value 
                                                        :input-value="(item.status=='desactive')?false:true"
                                                        hide-details>
                                                    </v-switch>
                                                </v-list-item-action>
                                               <v-list-item-content class="py-0">
                                                    <v-list-item-title>
                                                    {{
                                                        (item.status=='desactive') ?
                                                            trans('enabled')
                                                        : trans('disabled')
                                                    }}
                                                </v-list-item-title>
                                                <v-list-item-subtitle>{{ trans('action') }}</v-list-item-subtitle>
                                               </v-list-item-content>
                                            </v-list-item>
                                        </v-card-text>
                                        <v-card-text
                                            class="py-0">
                                            <v-row
                                                align="center"
                                                justify="center">
                                                <v-col
                                                    v-show="$auth.user.access.includes(`users_roles`)">
                                                    <v-btn 
                                                        @click="userRoles(item.id)"
                                                        color="indigo"
                                                        block
                                                        rounded
                                                        text 
                                                        dark>
                                                        <v-icon>mdi-security</v-icon>
                                                        {{trans('roles')}}
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-hover>
                            </v-col>
                        </v-row>
                    </template>
                    <template v-slot:no-data>
                        <v-row
                            align="center"
                            justify="center">
                            <v-col 
                                cols="10" 
                                md="10">
                                <v-card>
                                    <v-skeleton-loader
                                        boilerplate
                                        flat
                                        ref="skeleton"
                                        type="image"
                                        class="mx-auto">
                                    </v-skeleton-loader>
                                    <v-card-title
                                        class="text-center">
                                        {{trans('not_data')}}
                                    </v-card-title>
                                </v-card>
                            </v-col>
                        </v-row>
                    </template>
                </v-data-iterator>
            </v-container>
        </div>
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
                                    v-for="(user,key) in search_options" 
                                    :key="key" 
                                    :label="user.text" 
                                    :value="user.key"
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
            <v-dialog v-model="dialog.trash" persistent max-width="600">
                <v-card>
                    <v-card-title class="title">{{dialog.title}}</v-card-title>
                    <v-card-text>{{dialog.text}}</v-card-text>
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="grey" text @click="dialog.trash = false">
                            {{trans('cancel')}}
                        </v-btn>
                        <v-btn color="success" text @click="deleteUser">{{trans('accept')}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <v-overlay :value="overlay.status">
            <div class="d-flex">
                <v-spacer/>
                <v-progress-circular indeterminate size="64"></v-progress-circular>
                <v-spacer/>
            </div>
            <div class="text-center">
                {{overlay.text}}
            </div>
        </v-overlay>
    </div>
</template>
<script>
import List from '@/components/lists/User';
export default {
    components:{
        List
    },
    auth:true,
    middleware:'auth',
    layout:'dashboard',
    validate ({ store }) 
    {
        if(!store.$auth.user.access.includes(`users_index`))
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
    data()
    {
        return {
            query_key:'name',
            expanded:[],
            user:{
                list:[],
                total: 0 
            },
            options:{},
            trash:{
                user:-1,
            },
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
                    width: 65, 
                    text: this.trans('extra') , 
                    value: 'data-table-expand' 
                },
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
                { 
                    text: this.trans('options'),
                    align: 'center', 
                    sortable: false, 
                    value: 'action' 
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
    created() {
        this.setMenu();
    },
    methods: {
        setMenu()
        {
            this.$store.commit('menu/change_name','users');
            this.$store.commit('menu/change_title','list');
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
        userRoles(user){
            this.$router.push({
                name:'users-user-roles',
                params:{
                    user: user
                }
            });
        },
        toggleStatus(user)
        {
            var id = this.user.list.indexOf(user);
            this.$axios.$put(   `${this.$store.getters['translate/selectLang']['lang']}-${this.$store.getters['translate/selectLang']['country']}`
            +   '/users/'
            +   user.id
            +   '/status')
            .then((data) =>  
            {
                this.$set(this.user.list[id],'status',data.user.status);
                this.pushMessage(data.message.text,'black');
            })
            .catch((error) =>  
            {
                if(this.app_debug)
                {
                    console.warn(error);
                }
            });
        },
        trashUser(user)
        {
            this.dialog.title = this.trans('really_delete');
            this.dialog.text = this.trans('note_not_recover_his_any_time_trash');
            this.trash.user = user;
            this.dialog.trash = true;
        },
        editUser(user)
        {
            this.$router.push({
                name:'users-user-edit',
                params:{
                    user: user
                }
            });
        },
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
                this.user.list = data.users.data;
                this.user.total = data.users.total;
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
        deleteUser()
        {
            this.dialog.trash = false;
            this.overlay.status = true;
            this.overlay.text = this.trans('trashing');
            this.$axios.$delete( `${this.$store.getters['translate/selectLang']['lang']}-${this.$store.getters['translate/selectLang']['country']}`
                +'/users/' 
                + this.trash.user)
            .then((data) =>  
            {
                this.pushMessage(data.message.text,'info');
                this.getUsers();
            })
            .catch((error) =>  
            {
                if(error.response)
                {
                    let res = error.response;
                    switch (res.status) 
                    {
                        case 400:
                            this.pushMessage(res.data.message.text,'error');                       
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
                setTimeout(() => {
                    this.overlay.status = false;
                }, this.time);
                this.waiting = false; 
            });
        },
    },
}
</script>