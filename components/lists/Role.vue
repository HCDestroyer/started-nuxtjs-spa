<template>
    <v-list
        class="list-app pt-0 pb-0" 
        dense>
        <v-list-item
            class="p-0">
            <v-list-item-icon>
                <v-icon
                    :color="color" 
                    v-text="'mdi-shield-key-outline'"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title v-text="item.slug"></v-list-item-title>
                <v-list-item-subtitle v-text="trans('slug')"></v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-list-item
            class="p-0">
            <v-list-item-icon>
                <v-icon
                    :color="color" 
                    v-text="'mdi-text'"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title v-text="item.description"></v-list-item-title>
                <v-list-item-subtitle v-text="trans('description')"></v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>
<script>
export default
{
	props: {
        item: Object,
        set_color: String
    },
    data()
    {
        return {
            color:  (this.set_color) ?   this.set_color  :   'black',
        }
    }
}
</script>