<template>
    <nuxt-child/>
</template>
<script>
    export default {
        layout:'dashboard',
        head(){
            return{
                title: this.trans('profile')
            }
        },
        created() {
            this.setMenu();
        },
        methods: {
            setMenu()
            {
                this.$store.commit('menu/change_name','profile');
                this.$store.commit('menu/change_title','config');
                this.$store.commit('menu/change_toolbar', {
                    status: false,
                    buttons:
                    [
                        {
                            icon: 'mdi-account-outline',
                            link: {
                                name:'super-users'
                            }
                        },
                        {
                            icon: 'mdi-plus-circle-outline',
                            link: {
                                name:'super-users-create'
                            }
                        },
                        
                    ]
                });
            },
        },
    }
</script>