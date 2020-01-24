<template>
    <v-container 
        fluid
        grid-list-xs>
        <code>
            {{$auth.user}}
        </code>
        <v-row
            justify="center" 
            align="center">
            <v-col
                v-for="i in 10"
                :key="i"
                cols="12" 
                md="4"
                lg="3">
                <v-card>
                    <v-card-title primary-title>
                        title
                    </v-card-title>
                    <v-card-text>
                        Lorem ipsum dolor sit amet consectetur.
                    </v-card-text>
                </v-card>
            </v-col> 
        </v-row>    
    </v-container>
</template>
<script>
    export default {
        auth:true,
	    middleware:'auth',
        layout:'dashboard',
        head(){
            return{
                title: this.trans('home')
            }
        },
        created()
        {
            this.setMenu();
        },
        methods: {
            setMenu()
            {
                this.$store.commit('menu/change_name','home');
                this.$store.commit('menu/change_title','show');
                this.$store.commit('menu/change_toolbar', {
                    status: false,
                    buttons:[]
                });
            },
        },
    }
</script>