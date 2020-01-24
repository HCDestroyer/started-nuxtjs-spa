<template>
    <v-toolbar 
        flat
        class="white">
        <v-avatar  tile>
            <img src="/imgs/app/logo/whattsale.png" :alt="app_name">
        </v-avatar>
        <div class="grow"></div>
        <v-toolbar-title
            class="black--text font-weight-medium">
            {{ app_name }}
        </v-toolbar-title>
        <div class="grow"></div>
    </v-toolbar>
</template>