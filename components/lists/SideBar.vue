<template>
	<v-list 
		v-if="menu && menu.sidebar"
		shaped
		nav
		dense
		light>
		<template
			v-for="(sidebar, sb_key) in menu.sidebar">
			<template
				v-if="sidebar.list">
				<v-list-group
					v-if="$auth.user && $auth.user.access.includes(sidebar.key)"
					color="emerald"
					:key="sb_key"
					:prepend-icon="sidebar.icon"
					no-action>
					<template v-slot:activator>
						<v-list-item-content>
							<v-list-item-title v-text="trans(sidebar.title)"></v-list-item-title>
						</v-list-item-content>
					</template>
					<template
						v-if="sidebar.actions">
						<template
							v-for="(option,	op_key) in sidebar.options">
							<v-list-group
								v-if="$auth.user && $auth.user.access.includes(option.key)"
								:key="op_key"
								no-action
								sub-group>
								<template v-slot:activator>
									<v-list-item-content>
										<v-list-item-title	v-text="trans(option.title)"></v-list-item-title>
									</v-list-item-content>
								</template>
								<template
									v-for="(action, ac_key) in option.actions">
									<v-list-item	
										v-if="$auth.user && $auth.user.access.includes(action.key)"
										:to="{	name:action.redirect}"
										:key="ac_key"
										exact
										router>
										<v-list-item-title v-text="trans(action.title)"></v-list-item-title>
										<v-list-item-icon>
											<v-icon v-text="action.icon"></v-icon>
										</v-list-item-icon>
									</v-list-item>
								</template>
							</v-list-group>
						</template>
					</template>
					<template
						v-else>
						<template
							v-for="(option,	op_key) in sidebar.options">
							<v-list-item	
								v-if="$auth.user && $auth.user.access.includes(option.key)"
								:to="{	name:option.redirect}"
								:key="op_key"
								exact
								router>
								<v-list-item-content>
									<v-list-item-title	v-text="trans(option.title)"></v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									<v-icon v-text="option.icon"></v-icon>
								</v-list-item-icon>
							</v-list-item>
						</template>
					</template>
				</v-list-group>
			</template>
			<template
				v-else>
				<v-list-item
					v-if="$auth.user && $auth.user.access.includes(sidebar.key)"
					color="emerald"
					:key="sb_key"
					:to="{ name: sidebar.redirect }"
					router
					exact
					dense>
					<v-list-item-action>
						<v-icon>{{ sidebar.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="trans(sidebar.title)" />
					</v-list-item-content>
				</v-list-item>
			</template>
		</template>
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
                        options: [
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