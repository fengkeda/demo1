<template>
	<div class="join">
		<head-top :goback='goback' :service='service' :logged='logged'>
			<span class="header_title">加盟注册</span>
		</head-top>
		<div class="bg_2"></div>
		<section>
			<div class="join_hint">
				<h3>尊敬的客户，您好！</h3>
				<p>欢迎您与我们进行合作，请填写下面申请表格并提交，我们的工作人员会在2日内审核完您的资料并与您联系，请保持您的联系方式畅通。</p>
				<h4>*以下所有项目属于必填项</h4>
			</div>
				<ul class="common_list join_list">
					<li class="common_li margin_none_li">
						<label class="common_li_lab">
					    	<img src="../../assets/Android/drawable-xhdpi/dl_Account-number-icon.png"/>
					    	 <span class="register_mess_txt">代理姓名</span>
					   </label>
						<input type="text" class="common_put" v-model='agency_user' name='agency_user' v-validate="'required|agency_user'"/>
						
						<div class="b_error" v-if="errors.has('agency_user')">
							<p class="error_text">{{errors.first('agency_user')}}
							</p>
						</div>
					</li>
					<span class="warning_mess">*将为作为日后提款信息，一经注册不可更改。</span>
					<li class="common_li margin_none_li">
						<label class="common_li_lab">
					    	<img src="../../assets/Android/drawable-xhdpi/zc_Mobile-phone-icon.png"/>
					    	 <span class="register_mess_txt">手机号码</span>
					    </label>
						<input type="text" class="common_put" v-model='agency_phone' name='mobile' v-validate="'required|mobile'"/>
						<div class="b_error" v-if="errors.has('mobile')">
							<p class="error_text">{{errors.first('mobile')}}
							</p>
						</div>
					</li>
					<span class="warning_mess">*审查通过后，将与您联系。</span>

					<li class="common_li">
						<label class="common_li_lab">
					    	<img src="../../assets/Android/drawable-xhdpi/dl_Account-number-icon.png"/>
					    	 <span class="register_mess_txt">私人QQ</span>
					    </label>
						<input type="number" class="common_put" v-model='agency_qq' name='qq' v-validate="'required|min:5'"/>
						
						<div class="b_error" v-if="errors.has('qq')">
							<p class="error_text">{{errors.first('qq')}}
							</p>
						</div>
					</li>
					<li class="common_li">
						<label class="common_li_lab">
					    	<img src="../../assets/Android/drawable-xhdpi/dl_Account-number-icon.png"/>
					    	 <span class="register_mess_txt">微信号</span>
					    </label>

						<input type="text" class="common_put" v-model='agency_weixin' name='weixin' v-validate="'required|min:5'"/>
						
						<div class="b_error" v-if="errors.has('weixin')">
							<p class="error_text">{{errors.first('weixin')}}
							</p>
						</div>
					</li>
					<li class="common_li margin_none_li" >
						<label class="common_li_lab">
					    	<img src="../../assets/Android/drawable-xhdpi/dl_Account-number-icon.png"/>
					    	 <span class="register_mess_txt">电子邮件</span>
					    </label>

						<input type="text" class="common_put" v-model='agency_email' name='email' v-validate="'required|email'"/>
                   
                   	<div class="b_error" v-if="errors.has('email')">
							<p class="error_text">{{errors.first('email')}}
							</p>
						</div>
					</li>
						<span class="warning_mess">*请提供一个有效的邮件地址，以方便检索账号、密码信息。</span>
					
					<li class="common_li">
						<label class="common_li_lab">
					    	<img src="../../assets/Android/drawable-xhdpi/dl_Account-number-icon.png"/>
					    	 <span class="register_mess_txt">所在地区</span>
					    </label>

						<input type="text" class="common_put" v-model='agency_address' name='agency_address' v-validate="'required'"/>
						
						
                   	<div class="b_error" v-if="errors.has('agency_address')">
							<p class="error_text">{{errors.first('agency_address')}}
							</p>
						</div>
					</li>
					<li class="common_li lastLi_submit">
						<input type="submit" value="提   交" @click="validateBeforeSubmit()"/>
					</li>

				</ul>
		</section>
		<foot></foot>
	</div>
</template>

<script>
	import HeadTop from '@/components/header/head'
	import Foot from '@/components/footer/footer'

	export default {
		name: 'join',
		data() {
			return {
				back: 1,
				goback: true,
				service: true,
				logged: true,
				sidbar: true,
				agency_user:'',
				agency_phone:'',
				agency_qq:'',
				agency_weixin:'',
				agency_email:'',
				agency_address:'',
			}
		},
		components: {
			HeadTop,
			Foot
		},
        methods:{
            validateBeforeSubmit() {
                this.$validator.validateAll().then((result) => {
                    if(result) {
                        let self = this;
                        this.axios.post('api/subJoinAgentApi',{
                            agentName:self.agency_user,
                            agentPhone:self.agency_phone,
                            agentQQ:self.agency_qq,
                            agentWechat:self.agency_weixin,
                            agentEmail:self.agency_email,
                            agentAddress:self.agency_address,
                        }).then((response) => {
                            if(response.data.status == 1){
                                let lay = self.$layer.open({
                                    content: '提交成功',
                                    btn: '确定',
                                    shadeClose: false,
                                    yes: function(){
                                        layer.close(lay);
                                        self.$router.push({path:'/agency'});
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
                                }
                            });
                        }).catch(function(error){
                            console.log(error);
                            let lay = self.$layer.open({
                                content: '提交失败！',
                                btn: '确定',
                                shadeClose: false,
                                yes: function(){
                                    layer.close(lay);
                                }
                            });
                        })
                    }
                })
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	@import 'src/style/login_common';
	@import '../../style/agency_common';
	@import 'src/style/error';
	
	.join {
		@include wh(100%, 100%);
		position: relative;
		.header_title {
			display: inline-block;
			color: #fff;
			font-size: 1.8rem;
			@include center;
		}
		.join_hint {
			width: 100%;
			overflow: hidden;
			padding: 0.5rem 2rem;
			background: #eeeeee;
			position: relative;
			h3 {
				font-size: 1.4rem;
				font-weight: bold;
				line-height: 2rem;
			}
			p {
				line-height: 1.4rem;
				margin-bottom: 1rem;
				margin-top: 0.5rem;
				font-size: 1rem;
			}
			h4 {
				line-height: 2rem;
				font-size: 1rem;
			}
		}
		.join_list {
			width: 100%;
			overflow: hidden;
			padding-top: 3rem;
			position: relative;
			.common_li {
				@include wh(80%, 3.5rem);
				.common_put {
					box-shadow: none;
					padding-left: 32%;
				}
				.common_li_lab {
					@include wh(30%, 3.5rem);
					position: absolute;
					border: none;
					img {
						width: 1.05rem;
						@include cr;
						left: 16%;
					}
					.register_mess_txt {
						@include cr;
						left: 33%;
						font-size: 1rem;
						color: #666;
					}
				}
			}
				.warning_mess {
					display: block;
					width: 70%;
					overflow: hidden;
					margin: 0.5rem auto;
                   	
					color: #999997;
				}
			.lastLi_submit {
				input {
					@include wh(100%,100%);
					border-radius: 4rem;
					font-size: 1.6rem;
					background: #ff9900;
				}
			}
			.margin_none_li{
				
				margin-bottom:0 ;
			}
		}
	}
</style>