<template>
    <v-row
        justify="center"
        align="center">
        <v-col 
            cols="12"
            class="pt-0">
            <v-text-field
                v-model="me_profile.password_old"
                :label="trans('password_old')"
                :error="!!required.password_old"
                :hint="(required.password_old)? required.password_old:''"
                :hide-details="(required.password_old)?false:true"
                :placeholder="(solo)?trans('password_old'):''"
                :shaped="shaped"
                :outlined="outlined"
                :rounded="rounded"
                :solo="solo"
                :single-line="singleLine"
                :filled="filled"
                :clearable="clearable"
                :persistent-hint="persistentHint"
                :loading="loading"
                :flat="flat"
                :append-icon="password_old ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                :type="password_old ? 'text' : 'password'"
                @click:append="password_old = !password_old"
            ></v-text-field> 
        </v-col>
        <v-col 
            cols="12"
            class="pt-0">
           <v-text-field
                v-model="me_profile.password_new"
                :label="trans('password_new')"
                :error="!!required.password_new"
                :hint="(required.password_new)? required.password_new:''"
                :hide-details="(required.password_new)?false:true"
                :placeholder="(solo)?trans('password_new'):''"
                :shaped="shaped"
                :outlined="outlined"
                :rounded="rounded"
                :solo="solo"
                :single-line="singleLine"
                :filled="filled"
                :clearable="clearable"
                :persistent-hint="persistentHint"
                :loading="loading"
                :flat="flat"
                :append-icon="password_new ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                :type="password_new ? 'text' : 'password'"
                @click:append="password_new = !password_new"
            ></v-text-field> 
        </v-col>
        <v-col 
            cols="12"
            class="pt-0">
           <v-text-field
                v-model="me_profile.password_confirm"
                :label="trans('password_confirm')"
                :error="!!required.password_confirm"
                :hint="(required.password_confirm)? required.password_confirm:''"
                :hide-details="(required.password_confirm)?false:true"
                :placeholder="(solo)?trans('password_confirm'):''"
                :shaped="shaped"
                :outlined="outlined"
                :rounded="rounded"
                :solo="solo"
                :single-line="singleLine"
                :filled="filled"
                :clearable="clearable"
                :persistent-hint="persistentHint"
                :loading="loading"
                :flat="flat"
                :append-icon="password_confirm ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                :type="password_confirm ? 'text' : 'password'"
                @click:append="password_confirm = !password_confirm"
            ></v-text-field> 
        </v-col>
        <v-col 
            cols="12">
            <v-btn 
                :loading="waiting"
                :disabled="waiting"
                @click="changePassword"
                class="shadow-2"
                color="success" 
                rounded
                block 
                dark>
                {{trans('confirm')}}
            </v-btn>
        </v-col>
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
    </v-row>
</template>
<script>
export default {
    name:'form-me_profile',
    props:[
        'shaped',
        'outlined',
        'rounded',
        'solo',
        'singleLine',
        'filled',
        'clearable',
        'persistentHint',
        'loading',
        'flat',
        'noResize',
        'autoGrow'
    ],
    data()
    {
        return {
            password_old:false,
            password_new:false,
            password_confirm:false,
            me_profile: {
                password_old:null,
                password_new:null,
                password_confirm:null,
            },
        }
    },
    watch: {
        me_profile(input)
        {
            Object.keys(input).forEach( (row, index) =>
            {
                if(input[row] != "")
                {
                    this.required[row] = "";
                }
            });
            this.me_profile = input
        }
    },
    methods: {
        changePassword()
        {
            this.required = Object.assign({},{});
            this.$axios.$put( `${this.$store.getters['translate/selectLang']['lang']}-${this.$store.getters['translate/selectLang']['country']}`
                +'/auth/users/change-password', 
                this.me_profile)
            .then((data) => 
            {
                this.me_profile = Object.assign({},{});
                this.pushMessage(data.message.text,'info');
                setTimeout(() => {
                    this.$auth.logout('local');
                }, this.time);
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
                                this.required = res.data.required; 
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
    },
}
</script>