<template>
	<div>
		<p class="file"></p>
		<footer id="foot">
			<ul class="foot_list">
				<li id="shouye">
					<router-link to="/home" class="link">
						<div class="nav">
							<i class="iconfont icon-shouye"></i>
							<span>首页</span>
						</div>
					</router-link>
				</li>
				<li id="youhui">
					<router-link to="/preferential" class="link">
						<div class="nav">
							<i class="iconfont icon-coupon"></i>
							<span>优惠</span>
						</div>
					</router-link>
				</li>
				<li class="games">
					<router-link to="/gameFast" class="link">
						<div class="nav start">
							<i class="iconfont icon-youxi"></i>
							<span>快速游戏</span>
						</div>
					</router-link>
				</li>
				<li id="daili">
					<router-link to="/agency" class="link">
						<div class="nav qizi">
							<i class="iconfont icon-xiaoqi"></i>
							<span>代理</span>
						</div>
					</router-link>
				</li>
				<li id="wode">
					<router-link to="/my" class="link">
						<div class="nav">
							<i class="iconfont icon-wode"></i>
							<span>我的</span>
						</div>
					</router-link>
				</li>
			</ul>
		</footer>
	</div>
</template>

<script>
	export default {
    	data(){
            return{
                
            }
        },
        created(){
           
        },
        computed:{
            
        }
    }
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	.file{
		width: 100%;
		height: 4.4rem;
	}
	#foot{
		width: 100%;
		height: 4.4rem;
		background: rgb(56,51,51);
		position: fixed;
		left: 0;right: 0;bottom: 0;
		z-index: 100;
		.foot_list{
			display: flex;
			li{
				flex: 1;
				position: relative;
				height: 4.4rem;
				.link{
					display: block;width: 100%;height: 4.4rem;
				}
				.nav{
					@include center;
					top:48%;
					i,span{color: #fff;display: block;font-size: 1.3rem;}
					i{font-size: 2.5rem;}
				}
				.qizi{
					i{
						font-size: 2.2rem;
					}
				}
			}
			.games{
				flex: 1.1;
				margin: 0 3%;
				@include bis('../../assets/Android/drawable-xhdpi/zy_Fast-game-back.png');
				.nav{
					width:100%;
					text-align:center;
					i,span{color: black;display: block;font-size: 1.3rem;}
					i{font-size: 2.7rem;}
				}
			}
			.router-link-exact-active{
				.nav{
					i,span{color: rgb(241,151,25)}
				}
				.start{
					i,span{color: #fff}
				}
			}
		}
	}
</style>