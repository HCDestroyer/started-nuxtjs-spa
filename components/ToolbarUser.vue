<template>
	<v-menu
		:close-on-content-click="drawer"
		:nudge-width="200"
		offset-x>
		<template v-slot:activator="{ on }" >
            <v-avatar size="40px" color="green-gradient" v-if="auth.user && auth.user.src == 'imgs/user.svg'" v-on="on">
                <span class="white--text headline">{{new String(auth.user.fname).substring(0, 1)}}</span>				
            </v-avatar >
            <v-avatar 
                v-else
                v-on="on"
				size="40px">
                <img
                    :src="(auth.user)?app_asset+auth.user.src:'/imgs/user.svg'"
                    :alt="(auth.user)?auth.user.fname:''">
            </v-avatar>
		</template>
		<v-card>
			<v-list>
				<v-list-item>
					<v-list-item-avatar>
						<v-avatar 
							v-if="auth.user && auth.user.src == 'imgs/user.svg'"
							color="green-gradient" 
							size="40px">
							<span class="white--text headline">{{new String(auth.user.fname).substring(0, 1)}}</span>
						</v-avatar>
						<v-avatar 
							v-else
							size="40px">
							<img
								:src="(auth.user)?app_asset+auth.user.src:'/imgs/user.svg'"
								:alt="(auth.user)?auth.user.fname:''">
						</v-avatar>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title v-text="(auth.user) ? auth.user.fname+' '+auth.user.lname : ''"></v-list-item-title>
						<v-list-item-subtitle v-text="(auth.user) ? auth.user.fname+' '+auth.user.lname : ''"></v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<v-divider></v-divider>
			<v-list
				rounded
				dense>
				<v-list-item
					@click="profile">
                    <v-list-item-icon>
                        <v-icon color="indigo">mdi-account-badge-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ trans('config_profile')}}</v-list-item-title>
                </v-list-item>
				<v-list-group
				 	color="emerald"
					prepend-icon="mdi-web"
					no-action>
					<country-flag slot="prependIcon" :country='translate.lang.flag' size='normal'/>
					<template v-slot:activator>
						<v-list-item-content>
							<v-list-item-title v-text="trans('select_language')"></v-list-item-title>
						</v-list-item-content>
					</template>
					<v-list-item
						v-for="(item, index) in translate.dicctionary"
						:key="index"
						@click="change_lang(item)">
						<v-list-item-icon>
							<country-flag :country='item.flag' size='normal'/>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title v-text="trans(item.lang+'_'+item.country)"></v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-group>
				<v-list-item>
                    <v-list-item-action>
                        <v-switch v-model="darkMode" color="info" @change="theme_change"></v-switch>
                    </v-list-item-action>
                    <v-list-item-title>{{ trans('dark_mode')}}</v-list-item-title>
                </v-list-item>
				<v-list-item
					@click="logout">
                    <v-list-item-action>
                        <v-icon color="primary">mdi-logout-variant</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>{{ trans('logout')}}</v-list-item-title>
                </v-list-item>
			</v-list>
		</v-card>
	</v-menu>
</template>
<script>
import CountryFlag from 'vue-country-flag';
import { mapState } from 'vuex';
export default	{
	components:	{
		CountryFlag,
	},
	data: () => ({
		drawer: false,
		options:{},
		selectedLang:null,
		darkMode:null,
	}),
	computed: {
		...mapState({
			auth:'auth',
			translate: 'translate'	
		})
	},
	created() 
	{
		this.setConfig();
	},
	methods:
	{
		setConfig()
		{
			let user = this.$auth.user;
			let lang_key = user.lang_key;
			this.selectedLang = this.translate.dicctionary.find(row => row.key == lang_key);
			this.$store.commit('translate/change_lang', this.selectedLang);
			if(user.status=='desactive') return this.logout();
		},
		profile()
		{
			this.$router.push({
				name: `profile`
			});
		},
		logout()
		{
			this.$auth.logout('local');
			this.$router.go({ name: 'login', force: true});
		},
		theme_change()
		{
			this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
		},
		change_lang(item)
		{
			this.$axios.$put( `${this.$store.getters['translate/selectLang']['lang']}-${this.$store.getters['translate/selectLang']['country']}`
				+'/users/'
				+this.$auth.user.id
				+'/property', 
			{
				lang_key:item.key,
			})
			.then((data) => 
			{
                this.$auth.setUser(data.user);
				this.setConfig();
            })
            .catch((error) => 
        	{
        	    console.log(error);
        	})
		},
	}
}
</script>