<template>
	<div class="expandLogin">
	</div>
</template>

<script>
    import HeaderDiv from '@/components/header/head'
    export default{
        name:'expandLogin',
        components: {
            HeaderDiv
        },
		data(){
			 return{
			 } 
		},
        created(){
            this.writeLocalStorage();
        },
		methods:{
		    // 打印获取的参数并写入 localStorage
            writeLocalStorage(){
                const refreshToken = this.$route.query.refreshToken;
                const accessToken = this.$route.query.accessToken;
                const singleToken = this.$route.query.singleToken;
				//console.log(this.refreshToken);
                if(refreshToken && accessToken) {
                    localStorage.refreshToken = refreshToken;
                    localStorage.accessToken = accessToken;
                    localStorage.singleToken = singleToken;
                    this.$router.push({path:'/my'});
				}else{
                    console.log('error');
				}

			}
		}
	}
</script>
