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
                title: this.trans('customers')
            }
        },
        created()
        {
            this.setMenu();
        },
        methods: {
            setMenu()
            {
                this.$store.commit('menu/change_name','customers');
                this.$store.commit('menu/change_title','list');
                this.$store.commit('menu/change_toolbar', {
                    status: true,
                    buttons:[
                        {
                            icon: 'mdi-eye-outline',
                            link: {
                                name:'customers'
                            }
                        },
                        {
                            icon: 'mdi-plus-circle-outline',
                            link: {
                                name:'customers-create'
                            }
                        },
                    ]
                });
            },
        },
    }
</script>