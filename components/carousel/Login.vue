<template>
	<v-carousel>
		<v-carousel-item
			v-for="(item,i) in items"
			:key="i"
			:src="item.src"
			content
		reverse-transition="fade-transition"
		transition="fade-transition"
		></v-carousel-item>
	</v-carousel>
</template>
<script>
	export default {
		data () {
			return {
				items: [
					{
						src: '/imgs/reports/datasheets.jpg'
					},
					{
						src: '/imgs/reports/listcheck.jpg'
					},
					{
						src: '/imgs/reports/teambuild.jpg'
					},
					{
						src: '/imgs/reports/teamwork.jpg'
					}
				]
			}
		}
	};
</script>