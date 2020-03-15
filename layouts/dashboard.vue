<template>
	<v-app dark>
		<v-navigation-drawer
			v-model="drawer"
			class="bg-per shadow-0"
			fixed
			app>
			<v-toolbar 
				flat
				class="white">
				<v-avatar  tile>
					<img src="/imgs/app/logo/wservices.png" :alt="app_name">
				</v-avatar>
				<div class="grow"></div>
				<v-toolbar-title
					class="black--text font-weight-medium">
					{{ app_name }}
				</v-toolbar-title>
				<div class="grow"></div>
				<v-scale-transition>
					<v-btn 
						v-if="drawer"
						icon 
						color="black"
						@click.stop="drawer = false">
						<v-icon>mdi-window-close</v-icon>
					</v-btn>
				</v-scale-transition>
			</v-toolbar>
			<MenuList class="pt-0 sidebar"/>
			<template v-slot:append>
				<v-divider></v-divider>
				<v-toolbar 
					flat
					class="white"
					dense
					light>
					<v-toolbar-title
						class="black--text">
						 <v-list-item
							class="p-0">
							<v-list-item-icon>
								<v-icon
									v-text="'mdi-bug-outline'"></v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title class="font-weight-medium overline" v-text="app_version"></v-list-item-title>
								<v-list-item-subtitle class="caption" v-text="trans('version')"></v-list-item-subtitle>
							</v-list-item-content>	
						</v-list-item>
					</v-toolbar-title>
					<div class="grow"></div>
					<v-btn 
						color="emerald"
						icon
						:to="{
							name: 'configs'
						}"
						route
						exact>
						<v-icon>mdi-cogs</v-icon>
					</v-btn>
				</v-toolbar>
			</template>
		</v-navigation-drawer>
		<v-app-bar
			color="bg-gradient-emerald"
			dark
			absolute
			class="shadow-2"
			app>
			<v-scale-transition>
				<v-btn 
					v-if="!drawer"
					icon 
					@click.stop="drawer = true">
					<v-icon>mdi-menu-open</v-icon>
				</v-btn>
			</v-scale-transition>
			<v-toolbar-title
				v-if="menu.toolbar && menu.toolbar.status"
				:class="{'pl-1': !drawer}">
				<v-list-item-content>
					<v-list-item-title
						class="v-toolbar__title">
						{{  trans(menu.name)  }}
					</v-list-item-title>
					<v-list-item-subtitle
						class="overline">
						<v-icon small>mdi-subdirectory-arrow-right</v-icon>{{	trans(menu.title)	}}
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-toolbar-title>
			<v-toolbar-title 
				v-else
				:class="{'pl-1': !drawer}" 
				v-text="trans(menu.name)" />
			<v-spacer />
			<ToolbarUser/>
			<template v-slot:extension v-if="menu.toolbar && menu.toolbar.status">	
				<v-tabs
					:grow="(menu.toolbar.buttons.length >= 3) ? true : false"
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
			app
			inset
			padless>
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
		ToolbarUser,
	},
	data () {
		return {
			time_stamp:null,
			clipped: false,
			drawer: false,
			fixed: false,
			miniVariant: false,
			right: true,
			rightDrawer: false,
			title: ''
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
		},
		goToQuote()
		{
			this.$router.push({
				name: 'quote'
			});
		}
	},
}
</script>