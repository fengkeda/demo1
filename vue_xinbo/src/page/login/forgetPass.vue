<template>
	<div class="forgetPass">
		<div class="bg_zong"></div>
		<header-div :service='service' :goback='goback'><span class="header_txt">忘记密码</span></header-div>
		<ul class="common_list forget_list">
			<li>
				<input type="submit" class="common_put com_btn" value="短信找回密码" @click='show()'/>
			</li>
			<!--<li>-->
				<!--<input type="submit" class="common_put com_btn" value="在线客服找回密码" />-->
			<!--</li>-->

		</ul>

		<div class="popup_findPass" v-show='show_popup'>
			<div class="findPass_txt">
				<img src="../../assets/Android/drawable-xhdpi/dx_findPass.png" class="left" />
				<span class="left">短信找回密码</span>
				<i class="right" @click='show()' >X</i>
			</div>
			<ul class="common_list">
				<li class="common_li">
					<input type="text" placeholder="输入您注册的会员账号" class="common_put" v-model="username" />
				</li>
				<li>
					<input type="text" placeholder="请输入您收到的验证码" class="common_put" style="width: 60%;float: left;" v-model="phoneVerify"/>
					<button  class="common_put com_btn"  style="width: 39%;float: right;font-size: 1.5rem" :disabled="disabled"	:class="disabled?'send_bg':''" @click="getRetrievalPasswdPhoneVerify">{{code_txt}}</button><!--send_bg-->
				</li>
				<li class="common_li">
					<input type="password" placeholder="新密码" class="common_put" v-model="password" />
				</li>
				<li class="common_li">
					<input type="password" placeholder="确认新密码" class="common_put" v-model="cof_password" />
				</li>
				<li>
					<button  class="common_put com_btn"  style="" :disabled="disabled"	:class="btn_disabled?'send_bg':''" @click="subRetrievalPasswd">{{btn_text}}</button><!--send_bg-->
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import HeaderDiv from '@/components/header/head'

	export default {
		name: 'forgetPass',
		components: {
			HeaderDiv,
		},
		data() {
			return {
				code_img: '',
				goback: true,
				service: true,
				logged: true,
				show_popup:false,
                disabled: false,
                btn_disabled: false,
                code_txt: '获取验证码',
				btn_text:'提交',
				/*  填写资料 */
				username:'',
                phoneVerify:'',
				password:'',
				cof_password:'',
			}
			
		},
		methods:{
		    /* 提交重置密码 */
		    subRetrievalPasswd(){
                let self = this;
                self.btn_text = '提交中···';
                self.btn_disabled = true;
                this.axios.post('api/subRetrievalPasswdApi',{
                    username:self.username,
                    password:self.password,
                    phoneVerify:self.phoneVerify,
                    cof_password:self.cof_password,
                },{needToken:true}).then(function(res){
                    self.btn_text = '提交';
                    self.btn_disabled = false;
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
			/* 获取验证码 */
            getRetrievalPasswdPhoneVerify() {
                let self = this;
                self.code_txt = '发送中···';
                self.disabled = true;
                this.axios.post('api/getRetrievalPasswdPhoneVerifyApi',{
                    username:self.username,
				},{needToken:true,notLoading:true}).then(function(res){
                    let lay = self.$layer.open({
                        content: res.data.msg,
                        btn: '确定',
                        shadeClose: false,
                        yes: function(){
                            layer.close(lay);
                        }
                    });
                    if(res.data.status == 1) {
                        self.time = 60;
                        self.code_txt = '发送成功';
                        self.disabled = true;
                        self.timer();
                    }else{
                        self.code_txt = '获取验证码';
                        self.disabled = false;
                    }
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
			show(){
				this.show_popup = !this.show_popup;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	@import 'src/style/login_common';
	.forgetPass {
		@include wh(100%, 100%);
		position: relative;
		.forget_list {
			padding-top: 3rem;
		}
		.popup_findPass {
			@include wh(90%, 33rem);
			background: #eeeeee;
			@include cl;
			z-index: 999;
			top: 40%;
			padding: 0;
			.findPass_txt {
				@include wh(100%, 4rem);
				background: #4c3e24;
				img {
					width: 2rem;
					display: inline-block;
					margin-top: 0.6rem;
					margin-left: 2.2rem;
				}
				span {
					color: #fe9900;
					display: inline-block;
					line-height: 4rem;
					font-size: 1.6rem;
					font-style: oblique;
					margin-left: 0.5rem;
				}
				i {
					color: #fff;
					font-size: 2rem;
					font-weight: normal;
					margin-right: 2rem;
					line-height: 4rem;
				}
			}
		}
		.common_list{
			padding-top: 2rem;
		li{
			width: 90%;
			margin-bottom: 1rem;
			input{box-shadow: none;}
			.send_bg{
				background: #cccccc;
				font-size: 1.2rem;
				color: #666;}
		}
		}
	}
</style>