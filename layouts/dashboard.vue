<template>
	<v-app dark>
		<v-navigation-drawer
			v-model="drawer"
			class="bg-per shadow-0"
			fixed
			app>
			<ToolbarApp/>
			<v-list
				shaped
				nav
				dense
				class="mt-0 pt-0">
				<v-list-item
					v-for="(item, i) in items"
					:key="i"
					:to="{ name:item.to }"
					router
					exact>
					<v-list-item-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="item.title" />
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<MenuList class="pt-0 sidebar"/>
			<template v-slot:append>
				<p class="text-center mb-0 overline white">
					{{
						trans('version')+` ${app_version}`
					}}
				</p>
			</template>
		</v-navigation-drawer>
		<v-app-bar
			color="bg-gradient-emerald"
			dark
			fixed
			class="shadow-2"
			app>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
			<v-toolbar-title v-if="menu.name" v-text="trans(menu.name)" />
			<v-spacer />
			<ToolbarUser/>
			<template v-slot:extension v-if="menu.toolbar && menu.toolbar.status">	
				<v-tabs
					:grow="(menu.toolbar.buttons.length > 3) ? true : false"
					:right="(menu.toolbar.buttons.length < 3) ? true : false"
					background-color="transparent">
					<v-tab
						v-for="(button, i) in menu.toolbar.buttons" 
						:key="i" 
						:to="button.link"
						v-show="$auth.user && $auth.user.access.includes(`${button.key}`)">
						{{	trans(button.text)	}}
						<v-icon class="mx-1">{{ button.icon }}</v-icon>
					</v-tab>
				</v-tabs>
            </template>
		</v-app-bar>
		<v-content>
			<transition>
				<keep-alive>
					<nuxt/>
				</keep-alive>
			</transition>
		</v-content>
		<v-footer
			:fixed="fixed"
			app>
			<span class="overline">&copy; {{	getDate(new Date(),'YYYY')	}} <a href="//hacsmartech.com" target="_blank">{{ app_name }}</a>. {{	trans('copyright')	}}</span>
			<div class="grow"></div>
			<span class="overline font-weight-bold">
				<v-icon
					color="black"
					small>mdi-clock-outline</v-icon>
				{{	time_stamp }}
			</span>
		</v-footer>
	</v-app>
</template>
<script>
import {mapState} from 'vuex';
import ToolbarApp from '@/components/ToolbarApp';
import ToolbarUser from '@/components/ToolbarUser';
import MenuList from '@/components/lists/SideBar';
export default {
	auth:false,
	components:{
		MenuList,
		ToolbarApp,
		ToolbarUser
	},
	data () {
		return {
			time_stamp:null,
			clipped: false,
			drawer: false,
			fixed: false,
			items: [
				{
					icon: 'mdi-apps',
					title: this.trans('home'),
					to: 'index'
				},
			],
			miniVariant: false,
			right: true,
			rightDrawer: false,
			title: 'Vuetify.js'
		}
	},
	computed: {
		...mapState({
			menu:'menu'
		})
	},
	created() {
		this.timeStamp();
	},
	methods: {
		timeStamp()
		{
			this.time_stamp = this.getCurrent();
			setInterval(() => {
				this.time_stamp = this.getCurrent();
    		}, 1000);
		}
	},
}
</script>
