<template>
    <v-container 
        fluid
        grid-list-xs>
        <v-row
            align="center"
            justify="center">
            <v-col
                v-for="i in 10"
                :key="i"
                cols="12" 
                md="3"
                lg="4">
                <v-card
                    class="shadow-0">
                    <v-skeleton-loader
                        boilerplate
                        class="mx-auto elevation-0"
                        type="card">
                    </v-skeleton-loader>
                    <v-skeleton-loader
                        boilerplate
                        class="mx-auto elevation-0"
                        type="actions">
                    </v-skeleton-loader>
                </v-card>
            </v-col>  
        </v-row>
    </v-container>
</template>
<script>
export default {
    data() {
        return {

        }
    },
}
</script>