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
                title: this.trans('config')
            }
        },
        created()
        {
            this.setMenu();
        },
        methods: {
            setMenu()
            {
                this.$store.commit('menu/change_name','config');
                this.$store.commit('menu/change_title','show');
                this.$store.commit('menu/change_toolbar', {
                    status: false,
                    buttons:[]
                });
            },
        },
    }
</script>