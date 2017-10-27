<template>
	<div class="agency">
		<head-top :goback='goback' :service='service' :logged='logged'>
			<span class="header_title">品牌介绍</span>
		</head-top>
		<div class="bg_2"></div>
		<section>
			<div>
				<img src="../../assets/Android/drawable-xhdpi/agency_img.png" />
			</div>
			<div class="agency_nav">
				<div class="nav">

					<div class="left nav_dh">

						<router-link to="/joinIn" class='router_link'>
							<span class="iconfont icon-jiamengba"></span>
						</router-link>
						<i>加盟注册</i>
					</div>

					<div class="left nav_dh">
						<router-link to="/introduction" class='router_link'>
							<span class="iconfont icon-guzhang"></span>
						</router-link>
						<i>品牌介绍</i>
					</div>

					<div class="left nav_dh">
						<router-link to="/commission " class='router_link'>
							<span class="iconfont icon-meiyuan_dollars"></span>
						</router-link>
						<i>佣金说明</i>
					</div>

				</div>
				<div class="nav">

					<div class="left nav_dh">
						<router-link to="/questions" class='router_link'>
							<span class="iconfont icon-wenti"></span> 
						</router-link>
						<i>常见问题</i>
					</div>

					<div class="left nav_dh">
						<router-link to="/dreamChall" class='router_link'>
							<span class="iconfont icon-555"></span>
						</router-link><i>圆梦计划</i>
					</div>

					<div class="left nav_dh">
						<router-link to="/contactUs" class='router_link'>
							<span class="iconfont icon-lianxiwomen01"></span> 
						</router-link> 
						<i>联系我们</i>
					</div>

				</div>
			</div>
		</section>
		<foot></foot>
	</div>

</template>

<script>
	import HeadTop from '@/components/header/head'
	import Foot from '@/components/footer/footer'

	export default {
		name: 'agency',
		data() {
			return {
				goback: true,
				service: true,
				logged: true,
				sidbar: true,
			}
		},
		components: {
			HeadTop,
			Foot
		}

	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	@import '../../style/agency_common';
	section {
		@include wh(100%, 100%);
		position: relative;
		.agency_nav {
			width: 100%;
			overflow: hidden;
			padding: 1rem 0 0 0;
			background: #fff;
			.nav {
				display: flex;
				width: 100%;
				margin-bottom: 1rem;
				.nav_dh {
					height: 100%;
					flex: 1;
					text-align: center;
					i {
						display: block;
						color: #000000;
						font-size: 1.4rem;
					}
					span {
						display: block;
						@include wh(6rem, 6rem);
						padding: 0.5rem;
						margin: 0 auto;
						margin-bottom: 0.5rem;
						border: 0.3rem solid #f0981a;
						border-radius: 100%;
					}
				}
			}
			.iconfont {
				font-size: 4.5rem;
				color: #f0981a;
				line-height: 5rem;
				font-weight: bold;
			}
			.icon-meiyuan_dollars {
				font-size: 2.5rem;
				line-height: 4.5rem;
			}
		}
	}
</style>