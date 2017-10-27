<template>
	<div id="">
		<header id="head_top">
			<!--返回按钮-->
			<section class="head_goback left" v-if="goback" @click="returnBack">
				<i class="iconfont icon-fanhui"></i>
				<span>返回</span>
			</section>
			<!--唤出侧边栏按钮-->
			<section class="head_more left" v-if="sidbar" @click="show_leftMenu()">
				<img src="../../assets/Android/drawable-xhdpi/zc_More-buttons-1.png" />
			</section>
			<!--显示中间文字或突变的插槽-->
			<slot></slot>
			<!--客服按钮-->
			<section class="head_service right" v-if="service" @click="kefu=true">
				<img src="../../assets/Android/drawable-xhdpi/zc_Telephone-icon-1.png">
				<span>客服</span>
			</section>
			<section class="left_menu" v-if='showMenu'>
				<span class="close_menu" @click="close_leftMenu()"> </span>
				<img src="../../assets/Android/drawable-xhdpi/zc_xinbo_logo.png" class="menu_logo" />
				<ul class="left_menu_nav">
					<li>
						<router-link to='/my'>
							<div class="li_txt">
								<span class="iconfont icon-gerenziliao"></span>
								<label>账户中心</label>
							</div>
						</router-link>
					</li>
					<li>
						<router-link to='/about'>
							<div class="li_txt">
								<span class="iconfont icon-gerenzhengxinziliao"></span>
								<label>个人资料</label>
							</div>
						</router-link>
					</li>
					<li>
						<router-link to='/bank_card'>
							<div class="li_txt">
								<span class="iconfont icon-yinhangqia"></span>
								<label>绑定银行卡</label>
							</div>
						</router-link>

					</li>
					<li>
						<router-link to='record'>
							<div class="li_txt">
								<span class="iconfont icon-zhangdan"></span>
								<label>账户清单</label>
							</div>
						</router-link>

					</li>
					<li @click='show_computer'>
						<div class="li_txt">
							<span class="iconfont icon-diannao"></span>
							<label>进入电脑版</label>
						</div>

					</li>
					<li @click='show_exit'>
						<div class="li_txt">
							<span class="iconfont icon-tuichu"></span>
							<label>退出登录</label>
						</div>
					</li>
				</ul>
			</section>

			<div class="aiglo" @touchmove.prevent v-if='zhezhao'></div>

			<div class="popup_home" v-if='showEixt'>
				<div class="findPass_txt">
					<span class="left">温馨提示</span>
					<i class="right" @click='close_exit'>X</i>
				</div>
				<ul class="txt_list">
					<li class="center" >您确定要退出吗？</li>

				</ul>
				<button @click='remove_token()'>确    定</button>
			</div>

			<div class="popup_home computer_popup" v-if='showConputer'>
				<div class="findPass_txt">
					<span class="left">温馨提示</span>
					<i class="right" @click='close_computer'>X</i>
				</div>
				<button @click=''>立即进入电脑网页版</button>
				<button @click='close_computer'>取      &nbsp;&nbsp;消</button>

			</div>

		</header>
		<!--查询客服-->
		<section v-if="kefu" class="xunwen">
			<i class="iconfont icon-close" @click="kefu=false"></i>
			<ul>
				<li>
					<i class="iconfont icon-kefu"></i>
					<span>在线客服</span>
				</li>
				<li @click="openqq">
					<i class="iconfont icon-qq"></i>
					<span>QQ客服</span>
					<span>1246927722</span>
					<span>1251481122</span>
				</li>
				<li @click="openph">
					<i class="iconfont icon-dianhua"></i>
					<span>电话回拨</span>
				</li>
				<li>
					<i class="iconfont icon-youxiang"></i>
					<span>客服邮箱</span>
				</li>
				<li>
					<i class="iconfont icon-yingdaicon04"></i>
					<span>微信号</span>
					<img src="../../assets/Android/drawable-xhdpi/loading.gif"/>
				</li>
				<li>

				</li>
			</ul>
		</section>
		<!--电话回拨-->
		<div class="pop" v-if="phone">
			<div class="sen">
				<p>电话回拨</p>
				<div class="zhu">
					<label>
						<span>联系号码:</span>
						<input type="tel" />
					</label>
					<button>电话回拨</button>
					<div class="tishi">
						<i>温馨提示</i>
						<span>
							回拨为注册电话，点击电话回拨即可，如果回拨的不是注册电话，请输入最新的电话，点击回拨
						</span>
					</div>
				</div>
				<p class="close" @click="phone=false">取消</p>
			</div>
		</div>
		<p class="file"></p>
	</div>
