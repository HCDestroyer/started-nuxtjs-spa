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
                title: this.trans('roles')
            }
        },
        created()
        {
            this.setMenu();
        },
        methods: {
            setMenu()
            {
                this.$store.commit('menu/change_name','roles');
                this.$store.commit('menu/change_title','list');
                this.$store.commit('menu/change_toolbar', {
                    status: true,
                    buttons:[
                        {
                            key: 'roles_index',
                            icon: 'mdi-clipboard-text-outline',
                            text:'list',
                            link: {
                                name:'roles'
                            }
                        },
                        {
                            key:'roles_create',
                            icon: 'mdi-plus-circle-outline',
                            text:'add',
                            link: {
                                name:'roles-create'
                            }
                        },
                    ]
                });
            },
        },
    }
</script>