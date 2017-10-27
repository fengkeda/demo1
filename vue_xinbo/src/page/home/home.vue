<template>
	<div class="home">
		<head-top :gobcak="back" :service='service' :logged='logged' :sidbar='sidbar' :showMenu='showMenu'>
			<span class="header_title"><img src="../../assets/Android/drawable-xhdpi/zc_xinbo_logo.png"/></span>
		</head-top>
		<nav class="banner">

			<el-carousel trigger="click" height="13rem">
				<el-carousel-item v-for="item in sliderImg" :key='item.id'>
					<img :src="item.sliderurl" />
				</el-carousel-item>
			</el-carousel>

			<notice></notice>
		</nav>
		<section class="liveAction">
			<h3>真人游戏平台</h3>
			<ul class="game_list">
				<li v-for='(value, key, index) in live' class="live_li left" @click="getRoomUrl(value.gameUrl,true)">
					<img :src="value.url" />
				</li>
			</ul>
		</section>
		<section class="slots">
			<h3>老虎机游戏平台</h3>
			<ul class="game_list">
				<li v-for='(value, key, index) in slots' class="slots_li left" @click="toGameFast()">
					<img :src="value.url" />
				</li>
			</ul>
		</section>
		<!-----------------弹框--------------------->
		<div class="popup_home" v-if='showPopup'>
			<div class="findPass_txt">
				<span class="left">活动天天有，彩金送不停</span>
				<i class="right" @click='closePopup()'>X</i>
			</div>
			<ul class="txt_list">
				<li>
					{{poputText.txt}}
				</li>

			</ul>
			<button @click='showPopup=false'>确    定</button>
		</div>
		<!-----------------遮盖层--------------------->

		<div class="aiglo" @touchmove.prevent v-if='showPopup'></div>

		<!-------------------------------------->

		<footer>
<!--			<h3>手机客户端下载</h3>
			<div class="client_icon1">
				<a>
					<img src='../../assets/Android/drawable-xhdpi/6464e.png' />
				</a>
				<a>
					<img src='../../assets/Android/drawable-xhdpi/zy_eBET-bt.png' />
				</a>
			</div>-->
		</footer>

		<foot></foot>
	</div>
