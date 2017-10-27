<template>
	<div class="startPages" id="startPages">
		<div class="start_logo">
			<img src="../assets/Android/drawable-xhdpi/qd_xinbo-logo.png" class="logo" />
			<img src="../assets/Android/drawable-xhdpi/qd_quanyazhou.png" class="txt" />
		</div>
		<div class="stat_button">
		<router-link to='/home'>	
			<button class="enter_web"></button>
		</router-link>
			<button class="download_phone"></button>

		</div>
		<p class="copyright">
			Copyright@2017 XB .All Rights Reserved.
		</p>
	</div>
</template>

<script>
	export default { 
		name: "startPages", 
		data(){
			 return{
			 
			 } 
			},
		methods:{
			
		}
			 }
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	#startPages {
		@include wh(100%, 100%);
		position: fixed;
		background: url(../assets/Android/drawable-xhdpi/qd_back.png) center center no-repeat;
		background-size: 100% 100%;
		.start_logo {
			width: 100%;
			height: 6rem;
			position: relative;
			.logo {
				width: 14rem;
				@include center;
			}
			.txt {
				@include center;
				top: 7rem;
				width: 80%;
			}
		}
		.stat_button {
			width: 100%;
			height: 5rem;
			position: absolute;
			bottom: 9%;
			padding: 0 5%;
			button {
				width: 49.5%;
				height: 100%;
			}
			.enter_web {
				float: left;
				background: url(../assets/Android/drawable-xhdpi/qd_Web-Edition-bt-0.png) no-repeat;
				background-size: 100% 100%;
			}
			.enter_web:hover{
				/*background: url(../assets/Android/drawable-xhdpi/qd_Web-Edition-bt-1.png) no-repeat;
			    background-size: 100% ;*/
			   opacity: .9;
			}
			.download_phone {
				float: right;
				background: url(../assets/Android/drawable-xhdpi/qd_Mobile-terminal-bt-0.png) no-repeat;
				background-size: 100% 100%;
			}
			.download_phone:hover{
				/*background: url(../assets/Android/drawable-xhdpi/qd_Mobile-terminal-bt-1.png) no-repeat;
			    background-size: 100% ;*/
			   opacity: .9;
			}
		}
		.copyright {
			width: 100%;
			height: 2rem;
			position: absolute;
			bottom: 0;
			background: #f19818;
			font-family: "Microsoft YaHei";
			line-height: 2rem;
			text-align: center;
		}
	}
</style>