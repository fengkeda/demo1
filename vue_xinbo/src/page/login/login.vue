<template>
	<div class="login">
		<div class="bg"></div>
		<header-div :service='service' :goback='goback' :goHome='goHome'>
			<span class="header_txt">用户登录</span>
		</header-div>
		<div class="in_login">
		<div class="log_logo">
			<img src="../../assets/Android/drawable-xhdpi/dl_xinbo_logo.png" />
		</div>
		<form>
			<ul class="common_list">
				<li class="common_li">
					<label>
						<img src="../../assets/Android/drawable-xhdpi/dl_Account-number-icon.png"/>
					</label>
					<input type="text" placeholder="账号/手机号码" class="common_put" v-model='username' name='user' v-validate="'required'"/>
				    
					<div class="b_error" v-show="errors.has('user')">
						<p class="error_text">{{errors.first('user')}}</p>
					</div>
				</li>

				<li>
					<label>
						<img src="../../assets/Android/drawable-xhdpi/zc_Password-1.png"/>
					</label>
					<input type="password" placeholder="密码" class="common_put" v-model='password' name='password' v-validate="'required|max:20|min:6'"/>
				<router-link to='ForgetPass'>	<span class="forget_pass">忘记密码？</span></router-link>
				
				<div class="b_error" v-show="errors.has('password')">
						<p class="error_text">{{errors.first('password')}}</p>
					</div>
				</li>
				<li class="code_li">
					<label>
						<img src="../../assets/Android/drawable-xhdpi/dl_Unlock---Unlocked.png"/>
					</label>
					<input type="text" placeholder="验证码" class="code_txt" v-model='code' name='code' v-validate="'required'"/>
					<!--<input type="button" class="code_img" />-->
					<img src="api/getVerifyImage" class="code_img" @click="getImg"/>
					
					<div class="b_error" v-show="errors.has('code')">
						<p class="error_text">{{errors.first('code')}}</p>
					</div>
				</li>
				<li class="btn_li">
					<input type="button" v-model='loign_txt' class="login_btn" :disabled="disabled" @click="validateBeforeSubmit()"/>
					<router-link to='Register'><input type="button" value="注册" class="submit_btn" /></router-link>
				</li>
			</ul>
			
		</form>
		
		<div class="error_popup" v-if='login_overtime'>
			<img src="../../assets/Android/drawable-xhdpi/zyl_cancel-bt.png" class="close_error" />
            <div class="error_txt">

            </div>
			<button>确  定</button>
		</div>
		
		<!--<p class="copyright">-->
			<!--Copyright@2017 XB .All Rights Reserved.-->
		<!--</p>-->
	</div>
	</div>
</template>
<script>
	import HeaderDiv from '@/components/header/head'
	export default{
		 name:'login',
		 components: {
			HeaderDiv
		},
	  data(){
	  	 return{
	  	 	 code_img:'',
	  	 	 goback:true,
	  	 	 service:true,
	  	 	 logged:true,
			 goHome:true,
	  	 	 password:'',
	  	 	 code:'',
	  	 	 username:'',
	  	 	 error_mess:'',
	  	 	 login_overtime:false,
             disabled:false,
	  	 	 loign_txt:'登录'
	  	 } 
	  	 },
	  	 mounted(){
	  	 	this.getImg();
	  	 },
	  	 methods:{
	  	 	//获取验证码
	  	 	getImg(){
				let self = this;
				let reToken = localStorage.refreshToken;
				let acToken = localStorage.accessToken;
				let siToken = localStorage.singleToken;
				if(reToken && acToken && siToken) { // 通过vuex state获取当前的token是否存在
					let lay = self.$layer.open({
					content: '您已经登录中！',
					btn: '确定',
					shadeClose: false,
					yes: function(){
						layer.close(lay);
						self.$router.push({path:'/my'});
						}
					});
					return;
				}
	  	 		$('.code_img').attr('src','api/getVerifyImage?'+new Date().getTime());
                layer.closeAll();
	  	 	},

	  	 	//登录
			validateBeforeSubmit() {
				this.$validator.validateAll().then((result) => {
					if(result) {
						let self = this;
						let url = location.origin;
						self.loign_txt = '登陆中...';
						self.disabled = true;
						console.log(self.code);
					this.axios.post('api/subLoginApi',{
	  	 			
				      verifyImageCode:self.code,
				      username:self.username,
				      password:self.password,
				    
	  	 		}).then((response) => {
					if(response.data.status == 1){
					    const refreshToken = response.data.content.refreshToken;
                        const accessToken = response.data.content.accessToken;
                        const singleToken = response.data.content.singleToken;
                        if(refreshToken && accessToken) {
                            localStorage.refreshToken = refreshToken;
                            localStorage.accessToken = accessToken;
                            localStorage.singleToken = singleToken;
                        }
						let lay = self.$layer.open({
							content: '登陆成功',
							btn: '确定',
							shadeClose: false,
							yes: function(){
								layer.close(lay);
								self.$router.push({path:'/my'});
							}
						});
						return;
					}
					let lay = self.$layer.open({
						content: response.data.msg,
						btn: '确定',
						shadeClose: false,
						yes: function(){
							layer.close(lay);
							self.loign_txt = '登陆';
                            self.disabled = false;
						}
					});
					$('.code_img').attr('src','api/getVerifyImage?'+new Date().getTime());
					self.code = '';
				}).catch(function(error){
				    console.log(error);
					let lay = self.$layer.open({
						content: '登陆失败！',
						btn: '确定',
						shadeClose: false,
						yes: function(){
							layer.close(lay);
							self.loign_txt = '登陆';
                            self.disabled = false;
						}
					});
					$('.code_img').attr('src','api/getVerifyImage?'+new Date().getTime());
					self.code = '';
				});
				}
				});
			},
	  	 }
	}
</script>

<style lang="scss" scoped>
	@import '../../../src/style/mixin';
	@import '../../../src/style/login_common';
	@import '../../../src/style/error';
	
	.login{
		@include wh(100%, 100%);
	    .bg{
	    	@include wh(100%, 100%); 
	    	@include bis('../../assets/Android/drawable-xhdpi/denglu_back.png');
		    position:fixed;
	    }
	.in_login {
		@include wh(100%, 100%);
	    .code_img {
	        float: right;
	        @include wh(34%, 3.5rem);
	        margin-top:0.2rem;
	}}
	
	.error_popup{
		width: 25rem;
		height: 11rem;
		background: #eeeeee;
		@include fixed;
		z-index: 666;
		border-radius:0.5rem;
		.close_error{
			@include wh(1rem,1rem);
			position:absolute;
			top:0.5rem;
			right:1rem;
		}
		button{
			@include wh(100%,3.5rem);
			position: absolute;
			bottom: 0;
			border-top:0.1rem solid #3194e8;
			color:#3194e8;
			font-size:1.6rem;
		background: #eeeeee;
		}
		.error_txt{
			position: relative;
			width: 100%;
			height:4rem;
			text-align: center;
			margin-top: 3rem;
			padding: 0 1rem;
			overflow-y: auto;
		}
	}
	}
</style>