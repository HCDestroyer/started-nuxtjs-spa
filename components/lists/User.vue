<template>
    <v-list
        class="list-app pt-0 pb-0" 
        dense>
        <v-list-item
            class="p-0">
            <v-list-item-icon>
                <v-icon
                    :color="color" 
                    v-text="'mdi-account-card-details-outline'"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title v-text="item.card_id"></v-list-item-title>
                <v-list-item-subtitle v-text="trans('card_id')"></v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-list-item
            :href="'mailto:'+item.email"
            class="p-0">
            <v-list-item-icon>
                <v-icon
                    :color="color" 
                    v-text="'mdi-email-outline'"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title v-text="item.email"></v-list-item-title>
                <v-list-item-subtitle v-text="trans('email')"></v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-list-item
            :href="'tel:'+item.phone"
            class="p-0">
            <v-list-item-icon>
                <v-icon
                    :color="color" 
                    v-text="'mdi-contact-phone-outline'"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title v-text="item.phone"></v-list-item-title>
                <v-list-item-subtitle v-text="trans('phone')"></v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-list-item
            class="p-0">
            <v-list-item-icon>
                <v-icon
                    :color="color" 
                    v-text="'mdi-cupcake'"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>
                    {{item.birth_day | formatDate}}
                </v-list-item-title>
                <v-list-item-subtitle v-text="trans('birth_date')"></v-list-item-subtitle>
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