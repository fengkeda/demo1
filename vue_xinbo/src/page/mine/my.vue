<template>
	<div>
		<head-top :logged="logged" :service="service" :sidbar='sidbar' :showMenu='showMenu'>
			<span class="core">个人中心</span>
		</head-top>
		<div class="my_core">
			<div id="remain" class="remain">
				<p class="lance">
					<span>余额:</span><span class="num1">{{money}}</span>
				</p>
				<p class="cred">
					<span>积分:</span><span class="num2">{{score}}</span>
				</p>
			</div>
			<div class="operate">
				<section @click="checkDeposit">
					<router-link to="" class="link">
						<p class="cun"><img src="../../assets/Android/drawable-xhdpi/gr_Recharge-icon.png"/></p>
						<span>充 &nbsp; &nbsp;值</span>
					</router-link>
				</section>
				<section>
					<router-link to="/indoor" class="link">
						<p class="zhuan"><img src="../../assets/Android/drawable-xhdpi/gr_Transfer-accounts-icon.png"/></p>
						<span>户内转账</span>
					</router-link>
				</section>
				<section>
					<router-link to="/drawing" class="link">
						<p><img src="../../assets/Android/drawable-xhdpi/gr_drawing-icon.png"/></p>
						<span>提 &nbsp; &nbsp;款</span>
					</router-link>
				</section>
			</div>
			<ul class="my_list">
				<li>
					<router-link to="/about" class="link">
						<div class="ico">
							<img src="../../assets/Android/drawable-xhdpi/gr_personal-icon-1.png"/>
						</div>
						<span>个人资料</span>
						<i class="iconfont icon-back"></i>
					</router-link>
				</li>
				<li>
					<router-link to="/bank_card" class="link">
						<div class="ico">
							<img src="../../assets/Android/drawable-xhdpi/gr_Bank-card-icon1.png"/>
						</div>
						<span>绑定银行卡</span>
						<i class="iconfont icon-back"></i>
					</router-link>
				</li>
				<li>
					<router-link to="/record" class="link">
						<div class="ico">
							<img src="../../assets/Android/drawable-xhdpi/gr_Detailed-list-icon1.png"/>
						</div>
						<span>账户清单</span>
						<i class="iconfont icon-back"></i>
					</router-link>
				</li>
				<li @click="showEixt=true">
					<router-link to="" class="link">
						<div class="ico">
							<img src="../../assets/Android/drawable-xhdpi/gr_Sign-out-icon1.png"/>
						</div>
						<span>退出登录</span>
						<i class="iconfont icon-back"></i>
					</router-link>
				</li>
			</ul>
		</div>
		<!--退出登录-->
		<div class="pop" v-if="showEixt">
			<div class="sen">
				<hgroup class="caption">
					<span>温馨提示</span>
					<i class="iconfont icon-close" @click="showEixt=false"></i>
				</hgroup>
				<section>
					<p>确定退出</p>
					<button class="btn2" @click="tuichu()">确定</button>
				</section>
			</div>
		</div>
		<foot></foot>
	</div>
</template>

<script>
	import HeadTop from '@/components/header/head'
	import Foot from '@/components/footer/footer'
	import bus from '@/assets/eventBus.js'
	export default{
		data(){
			return{
				logged:true,
				service:true,
				showEixt:false,
				money:'',
				score:'',
                sidbar: true,
                showPopup: true,
                showMenu: true,
			}
		},
		created(){
			this.getMember();
		},
		methods:{
			//用户退出
			tuichu(){
			    //console.log('exit');
				this.showEixt=false;
                localStorage.clear();
				this.$router.push({path:'/login'});
			},
			//请求获取用户信息
            getMember(){
                let self = this;
				this.axios.get('api/getMemberApi',{needToken:true}).then(function(res){
					if(res.data.status == 1){
						let data = res.data.content.member;
						self.score = data.score;
						self.money = data.money;
						return;
					}
				}).catch(function(error){
//					console.log('获取信息失败')
				})
			},
			//验证哪个充值渠道可用
			checkDeposit(){
				let self = this;
				this.axios.get('api/checkDepositApi',{needToken:true}).then(function(res){
					console.log(res.data);
					if (res.data.status == '-1') {
						alert(res.data.msg);
						sessionStorage.removeItem('refreshToken');
						sessionStorage.removeItem('accessToken');
						sessionStorage.removeItem('singleToken');
						this.$router.push({path:'/login'});
						return;
					}
					//获取扫码页面的信息
					if (res.data.content.QR=='1') {
                        self.$router.push({path:'/pay/wechat'});
					}else if (res.data.content.online =='1') {
                        self.$router.push({path:'/pay/onlinePay'});
					}else if (res.data.content.manual =='1') {
                        self.$router.push({path:'/pay/mt'});
					}
				});
			}
		},
		components:{
			HeadTop,Foot
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
	.my_core{
		width: 100%;overflow: hidden;
		.remain{
			width: 100%;height: 11rem;
			position: relative;
			@include bis('../../../static/bg_img/gr_back_1.png');
			p{
				width: 31%;height: 2rem;
				position: absolute;
				background: rgb(188,124,18);
				text-align: center;line-height: 2rem;
				border-radius: 0.8rem;opacity: 0.8;
				span{
					font-size: 1.2rem;
					font-weight: 600;
				}
				bottom: 8%;
			}
			.lance{
				right: 38%;
			}
			.cred{right: 5%;}
		}
		.operate{
			width: 100%;height: 5rem;background:#fff;
			display: flex;
			section{
				border: 1px solid rgb(204,204,204);
				height: 3rem;float: left;border-radius: 0.7rem;
				flex: 1;margin-top: 1rem;position: relative;
				p{
					width: 2rem;float: left;@include ct;
					margin-left: 0.5rem;
				}
				.cun,.zhuan{
					width: 1.6rem;
				}
				span{
					height: 3rem;line-height: 3rem;display: block;float: right;
					width: 80%;
					font-size: 1.3rem;text-align: center;
				}
				.link{
					width: 100%;
					height: 3rem;
					display: block;
					border-radius:0.7rem ;
				}
			}
			section:nth-child(2){
				margin:1rem 1rem 0;
			}
			section:nth-child(1){
				margin-left:1rem;
			}
			section:nth-child(3){
				margin-right:1rem;
			}
		}
		.my_list{
			width: 100%;
			padding: 2rem 4rem 0;overflow: hidden;
			li{
				width: 100%;height: 3.6rem;background: #fff;line-height: 3.6rem;
				margin-bottom: 1.7rem;border-radius: 2rem;position: relative;
				.link{
					display: block;width: 100%;height: 3.6rem;
				}
				.ico{
					width: 2.5rem;float: left;@include ct;
					margin-left: 1.5rem;
				}
				span{
					font-size: 1.4rem;@include center;
				}
				i{float: right;margin-right: 1.5rem;}
			}
		}
	}
	.pop{
		position:fixed;width: 100%;
		height: 100%;background: rgba(0,0,0,0.3);
		left: 0;top: 0;right: 0;z-index: 999;
		.sen{
			width: 90%;
			height: 20rem;
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
				p{
					text-align: center;
					font-size: 2rem;
					margin-top: 4rem;
				}
				.btn2{
					width: 30%;
					margin-left: 35%;
					margin-top: 3rem;
					height: 3rem;
					background: rgb(76,62,36);
					color: rgb(255,153,0);
					font-size: 1.6rem;
					font-weight: 600;
				}
			}
		}
	}
</style>