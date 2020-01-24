<template>
    <nuxt-child :key="$route.fullPath"/>  
</template>
<script>
    export default {
        auth:true,
	    middleware:'auth',
        layout:'dashboard',
        head(){
            return{
                title: this.trans('users')
            }
        },
        created()
        {
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
        },
    }
</script>