</template>

<script>
	export default {
		props: ['goback', 'service', 'sidbar','goHome'],
		data() {
			return {
				scroll: '',
				zhezhao: false,
				showEixt: false,
				showMenu: false,
				showConputer: false,
				showRight: false,
				user: '',
				integral: '',
				member: '',
				money: '',
				user: '',
				integral: '',
				member: '',
				money: '',
				kefu: false,
				sub: false,
				phone: false,
			}
		},
		methods: {
            returnBack(){
                console.log(this.goHome);
				if (this.goHome){
				    this.$router.push({path:'/home'});
				    return;
				}
				this.$router.go(-1)
			},
			show_rightMenu() {
				this.showRight = !this.showRight;
				this.zhezhao = !this.zhezhao;
			},
			show_exit() {
				this.showEixt = !this.showEixt;
				this.zhezhao = true;
				this.showMenu = false;
			},
			show_computer() {
				this.showConputer = !this.showConputer;
				this.zhezhao = true;
				this.showMenu = false;
			},
			close_exit() {
				this.zhezhao = false;
				this.showEixt = !this.showEixt;
			},
			close_rightM() {
				this.zhezhao = false;
				this.showEixt = !this.showEixt;
			},
			close_computer() {
				this.zhezhao = false;
				this.showConputer = !this.showConputer;
			},
			openph() {
				this.kefu = false;
				this.phone = true;
			} ,
            show_leftMenu(){
                let reToken = localStorage.refreshToken;
                let acToken = localStorage.accessToken;
                let siToken = localStorage.singleToken;
                if(reToken && acToken && siToken) { // 通过vuex state获取当前的token是否存在
					this.showMenu = !this.showMenu;
				    this.zhezhao = !this.zhezhao;
				    
				    return;
				}
            	
            	this.$router.push({path:'/login'})
            	
            },
            
            close_leftMenu(){
            	this.showMenu = false;
				this.zhezhao = false;
            },
            
            
            //清除token
            remove_token(){
            	this.zhezhao = false;
                localStorage.clear();
				this.showEixt = !this.showEixt;
				this.$router.push({path:'/login'});
            }
			
			
			},

	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	@import '../../style/popup_common';
	.file {
		width: 100%;
		height: 4.3rem;
	}
	
	#head_top {
		background: rgb(56, 51, 51);
		width: 100%;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		height: 4.3rem;
		z-index: 100;
		.head_goback {
			color: #fff;
			height: 4.3rem;
			font-size: 1.6rem;
			margin-left: 1rem;
			line-height: 4.3rem;
			span,
			i {
				color: #fff;
			}
		}
		.head_service {
			width: 2rem;
			margin-right: 1.6rem;
			margin-top: 0.6rem;
			span {
				color: rgb(142, 141, 141);
			}
		}
		.head_medal {
			width: 1.5rem;
			margin-top: 1rem;
			margin-right: 1rem;
		}
		.head_more {
			margin-left: 1rem;
			margin-top: 1.3rem;
			width: 2rem;
		}
		.right_menu {
			@include wh(45%, 100%);
			position: fixed;
			background: #423d3d;
			right: 0;
			top: 0;
			z-index: 110;
		}
		.left_menu {
			@include wh(45%, 100%);
			position: fixed;
			background: #423d3d;
			z-index: 110;
			.close_menu {
				@include wh(1.5rem, 1.5rem);
				display: block;
				position: absolute;
				top: 2rem;
				right: 1rem;
				@include bis('../../assets/Android/drawable-xhdpi/zyl_cancel-bt.png');
			}
			.menu_logo {
				width: 80%;
				margin: 6rem auto 3rem;
			}
			.left_menu_nav {
				width: 100%;
				height: 80%;
				padding-bottom: 8rem;
				overflow-y: auto;
				li {
					width: 100%;
					height: 5rem;
					line-height: 5rem;
					color: #cccccc;
					font-size: 1.6rem;
					background: #363232;
					margin-bottom: 0.1rem;
					position: relative;
					.li_txt {
						width: 100%;
						color: #cccccc;
						span {
							display: inline-block;
							color: #cccccc;
							font-size: 2.0rem;
							margin: 0 3% 0 14%;
						}
					}
				}
			}
		}
		.right_menu {
			padding-top: 5rem;
			ul {
				background: #363232;
				padding: 1rem 0;
				width: 100%;
				overflow: auto;
				li {
					width: 80%;
					padding-left: 25%;
					.li_txt {
						width: 100%;
						color: #cccccc;
						font-size: 1.8rem;
						h2,
						h3 {
							color: #ff9700;
							font-size: 1.8rem;
							margin: 1.5rem 0;
						}
						h3 {
							color: red;
						}
					}
				}
			}
		}
		.popup_home {
			.txt_list {
				height: 11rem;
				li {
					text-align: center;
					height: 100%;
					line-height: 8rem;
					font-size: 1.6rem;
				}
			}
		}
		.computer_popup {
			height: 24rem;
			button {
				margin-top: 4rem;
			}
		}
	}
	
	.xunwen {
		position: fixed;
		width: 40%;
		height: 100%;
		z-index: 100;
		background: #423d3d;
		right: 0;
		top: 0;
		.icon-close {
			color: #e5e3e3;
			float: right;
			font-size: 2rem;
			margin: 1rem;
		}
		ul {
			margin-top: 6rem;
			li {
				margin-bottom: 2rem;
				padding-left: 1.5rem;
				i,
				span {
					color: #e5e3e3;
				}
				i {
					margin-right: 1rem;
					font-size: 2rem;
				}
				span {
					font-size: 1.4rem;
				}
			}
		}
	}
	
	.pop {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		left: 0;
		top: 0;
		right: 0;
		z-index: 999;
		.submit {
			width: 80%;
			height: 12rem;
			@include center;
			background: rgb(238, 238, 238);
			p {
				padding: 2rem 10%;
				text-align: center;
				position: relative;
				font-size: 1.4rem;
				border-bottom: 1px solid cornflowerblue;
			}
			button {
				background: cornflowerblue;
				font-size: 1.4rem;
				width: 6rem;
				height: 3rem;
				text-align: center;
				line-height: 3rem;
				color: #fff;
				float: right;
				margin-right: 2rem;
				margin-top: 2rem;
			}
		}
		.sen {
			width: 90%;
			height: 26rem;
			@include center;
			background: rgb(238, 238, 238);
			p {
				height: 2.5rem;
				text-align: center;
				line-height: 2.5rem;
				font-size: 1.6rem;
				color: rgb(241, 151, 25);
				background: black;
				font-weight: 600;
			}
			.zhu {
				padding: 2rem 5%;
				label {
					width: 100%;
					height: 3.5rem;
					display: block;
					background: white;
					line-height: 3.5rem;
					border-radius: 1.5rem;
					span {
						margin-left: 1rem;
						font-size: 1.4rem;
					}
					input {
						width: 68%;
						height: 3rem;
						font-size: 1.4rem;
					}
				}
				button {
					width: 100%;
					height: 3.5rem;
					font-size: 1.6rem;
					background: rgb(241, 151, 25);
					margin: 2rem 0;
					border-radius: 1.5rem;
				}
				.tishi {
					i {
						display: block;
						margin-bottom: 1rem;
						font-size: 1.4rem;
					}
					span {
						font-size: 1.4rem;
					}
				}
			}
			.close {
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
			}
		}
	}
</style>