<template>
	<div class="register">
		<div class="bg_zong"></div>
		<header-div :service='service' :goback='goback' :goHome='goHome' ><span class="header_txt">手机号注册</span></header-div>

		<div class="in_register">
			<div class="log_logo">
				<img src="../../assets/Android/drawable-xhdpi/zc_xinbo_logo.png" />
			</div>
			<ul class="common_list">
				<li class="common_li user_li">
					<label class="user_lab" v-model='user_prefix' @click='getPrefix'>
						{{user_prefix}}
					</label>
					<input type="text" placeholder="用户名" class="common_put" v-model='xb_user' name='xb_user' v-validate="'required'" @blur='verify_user()' />
					<div class="b_error" v-if="errors.has('xb_user')">
						<p class="error_text">{{errors.first('xb_user')}}
						</p>
					</div>
				</li>
				<li class="common_li">
					<label>
						<img src="../../assets/Android/drawable-xhdpi/zc_Mobile-phone-icon.png"/>
					</label>
					<input type="number" placeholder="手机号码" class="common_put" v-model='phone' name='mobile' v-validate="'required|mobile'" />
					<div class="b_error" v-if="errors.has('mobile')">
						<p class="error_text">{{errors.first('mobile')}}
						</p>
					</div>
				</li>
				<li>
					<label>
						<img src="../../assets/Android/drawable-xhdpi/zc_Password-1.png"/>
					</label>
					<input type="password" placeholder="设置登入密码" class="common_put" v-model='password' name='password' v-validate="'required|alpha_dash|max:20|min:6'" />

					<div class="b_error" v-if="errors.has('password')">
						<p class="error_text">{{errors.first('password')}}
						</p>
					</div>
				</li>
				<li>
					<label>
						<img src="../../assets/Android/drawable-xhdpi/zc_Password-1.png"/>
					</label>
					<input type="password" placeholder="确认登入密码" class="common_put" name="againpass" v-model='againpass' v-validate="'required|confirmed:password'" />
					<div class="b_error" v-if="errors.has('againpass')">
						<p class="error_text">{{errors.first('againpass')}}
						</p>
					</div>
				</li>
				<li class="code_li">
					<label>
						<img src="../../assets/Android/drawable-xhdpi/dl_Unlock---Unlocked.png"/>
					</label>
					<input type="text" placeholder="验证码" v-model='code_img' class="code_txt" name='code' v-validate="'required'" />
					<img src="api/getVerifyImage" class="re_code_img" @click='get_codeImg' />

					<div class="b_error" v-if="errors.has('code')">
						<p class="error_text">{{errors.first('code')}}
						</p>
					</div>
				</li>
				<li class="code_li">
					<label>
						<img src="../../assets/Android/drawable-xhdpi/dl_Unlock---Unlocked.png"/>
					</label>
					<input type="text" placeholder="手机验证码" v-model='code_phone' class="code_txt" name='code_phone' v-validate="'required'" />
					<!--<input type="button" class="code_img" />-->
					<button @click='get_code()' :disabled="disabled" class="code_img">{{code_txt}}</button>

					<div class="b_error" v-if="errors.has('code_phone')">
						<p class="error_text">{{errors.first('code_phone')}}
						</p>
					</div>
				</li>

				<li class="agreeTerms">
					<input type="checkbox" name='checkbox' v-validate="'required'" /><span>勾选点击立刻注册，即表示你您已阅读并同意新博娱乐城
							(<a href="javascript:void(0)">服务条款</a>)和<a href="javascript:void(0)">(隐私政策)</a></span>

					<p class="error_text" id="agreeTerms" v-if="errors.has('checkbox')">
						[提示]请勾选同意计划！
					</p>

				</li>
				<li>
					<input type="submit" class="common_put com_btn" :value="res_button_text" :disabled="res_disabled" @click="validateBeforeSubmit()" />
				</li>
			</ul>

		</div>
	</div>
</template>