</template>
<script>
	import HeadTop from '@/components/header/head'
	import Foot from '@/components/footer/footer'
	import Notice from '@/components/common/notice'

	export default {
		name: 'home',
		data() {
			return {
				back: 1,
				goback: true,
				service: true,
				logged: true,
				sidbar: true,
				showPopup: true,
				showMenu: true,
				logining: true,
				sliderImg: [
				    {
						id: 1,
						sliderurl: '../../../static/live/sild_2017101501.png'
					},
					{
						id: 2,
						sliderurl: '../../../static/live/sild_2017101502.png'
					},
					{
						id: 3,
						sliderurl: '../../../static/live/sild_2017101503.png'
					}
				],
				live: [
				    {
						id: 1,
						url: '../../../static/live/zy_ebet.png',
						gameUrl:'api/getRoomRealUrlApi?roomCode=04245f5430caf06ddede29aeae272232&roomElekUid=0'	/* eBet真人 */
					},
					{
						id: 2,
						url: '../../../static/live/zy_agin.png',
                        gameUrl:'api/getRoomRealUrlApi?roomCode=8b1222328b9c1a44eb48e8e79487d992&roomElekUid=0' /* AG真人 */
					},
					{
						id: 3,
						url: '../../../static/live/zy_bobin.png',
                        gameUrl:'api/getRoomRealUrlApi?roomCode=e92b7df01c140a8b9c0652577ec8caf8&roomElekUid=0' /* BBIN真人 */
					},
					{
						id: 4,
						url: '../../../static/live/zy_mg.png',
                        gameUrl:'api/getRoomRealUrlApi?roomCode=dc06f42d400752b57ab7ca7935a337e3&roomElekUid=1019' /* MG真人 */
					}
				],
				slots: [{
						id: 1,
						url: '../../../static/live/zy_QT.png',
						gameType:'elekETPT'
					},
					{
						id: 2,
						url: '../../../static/live/PT_img.png'
					},
					{
						id: 3,
						url: '../../../static/live/zy_PT.png'
					},
					{
						id: 4,
						url: '../../../static/live/kuma.png'
					},
					{
						id: 5,
						url: '../../../static/live/kuyou_img.png'
					},
					{
						id: 6,
						url: '../../../static/live/zy_Upcoming-2.png'
					}
				],
				clientDownload: [{
						id: 1,
						txt:'AG',
						imgUrl: '../../../static/game/index_plata_01_1.png',
						toUrl: '#'
					},
					{
						id: 2,
						txt:"eBET",
						imgUrl: '../../../static/game/s-1739.png',
						toUrl: '#'
					},
				],
				poputText: {
					txt: '获取中···'
				},
			}
		},
		components: {
			HeadTop,
			Foot,
			Notice
		},
		created() {
			this.get_notice();
		},
		methods: {
			closePopup() {
				this.showPopup = !this.showPopup;
			},
			/* 前往快速页面 */
            toGameFast(){
                this.$router.push({path:'/gameFast'})
            },
			/* 进入真式环境游戏 */
            getRoomUrl(url,need){
                let self = this;
                let newWin = window.open('/');
                this.axios.get(url+'&eqpt=mobile',{needToken:need}).then(function(res){
                    if (res.data.status == '1'){
                        newWin.location.href = res.data.content.url;
                    }else {
                        newWin.close();
                        let lay = self.$layer.open({
                            content: res.data.msg,
                            btn: '确定',
                            shadeClose: false,
                            yes: function(){
                                layer.close(lay);
                            }
                        });
                    }
                }).catch(function(error){
                    newWin.close();
                    console.log('获取信息失败');
                })
            },
			//获取公告通知
			get_notice() {
				let self = this;
				this.axios.get('api/getNoticeApi',{needToken:false}).then((res) => {
					if(res.data.status == 1) {
						let noti_data = res.data.content.notices;
						noti_data.forEach(function(notic, idx) {
							if(notic.notice_type == 'pop') {
								self.poputText.txt = notic.notice_content;
							}
						});
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	@import '../../style/popup_common';
	.home {
		@include wh(100%, 100%);
		position: relative;
		.header_title {
			display: inline-block;
			color: #fff;
			font-size: 1.8rem;
			@include center;
			img {
				width: 55%;
				margin: 0 auto;
			}
		}
		.banner {
			width: 100%;
			overflow: hidden;
			.el-carousel__item {
				height: 100%;
				img {
					height: 100%;
				}
			}
			.bulletin {
				@include wh(100%, 2.5rem);
				background: #e5e3e3;
				line-height: 2.5rem;
				font-size: 1.4rem;
			}
		}
		h3 {
			font-size: 1.4rem;
			height: 3rem;
			line-height: 3rem;
			text-align: center;
		}
		.liveAction {
			width: 100%;
			background: #fff;
		}
		.game_list {
			width: 100%;
			overflow: hidden;
			padding: 0 1%;
			li {
				width: 46%;
				margin: 0 2%;
				margin-bottom: 4%;
			}
		}
		.slots {
			width: 100%;
			background: #e3e3e3;
		}
		footer {
			padding-bottom: 1rem;
			background: #fff;
			
			.client_icon1 {
				width: 100%;
				padding: 0 0.5rem;
				height: 5rem;
				a {
					width: 50%;
					height: 5rem;
					display:block;
					float: left;
					position: relative;
					/*margin-left: 1.5%;*/
						img {
							position: absolute;
							left: 50%;
							transform: translateX(-50%);
							bottom: 0;
							
					}
				}
				
				a:nth-child(1) img{
					width:4.5rem;
				}
				a:nth-child(2) img{
					width: 5rem;
				}
			}
		}
	}
</style>