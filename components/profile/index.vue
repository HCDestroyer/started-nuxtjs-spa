<template>
    <v-container 
        fluid
        grid-list-xs>
        <v-row
            class="mt-5"
            justify="center"
            align="center">
            <v-col 
                cols="12"
                md="4">
                <v-hover v-slot:default="{ hover }">
                    <v-card
                        :class="{
                            'shadow-2': hover
                        }">
                        <v-card-text
                            class="pb-0">
                            <div class="text-center">
                                <v-avatar class="mt-n12 shadow-2" size="100px" color="black" v-if="auth.user.src == 'imgs/user.svg'" >
                                    <span class="white--text headline">{{new String(auth.user.fname).substring(0, 1)}}</span>
                                </v-avatar >
                                <v-avatar 
                                    v-else
                                    size="100px">
                                    <img
                                        :src="(auth.user)   ? app_asset + auth.user.src: '/imgs/user.svg'"
                                        :alt="(auth.user)?auth.user.fname:''">
                                </v-avatar>
                            </div>
                            <div class="d-flex" v-if="!change_avatar">
                                <div class="grow"></div>
                                <v-btn
                                    icon
                                    rounded
                                    @click="change_avatar=true" 
                                    color="info" dark>
                                    <v-icon>mdi-camera-outline</v-icon>
                                </v-btn>
                                <div class="grow"></div>
                            </div>
                            <div class="text-center" v-if="change_avatar">
                                <v-file-input
                                    v-model="avatar"
                                    accept="image/png, image/jpeg, image/bmp"
                                    placeholder="Selecciona una foto de perfil"
                                    prepend-icon="mdi-camera-outline"
                                    label="foto de perfil"
                                ></v-file-input>
                                <v-btn text 
                                    rounded color="primary" @click="changeAvatar">
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
                        </v-card-text>
                        <v-card-text
                            v-if="!change_password"
                            class="py-0">
                            <v-list
                                dense>
                                <v-list-item
                                    class="p-0" 
                                    dense>
                                    <v-list-item-avatar>
                                        <v-icon color="indigo">mdi-account</v-icon>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title>{{auth.user.fname +' '+ auth.user.lname}}</v-list-item-title>
                                        <v-list-item-subtitle>{{trans('name')}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item
                                    class="p-0" 
                                    dense>
                                    <v-list-item-avatar>
                                        <v-icon color="indigo">mdi-email</v-icon>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title>{{auth.user.email}}</v-list-item-title>
                                        <v-list-item-subtitle>{{trans('email')}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                        <v-card-text    
                            v-if="!change_password"
                            class="pt-0">
                            <div class="d-flex">
                                <div class="grow"></div>
                                <v-btn
                                    text
                                    rounded
                                    @click="change_password=true" 
                                    color="info" dark>
                                    {{trans('change_password')}}
                                </v-btn>
                                <div class="grow"></div>
                            </div>
                        </v-card-text>
                        <v-card-text 
                            v-if="change_password"
                            class="pt-0">
                            <p class="subtitle-2"> 
                                {{trans('change_password')}}
                            </p>
                            <ChangePassword 
                                persistentHint
                                filled/>
                            <div class="text-center">
                                <v-btn 
                                    @click="change_password=false"
                                    text 
                                    rounded
                                    color="secondary" 
                                    dark>
                                    {{trans('cancel')}}
                                </v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-hover>
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
import {mapState} from 'vuex';
import ChangePassword from '@/components/forms/update/change-password';
export default {
    components:{
        ChangePassword
    },
    data() {
        return {
            change_password:false,
            change_avatar:false,
            avatar:null,
        }
    },
    computed: {
		...mapState({
			auth:'auth'	
		})
	},
    methods: 
    {
        changeAvatar()
        {
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };
            const formData = new FormData();
            formData.append('avatar', this.avatar);
            this.$axios.$post( `${this.$store.getters['translate/selectLang']['lang']}-${this.$store.getters['translate/selectLang']['country']}`
                +'/auth/users/change-avatar',
                formData,
                config
            )
            .then((data) => {
                this.$auth.setUser(data.user);
                this.pushMessage(data.message.text,'success');
                this.change_avatar = false;
                this.avatar = null;
            })
            .catch((error) => 
            {
                if(this.app_debug)
                {
                    console.warn(error);
                }
            });
        }
    },
}
</script>