<template>
	<div class="preferential">
		<head-top :goback='goback' :service='service' :logged='logged' :sidbar='sidbar' :showMenu='showMenu'>
			<span class="header_title">优惠活动</span>
		</head-top>

		<section class="classify">
			<div class="pre_classify">
				<div class="prefecture_classify">
					<a href="javascript:void(0)" @click="updateSel('all')" :class="nowSel == 'all'?'router-link-exact-active router-link-active':''"><span>全选</span></a>
					&nbsp;
					<a href="javascript:void(0)" @click="updateSel('live')" :class="nowSel == 'live'?'router-link-exact-active router-link-active':''"><span>百家乐</span></a>
					&nbsp;
					<a href="javascript:void(0)" @click="updateSel('elek')" :class="nowSel == 'elek'?'router-link-exact-active router-link-active':''"><span>老虎机</span></a>
					&nbsp;
					<a href="javascript:void(0)" @click="updateSel('vip')" :class="nowSel == 'vip'?'router-link-exact-active router-link-active':''"><span>VIP专区</span></a>
				</div>
			</div>
			<div class="content_classify">
				<router-view></router-view>
			</div>
		</section>

		<div class="pre" v-for='(item,index) in privilege' @click='showTxt(index)'>
			<img :src='item.url' class="privilege_img" />
			<div class="expiredstyle" :class="{active:item.expired}" v-if='item.expired'>
				<img src="../../assets/Android/drawable-xhdpi/jieshu.png" />
			</div>
		</div>
		<div class="details_popup">
			<span class="close_pop" @click='close_pop()'></span>
			<div class="ruleText" v-html="rule"></div>

		</div>

		<div class="bg_2"></div>
		<foot></foot>

	</div>

</template>
<script>
	import HeadTop from '@/components/header/head'
	import Foot from '@/components/footer/footer'
	export default {
		name: 'preferential',
		data() {
            return {
                goback: false,
                service: true,
                logged: true,
                addclass: true,
                all:[],
                privilege: [],
                rule: null,
                sidbar: true,
                showPopup: false,
                showMenu: true,
                nowSel:'all',  /* 进行中 */
            }
		},
		components: {
			HeadTop,
			Foot
		},
		created() {
            this.getPreferential();
		},
		methods: {
            getPreferential(){
                let self = this;
                this.axios.get('api/getPreferentialApi',{needToken:false}).then(function(res){
                    if(res.data.status == '1'){
                        let datas=res.data.content;
                        self.all['all'] = res.data.content.all;
                        self.all['live'] = res.data.content.live;
                        self.all['elek'] = res.data.content.elek;
                        self.all['vip'] = res.data.content.vip;
                        for (let key in datas.all){
                            self.privilege.push(datas.all[key]);
                        }
                        return;
                    }else{
                        alert(res.data.msg);
                        this.$router.push({ path: '/my'  })
                    }
                }).catch(function(error){
                    console.log(error);
                    console.log('获取信息失败')
                })
            },
			/* 左边菜单栏的选择 */
            updateSel(code){
                this.nowSel = code;
                this.privilege = [];
                for (var key in this.all[code]){
                    this.privilege.push(this.all[code][key]);
                }
                //console.log(this.privilege);
            },

            showTxt(index) {
                this.privilege.forEach((item, idx) => {
                    if(idx == index) {
                        this.rule = item.txt;
                        //console.log(item.txt);
                        this.show_pop = !this.show_pop;
                        if(this.show_pop == true) {
                            $('.details_popup').css({
                                '-webkit-transform': 'translate3d(0, 0, 0)',
                                'webkit-transition': 'all .4s cubic-bezier(.4, .01, .165, .99)'
                            });
                            return;
                        }

                        $('.details_popup').css({
                            '-webkit-transform': 'translate3d(0, 90%, 0)',
                            'webkit-transition': 'all .4s cubic-bezier(.4, .01, .165, .99)'
                        })

                    }
                })

            },
            close_pop() {
                $('.details_popup').css({
                    '-webkit-transform': 'translate3d(0, 90%, 0)',
                    'webkit-transition': 'all .4s cubic-bezier(.4, .01, .165, .99)'
                });
                this.show_pop = !this.show_pop;
            },
			removeClass() {
				this.addclass = false;
			},
		}

	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	@import '../../style/agency_common';
	@import '../../style/details_popup';


	.header_title {
		display: inline-block;
		color: #fff;
		font-size: 1.8rem;
		@include center;
		
	}
	
	.classify {
			position: relative;
		.content_classify {
			@include wh(100%, 100%);
			background: #332b1c;
			padding-top: 8.5rem;
		
		}
		.pre_classify {
			width: 100%;
			overflow: hidden;
			background: #332b1c;
			position: fixed;
			z-index: 66;
			.prefecture_classify {
				@include wh(95%, 4.5rem);
				margin: 1.5rem auto;
				border-radius: 0.5rem;
				padding: 0.5rem;
				border-radius: 3rem;
				background: #261f14;
				span {
					display: inline-block;
					@include wh(23%, 100%);
					float: left;
					border-radius: 3rem;
					text-align: center;
					line-height: 3.5rem;
					font-size: 1.4rem;
					color: #f19719;
				}
				/*.avtive2{
				color: #000000;
				background: #f19719;
			}*/
			}
			.router-link-exact-active {
				span {
					color: #000000;
					background: #f19719;
				}
			}
		}
	}
	
	.details_popup {
		@include wh(100%, 45%);
		background: #eeeeee;
		position: fixed;
		bottom: 0;
		z-index: 99;
	}
</style>