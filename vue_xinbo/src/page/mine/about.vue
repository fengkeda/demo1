<template>
	<div>
		<head-top :logged="logged" :goback="goback" :service="service">
			<span class="core">个人资料</span>
		</head-top>
		<notice></notice>
		<div class="datum">
			<ul class="ab_list">
				<li>
					<div class="textSpan"><i>会员账号：</i></div>
					<span>{{username_text}}</span>
				</li>
				<li @click="toBankCard">
					<div class="textSpan"><i>真实姓名：</i></div>
					<span>{{cn_name_text}}</span>
					<i class="iconfont icon-back"></i>
				</li>
				<li @click="isPhone=true">
					<div class="textSpan"><i>手机号：</i></div>
					<span>{{phone_text}}</span>
					<i class="iconfont icon-back"></i>
				</li>
				<li @click="info=true">
					<div class="textSpan"><i>生&nbsp;&nbsp;&nbsp;日：</i></div>
					<span>{{birthday_text}}</span>
					<i class="iconfont icon-back"></i>
				</li>
				<li @click="info=true">
					<div class="textSpan"><i>微信号：</i></div>
					<span>{{weixin_text}}</span>
					<i class="iconfont icon-back"></i>
				</li>
				<li @click="info=true">
					<div class="textSpan"><i>QQ&nbsp;号：</i></div>
					<span>{{qq_text}}</span>
					<i class="iconfont icon-back"></i>
				</li>
				<li @click="info=true">
					<div class="textSpan"><i>邮&nbsp;&nbsp;&nbsp;箱：</i></div>
					<span>{{email_text}}</span>
					<i class="iconfont icon-back"></i>
				</li>
				<li @click="trade_pass=true">
					<div class="textSpan"><i>交易口令：</i></div>
					<span v-if="is_trade_passwd">已设置</span>
					<span v-else>未设置</span>
					<i class="iconfont icon-back"></i>
				</li>
				<li @click="pass=true">
					<div class="textSpan"><i>登录密码：</i></div>
					<span>点击更改</span>
					<i class="iconfont icon-back"></i>
				</li>
			</ul>
		</div>
		<!--修改手机号码-->
		<div class="pop" v-if="isPhone">
			<div class="sen">
				<hgroup class="caption">
					<img src="../../assets/Android/drawable-xhdpi/wd_houji.png"/>
					<span>修改手机号码</span>
					<i class="iconfont icon-close" @click="isPhone=false"></i>
				</hgroup>
				<section>
					<!--<p class="p1">*一经填写不可修改，为了您以后的出款安全，请填写真实信息</p>-->
					<input class="ipt2" type="text" placeholder="手机验证码" v-model="verify_phone" />
					<button class="btn1" :disabled="phone_disabled"  @click='getMemberPhoneVerify()'>{{trade_passwd_verify_txt}}</button>
					<input class="ipt3" type="tel" placeholder="新手机号" v-model="phone"/>
					<button class="btn2" @click="subUpdatePhone" :disabled="disabled">{{btn_text}}</button>
				</section>
			</div>
		</div>
		<!--修改联系方式-->
		<div class="pop" v-if="info && info_disabled">
			<div class="sen">
				<hgroup class="caption">
					<img src="../../assets/Android/drawable-xhdpi/wechat.png"/>
					<span>修改联系方式</span>
					<i class="iconfont icon-close" @click="info=false"></i>
				</hgroup>
				<section>
					<div  v-if="birthday_text == '点击设置'" class="lab">
						<el-date-picker
								class="ipt1"
								v-model="birthday"
								type="date"
								placeholder="选择生日">
						</el-date-picker>
						<!--<input class="ipt1" type="text" placeholder="生日" v-model="birthday"/>-->
						<p class="p1"></p>
					</div>
					<div  v-if="weixin_text == '点击绑定'">
						<input class="ipt1" type="text" placeholder="微信号" v-model="weixin"/>
						<p class="p1"></p>
					</div>
					<div  v-if="qq_text == '点击绑定'">
						<input class="ipt1" type="text" placeholder="QQ号" v-model="qq"/>
						<p class="p1"></p>
					</div>
					<div  v-if="email_text == '点击绑定'">
						<input class="ipt1" type="text" placeholder="电子邮箱" v-model="email"/>
						<p class="p1"></p>
					</div>
					<button class="btn2" @click="subUpdateContactInfo" :disabled="disabled">{{btn_text}}</button>
				</section>
			</div>
		</div>
		<!--修改交易口令-->
		<div class="pop" v-if="trade_pass">
			<div class="sen">
				<hgroup class="caption">
					<img src="../../assets/Android/drawable-xhdpi/Passwor.png"/>
					<span>修改交易口令</span>
					<i class="iconfont icon-close" @click="trade_pass=false"></i>
				</hgroup>
				<section>
                    <div  v-if="is_trade_passwd" >
                        <input class="ipt1" type="password" placeholder="旧交易口令" v-model="old_trade_passwd"/>
                        <p class="p1"></p>
                        <input class="ipt2" type="text" placeholder="手机验证码" v-model="verify_phone"/>
                        <button class="btn1" :disabled="phone_disabled"  @click='getMemberPhoneVerify()'>{{trade_passwd_verify_txt}}</button>
                        <p class="p1"></p>
                    </div>

					<input class="ipt1" type="password" placeholder="交易口令" v-model="trade_passwd"/>
					<p class="p1"></p>
					<input class="ipt1" type="password" placeholder="确认交易口令" v-model="crf_trade_passwd"/>
					<p class="p1"></p>

                    <button class="btn2" @click="subUpdateTradePass" :disabled="disabled">{{btn_text}}</button>
				</section>
			</div>
		</div>
		<!--修改登录密码-->
		<div class="pop" v-if="pass">
			<div class="sen">
				<hgroup class="caption">
					<img src="../../assets/Android/drawable-xhdpi/password_.png"/>
					<span>修改登录密码</span>
					<i class="iconfont icon-close" @click="pass=false"></i>
				</hgroup>
				<section>
					<input class="ipt1" type="password" placeholder="旧登录密码" v-model="password"/>
					<p class="p1"></p>
					<input class="ipt1" type="password" placeholder="新登录密码" v-model="newPassword" />
					<p class="p1"></p>
					<input class="ipt1" type="password" placeholder="确认新登录密码" v-model="cof_newPassword"/>
					<p class="p1"></p>
					<button class="btn2" @click="subUpdateLoginPass" :disabled="disabled">{{btn_text}}</button>
				</section>
			</div>
		</div>
		<foot></foot>
	</div>
