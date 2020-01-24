<template>
	<v-list 
		v-if="menu && menu.sidebar"
		shaped
		nav
		dense>
		<v-list-group
            color="emerald"
			v-for="(sidebar, i) in menu.sidebar"
			v-show="$auth.user && $auth.user.access.includes(sidebar.key)"
			:key="i"
			:prepend-icon="sidebar.icon"
			:no-action="(sidebar.actions && sidebar.actions.length	>	0)	? true	: false"
			:to="{	name: sidebar.redirect }">
			<template v-slot:activator>
				<v-list-item-content>
					<v-list-item-title v-text="trans(sidebar.title)"></v-list-item-title>
				</v-list-item-content>
			</template>
			<v-list-item
				v-for="(action,	key) in sidebar.actions"
				:key="key"
				:to="{	name:action.redirect}"
				v-show="$auth.user && $auth.user.access.includes(action.key)"
				link
				exact
				router>
				<v-list-item-title v-text="trans(action.title)"></v-list-item-title>
				<v-list-item-icon>
					<v-icon v-text="action.icon"></v-icon>
				</v-list-item-icon>
			</v-list-item>
		</v-list-group>
	</v-list>
</template>
<script>
import { mapState } from 'vuex';
export default {
	computed:{
		...mapState({
			menu: 'menu'
		})
	},
	data() {
        return {
            test:{
                sidebar:[
                    {
						key:'users',
                        icon: 'mdi-clipboard-account-outline',
                        redirect: 'users',
                        title: 'accounts',
                        actions: [
                            {
								key: 'show',
                                icon: 'mdi-eye-outline',
                                redirect: 'users',
                                title: 'show',
                            },
                            {
								key: 'create',
                                icon: 'mdi-plus-circle-outline',
                                redirect: 'users-create',
                                title: 'add',
                            },
                        ]
                    },
                ]
            }
        }
    },  
}
</script>