<script>
	import HeaderDiv from '@/components/header/head';
	export default {
		name: 'register',
		components: {
			HeaderDiv
		},
		data() {
			return {
				goback: true,
				service: true,
				logged: true,
                goHome:true,
				sidbar: true,
				phone: '',
				password: '',
				xb_user: '',
				againpass: '',
				code: '',
				code_phone: '',
				code_img: '',
				user_prefix: '',
				code_txt: '获取验证码',
				disabled: false,
				time: 0,
				repeat_user: false,
                res_disabled: false,
                res_button_text: '注册',
			}
		},
		mounted() {
			this.getPrefix();
		},
		methods: {
			get_codeImg() {
				$('.re_code_img').attr('src', 'api/getVerifyImage?' + new Date().getTime())
			},
			//获取手机验证码
			get_code() {
				let self = this;
				this.axios.post('api/getPhoneVerifyApi', {
					verifyImageCode: self.code_img,
					phoneNumber: self.phone
				}).then(function(res) {
					console.log(res);
					//					self.code_txt='发送成功';
					if(res.data.status == 1) {
						self.time = 60;
						self.code_txt = '发送成功';
						self.disabled = true;
						self.timer();
					} else if(res.data.status == -6) {
						let img_url = res.data.content.url;
						$('.re_code_img').attr('src', 'api/' + img_url);
					}
                    let lay = self.$layer.open({
                        content: res.data.msg,
                        btn: '确定',
                        shadeClose: false,
                        yes: function(){
                            layer.close(lay);
                        }
                    });
				}).catch(function(error) {
					console.log(error)
				})
			},
			timer() {
				if(this.time > 0) {
					this.time--;
					//			         	console.log(this.time);
					this.code_txt = '(' + this.time + 's)后重新发送';
					setTimeout(this.timer, 1000);
					return;
				}
				this.time = 0;
				this.disabled = false;
				this.code_txt = '获取验证码';
			},

			//验证用户名是否已注册
			verify_user() {
				let self = this;

				if(self.xb_user) {

					let username = self.user_prefix + self.xb_user;

					this.axios.post('api/checkUsernameApi', {
						prefixUsername: username
					}).then(function(respone) {
						//					console.log(respone);
						if(respone.data.status == 1) {

							self.repeat_user = true;
							return;
						}
						self.repeat_user = false;
                        let lay = self.$layer.open({
                            content: res.data.msg,
                            btn: '确定',
                            shadeClose: false,
                            yes: function(){
                                layer.close(lay);
                            }
                        });
					}).catch(function(error) {
						console.log(error);

					})
					return;
				}
			},

			//获取用户名前缀
			getPrefix() {
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
				let host_url = window.location.origin;
				this.axios.post('api/getNamePrefixApi', {
					host: host_url
				}).then(function(res) {
					if(res.data.status == 1) {
						self.user_prefix = res.data.content.prefix;
					} else if(res.data.status == -1) {
                        let lay = self.$layer.open({
                            content: res.data.msg,
                            btn: '确定',
                            shadeClose: false,
                            yes: function(){
                                layer.close(lay);
                            }
                        });
					}
				}).catch(function(error) {
					console.log(error)
				})
			},
			//点击注册触发			
			validateBeforeSubmit() {
				this.$validator.validateAll().then((result) => {
					if(result) {
						//注册
						var self = this;
                        self.res_disabled = true;
                        self.res_button_text = '注册中···';
						let url = location.origin;
						//用户名是否可用
						if(self.repeat_user) {
							this.axios.post('api/subRegisterApi', {
								agentPrefix: self.user_prefix,
								username: self.xb_user,
								password: self.password,
								confirmPassword: self.againpass,
								phoneNumber: self.phone,
								verifyImageCode: self.code_img,
								verifyPhoneCode: self.code_phone,
								host: url,
								eqpt: 'mobile',
							}).then((respon) => {
								console.log(respon);
								if(respon.data.status == -1) {
                                    self.res_disabled = false;
                                    self.res_button_text = '注册';
                                    let lay = self.$layer.open({
                                        content: respon.data.msg,
                                        btn: '确定',
                                        shadeClose: false,
                                        yes: function(){
                                            layer.close(lay);
                                        }
                                    });
									let img_url = respon.data.content.url;
									$('.re_code_img').attr('src', 'api/' + img_url);
									self.code_img = '';
									return;
								}
								if(respon.data.status == 1) {
                                    localStorage.refreshToken = respon.data.content.refreshToken;
                                    localStorage.accessToken = respon.data.content.accessToken;
                                    localStorage.singleToken = respon.data.content.singleToken;
                                    let lay = self.$layer.open({
                                        content: '注册成功跳转到首页...',
                                        btn: '确定',
                                        shadeClose: false,
                                        yes: function(){
                                            layer.close(lay);
                                            self.$router.push({ path: '/my' })
                                        }
                                    });
								}

							});
							return;
						}
					}
                    let lay = self.$layer.open({
                        content: '请完善信息...',
                        btn: '确定',
                        shadeClose: false,
                        yes: function(){
                            layer.close(lay);
                        }
                    });
				});
			},

		}
	}
</script>
<style lang="scss" scoped>
	@import '../../../src/style/mixin';
	@import '../../../src/style/login_common';
	@import '../../../src/style/error';
	.register {
		@include wh(100%, 100%);
		.in_register {
			@include wh(100%, 100%);
			.code_li {
				button {
					float: right;
					@include wh(38%, 4rem);
					border-radius: 4rem;
					font-size: 1.2rem;
				}
				.re_code_img {
					float: right;
					@include wh(38%, 3.5rem);
					font-size: 1.2rem;
					margin-top: 0.2rem;
				}
				
				.code_img{
					background: #40AFFE;
					color: #fff;
					font-size: 1.4rem;
				}
			}
			.code_li {
				margin-bottom: 2.2rem;
			}
			.agreeTerms {
				span {
					color: #898989;
					font-size: 1.4rem;
					padding-left: 1rem;
				}
				a {
					color: #2d5d22;
				}
			}
			#agreeTerms {
				background: #fff;
				color: black;
				padding: 0.5rem;
				position: absolute;
				top: -1rem;
				left: 3rem;
				border-radius: 0.5rem;
			}
			#agreeTerms::after {
				content: '';
				width: 0;
				height: 0;
				border-bottom: 0.5rem solid transparent;
				border-right: 1.5rem solid #fff;
				border-top: 0.5rem solid transparent;
				position: absolute;
				top: 50%;
				margin-top: -0.8rem;
				left: -1.2rem;
				z-index: 5;
			}
			#agreeTerms::before {
				content: '';
				width: 0;
				height: 0;
				border-bottom: 0.5rem solid transparent;
				border-right: 1.5rem solid #999999;
				border-top: 0.5rem solid transparent;
				position: absolute;
				left: -1.4rem;
				top: 50%;
				margin-top: -0.8rem;
			}
		}
		.user_li {
			.user_lab {
				width: 12%;
				text-align: center;
				line-height: 4rem;
				font-size: 1.4rem;
				padding-left: 2%;
				border-right: 0.2rem solid #332c1c;
			}
			.common_put {
				padding-left: 18%;
			}
		}
	}
</style>