</template>

<script>
	import HeadTop from '@/components/header/head'
	import Foot from '@/components/footer/footer'
	import Notice from '@/components/common/notice'
	export default{
		data(){
			return{
				goback:true, //返回
				logged:true, //奖牌
				service:true, //按钮
				isPhone:false,	//控制手机号的弹出框
                info:false,	//控制联系信息的弹出框
                trade_pass:false,	//控制口令的弹出框
				pass:false,	//控制密码的弹出框
				/* 获取新的信息 */
				cn_name_text:'',
				weixin_text:'点击绑定',
				qq_text:'点击绑定',
				email_text:'点击绑定',
                birthday_text:'点击设置',
				is_trade_passwd:false,
				username_text:'',
				phone_text:'',
				/* 登录密码 */
                password:'',	/* 旧密码 */
                newPassword:'',	/* 新密码 */
                cof_newPassword:'',/* 确认新密码 */
				/* 交易密码 */
                old_trade_passwd:'',  /* 旧交易密码 */
                trade_passwd:'',	 /* 交易密码 */
                crf_trade_passwd:'', /* 确认交易密码 */
				/* 更换手机号码 */
				phone:'',
				/* 更换微信等联系信息 */
				weixin:'',
				qq:'',
				email:'',
                birthday:'',
				info_disabled : true,

                verify_phone:'',	/* 手机验证码 */
                trade_passwd_verify_txt: '获取验证码',
                phone_disabled: false,
                disabled:false,
				btn_text:'提交',
			}
		},
        created(){
            this.getMember();
        },
        methods: {
            //请求获取用户信息
            getMember(){
                let self = this;
                this.axios.get('api/getMemberApi', {needToken: true}).then(function (res) {
                    if (res.data.status == 1) {
                        let data = res.data.content.member;
                        self.cn_name_text = data.cn_name;
                        self.username_text = data.username;
                        if(data.weixin) self.weixin_text = data.weixin;
                        if(data.qq) self.qq_text = data.qq;
                        if(data.email) self.email_text = data.email;
                        if(data.birthday) self.birthday_text = data.birthday;
                        self.is_trade_passwd = data.is_trade_passwd;
                        self.phone_text = data.phone;

                        if (self.weixin_text != '点击绑定' && self.qq_text != '点击绑定' && self.email_text != '点击绑定' && self.birthday_text != '点击绑定')
                            self.info_disabled = false;
                        return;
                    }
                }).catch(function (error) {
					console.log('获取信息失败')
                })
            },
			/* 跳转绑定银行卡页面 */
			toBankCard(){
                this.$router.push({path:'/bank_card'});
			},
			/* 修改登录密码 */
            subUpdateLoginPass(){
                let self = this;
                self.disabled = true;
                self.btn_text = '提交中···';
                this.axios.post('api/subUpdateLoginPassApi', {
                    password:self.password,	/* 旧密码 */
                    newPassword:self.newPassword,	/* 新密码 */
                    cof_newPassword:self.cof_newPassword,/* 确认新密码 */
				},{needToken: true}).then(function (res) {
                    let lay = self.$layer.open({
                        content: res.data.msg,
                        btn: '确定',
                        shadeClose: false,
                        yes: function(){
                            layer.close(lay);
                            self.disabled = false;
                            self.btn_text = '提交';
                            self.password = '';	/* 旧密码 */
                            self.newPassword = '';	/* 新密码 */
                            self.cof_newPassword = '';/* 确认新密码 */
                            if (res.data.status == '1') self.pass = false;
                        }
                    });
                }).catch(function (error) {
                    console.log('获取信息失败')
                })
			},
			/* 修改登录密码 */
            subUpdatePhone(){
                let self = this;
                self.disabled = true;
                self.btn_text = '提交中···';
                this.axios.post('api/subUpdatePhoneApi', {
                    phone:self.phone,/* 手机号码 */
                    verify_phone:self.verify_phone,/* 手机验证码 */
				},{needToken: true}).then(function (res) {
                    let lay = self.$layer.open({
                        content: res.data.msg,
                        btn: '确定',
                        shadeClose: false,
                        yes: function(){
                            layer.close(lay);
                            self.disabled = false;
                            self.btn_text = '提交';
                            self.phone = '';	/* 旧密码 */
                            if (res.data.status == '1'){
                                self.isPhone = false;
                                self.phone_text = res.data.content.phone;
                            }
                        }
                    });

                }).catch(function (error) {
                    console.log('获取信息失败')
                })
			},
			/* 修改登录密码 */
            subUpdateTradePass(){
                let self = this;
                self.disabled = true;
                self.btn_text = '提交中···';
                this.axios.post('api/subUpdateTradePassApi', {
                    old_trade_passwd:self.old_trade_passwd,	/* 旧密码 */
                    trade_passwd:self.trade_passwd,	/* 新密码 */
                    crf_trade_passwd:self.crf_trade_passwd,/* 确认新密码 */
                    verify_phone:self.verify_phone,/* 手机验证码 */
                },{needToken: true}).then(function (res) {
                    let lay = self.$layer.open({
                        content: res.data.msg,
                        btn: '确定',
                        shadeClose: false,
                        yes: function(){
                            layer.close(lay);
                            self.disabled = false;
                            self.btn_text = '提交';
                            self.old_trade_passwd = '';	/* 旧密码 */
                            self.trade_passwd = '';	/* 新密码 */
                            self.crf_trade_passwd = '';/* 确认新密码 */
                            if (res.data.status == '1'){
                                self.trade_pass = false;
                                self.is_trade_passwd = true;
                            }
                        }
                    });
                }).catch(function (error) {
                    console.log('获取信息失败')
                })
			},
            /* 获取验证码 */
            getMemberPhoneVerify() {
                let self = this;
                this.axios.post('api/getMemberPhoneVerifyApi', {},{needToken:true}).then(function(res) {
                    console.log(res);
                    if(res.data.status == 1) {
                        self.time = 60;
                        self.trade_passwd_verify_txt = '发送成功';
                        self.phone_disabled = true;
                        self.timer();
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
                    this.trade_passwd_verify_txt = '(' + this.time + 's)重新发送';
                    setTimeout(this.timer, 1000);
                    return;
                }
                this.time = 0;
                this.phone_disabled = false;
                this.trade_passwd_verify_txt = '获取验证码';
            },

			/* 修改联系方式 */
            subUpdateContactInfo(){
                let self = this;
                self.disabled = true;
                self.btn_text = '提交中···';
                this.axios.post('api/subUpdateContactInfoApi', {
                    weixin:self.weixin,	/* 微信 */
                    qq:self.qq,	/* QQ */
                    email:self.email,/* 邮箱 */
                    birthday:self.birthday,/* 生日号码 */
                },{needToken: true}).then(function (res) {
                    let lay = self.$layer.open({
                        content: res.data.msg,
                        btn: '确定',
                        shadeClose: false,
                        yes: function(){
                            layer.close(lay);
                            self.disabled = false;
                            self.btn_text = '提交';
                            if (res.data.status == '1'){
                                self.info_disabled = false;
                                self.weixin_text = res.data.content.member.weixin;
                                self.qq_text = res.data.content.member.qq;
                                self.email_text = res.data.content.member.email;
                                self.birthday_text = res.data.content.member.birthday;
                            }
                        }
                    });
                }).catch(function (error) {
                    console.log('获取信息失败')
                })
            },
        },
		mounted(){
			//使底部导航栏中的我的处于选中状态
			$('#wode i').css('color','rgb(241,151,25)');
			$('#wode span').css('color','rgb(241,151,25)');
		},
		components:{
			HeadTop,Foot,Notice
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	.core{
		display: inline-block;
		color: #fff;
		font-size: 1.8rem;
		@include center;
	}
	.lab{
		width:100%;
		height:3.5rem;
		margin-bottom:2rem;
		background:#fff;
		border-radius:1.5rem;
		line-height:3.5rem;
		padding: 0 1.5rem;
		font-size:1.4rem;
		span{
			font-size: 1.4rem;
		}
		i{float: right;}
		input{
			font-size: 1.4rem;
			width: 65%;
		}
	}
	.datum{
		overflow: hidden;
		.ab_list{
			padding: 1rem 2rem 0;
			overflow: hidden;
			li{
				border: 1px solid rgb(203,203,203);
				height: 4rem;width: 100%;border-radius:2rem ;
				margin-bottom: 1.5rem;padding: 0 1rem;
				i,span{font-size: 1.6rem;line-height: 4rem;}
				.iconfont{float: right;}
				.textSpan{width: 35%;float: left;text-align: right}
			}
		}
	}
	.pop{
		position:fixed;width: 100%;
		height: 100%;background: rgba(0,0,0,0.3);
		left: 0;top: 0;right: 0;z-index: 999;
		.sen{
			width: 90%;
			@include center;
			background: rgb(238,238,238);
			.caption{
				width: 100%;height: 3.5rem;
				background: rgb(76,62,36);position: relative;
				img{width: 2rem;@include ct;margin-left: 1rem;}
				span{color: rgb(255,153,0);font-size: 1.5rem;@include ct;margin-left: 3.3rem;font-weight: 600;}
				i{color: #fff;@include ct;right: 1.5rem;font-size: 1.5rem;}
			}
			section{
				padding: 3rem 5% 2rem;
				.ipt1,.ipt2,.ipt3{
					width: 100%;height: 3.5rem;font-size: 1.5rem;
					border-radius:1.3rem;padding: 0 1rem;
					border: none;
				}
				.ipt3{margin: 2rem 0;}
				p{color: rgb(178,178,178);font-size: 1rem;margin-bottom: 2rem;margin-top: 0.4rem;}
				.ipt2{
					width: 55%;
				}
				.btn1{width: 40%;margin-left: 3%;height: 3.5rem;border-radius: 1.3rem;background: #fff;font-size: 1.5rem;}
				.btn2{width: 100%;height: 3.5rem;background: rgb(76,62,36);font-size: 1.5rem;
					text-align: center;line-height: 3.5rem;color: #fff;border-radius: 0.8rem;}
			}
		}
	}
</style>