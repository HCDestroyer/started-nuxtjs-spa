<template>
	<v-list
		class="list-app pt-0 pb-0" 
        dense>
	  	<v-list-item-group>
	        <v-list-item
				:href="'tel:'+item.phone">
	          	<v-list-item-icon>
	            	<v-icon :color="color" >mdi-phone</v-icon>
	          	</v-list-item-icon>
	          	<v-list-item-content>
	            	<v-list-item-title>{{ item.phone }}</v-list-item-title>
	            	<v-list-item-subtitle>{{ trans('phone') }}</v-list-item-subtitle>
	          	</v-list-item-content>
	        </v-list-item>
	        <v-list-item>
	          	<v-list-item-icon>
	            	<v-icon :color="color" >mdi-map-marker</v-icon>
	          	</v-list-item-icon>
	          	<v-list-item-content>
	            	<v-list-item-title>{{ item.address }}</v-list-item-title>
	            	<v-list-item-subtitle>
		          		{{ item.city }}
		        	</v-list-item-subtitle>
	          	</v-list-item-content>
	        </v-list-item>
	        <v-list-item >
	          	<v-list-item-icon>
	            	<v-icon :color="color" >mdi-earth</v-icon>
	          	</v-list-item-icon>
	          	<v-list-item-content>
	            	<v-list-item-title><h4>{{ item.state }}</h4></v-list-item-title>
	            	<v-list-item-subtitle>
		          		{{ item.country }}
		        	</v-list-item-subtitle>
	          	</v-list-item-content>
	        </v-list-item>
	  	</v-list-item-group>
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