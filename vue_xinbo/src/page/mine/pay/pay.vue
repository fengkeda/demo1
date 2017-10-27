<template>
	<div>
		<head-top :logged="logged" :goback="goback" :service="service">
			<span class="core">充值</span>
		</head-top>
		<notice></notice>
		<div class="line">
			<ul>
                <li>
                    <router-link to="/pay/wechat" class="link">
                        <span>扫码存款</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/pay/onlinePay" class="link">
                        <span>在线网银</span>
                    </router-link>
                </li>
				<li>
					<router-link to="/pay/mt" class="link">
						<span>手工存款</span>
					</router-link>
				</li>
			</ul>
			<router-view></router-view>
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
			}
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
	@import '../../../style/mixin';
	.core{
		display: inline-block;
		color: #fff;
		font-size: 1.8rem;
		@include center;
	}
	.line{
		overflow:hidden;
		padding: 2rem 5% 1rem;
		ul{
			width: 100%;overflow: hidden;
			display: flex;margin-bottom: 1.5rem;
			li{
				flex: 1;
				height: 3.5rem;
				border: 1px solid rgb(203,203,203);
				line-height: 3.5rem;text-align: center;
				border-radius: 1rem;
				background: #fff;
				span{
					font-size: 1.4rem;
					font-weight: 600;
				}
				.link{
					width: 100%;
					height: 3.5rem;
					display: block;
					border-radius:1rem ;
				}
			}
			li:nth-child(2){
				margin: 0 5%;
			}
			.router-link-exact-active{
				background: rgb(241, 151, 25);
			}
		}
	}
</style>