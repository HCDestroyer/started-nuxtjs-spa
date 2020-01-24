<template>
    <v-container 
        fluid
        grid-list-xs>
        <v-row
            align="center"
            justify="center">
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-text>
                        <v-skeleton-loader
                            boilerplate
                            class="mx-auto elevation-0"
                            type="list-item">
                        </v-skeleton-loader>
                        <v-skeleton-loader
                            boilerplate
                            class="mx-auto elevation-0"
                            type="list-item">
                        </v-skeleton-loader>
                        <v-skeleton-loader
                            boilerplate
                            class="mx-auto elevation-0"
                            type="list-item">
                        </v-skeleton-loader>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>