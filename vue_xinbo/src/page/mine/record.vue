<template>
	<div>
		<head-top :logged="logged" :goback="goback" :service="service">
			<span class="core">记录查询</span>
		</head-top>
		<notice></notice>
		<div class="record">
			<ul>
				<li>
					<router-link to="/recordDetail?type=Deposit&title=存款记录" class="link">
						<span>存款记录</span>
						<i class="iconfont icon-back"></i>
					</router-link>
				</li>
				<li>
					<router-link to="/recordDetail?type=Transfer&title=户内转账记录" class="link">
						<span>户内转账记录</span>
						<i class="iconfont icon-back"></i>
					</router-link>
				</li>
				<li>
					<router-link to="/recordDetail?type=WithDraw&title=提款记录" class="link">
                        <span>提款记录</span>
                        <i class="iconfont icon-back"></i>
                    </router-link>
                </li>
				<li>
					<router-link to="/recordDetail?type=GiftMoney&title=赠金记录" class="link">
						<span>赠金记录</span>
						<i class="iconfont icon-back"></i>
					</router-link>
				</li>
				<li>
					<router-link to="/recordDetail?type=Score&title=积分记录" class="link">
						<span>积分记录</span>
						<i class="iconfont icon-back"></i>
					</router-link>
				</li>
			</ul>
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
	@import '../../style/mixin';
	.core{
		display: inline-block;
		color: #fff;
		font-size: 1.8rem;
		@include center;
	}
	.record{
		padding: 2rem 10%;
		overflow: hidden;
		ul{
			width: 100%;overflow: hidden;
			li{
				height: 3.5rem;border: 0.1rem solid rgb(203,203,203);
				line-height: 3.5rem;border-radius: 1.5rem;
				margin-bottom: 2rem;overflow: hidden;
				padding: 0 1rem;
				.link{
					width: 100%;height: 3.5rem;display: block;
				}
				span,i{font-size: 1.4rem;}
				i{float: right;}
			}
		}
	}
</style>