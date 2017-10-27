<template>
	<div class="quick">
		<head-top :sidbar='sidbar' :service='service' :logged='logged'>
			<span class="header_title">快速游戏</span>
		</head-top>
		<div class="bg_2"></div>
		<section class="quick_main">
			<div class="left game_classify" >
				<ul>
					<!-- class="router-link-exact-active router-link-active" -->
					<a v-for="(value, key) in gameMenu" href="javascript:void(0)" @click="updateSel(value.code)" :class="nowSel == value.code?'router-link-exact-active router-link-active':''">
						<li>{{value.name}}</li>
					</a>
				</ul>
			</div>
			<div class="gameFast">
				<div class="showGame right" :class="openSearch?'':'noSearch'">
					<div class="game_top" v-if="openSearch">
						<div class="searchGame left">
							<div class="inp">
								<input class="inp_put" type="text" placeholder="输入游戏关键字" v-model="keyword_name" />
								<span class="search" @click="searchName">
	    					</span>
							</div>
						</div>
						<div class="game_select right">
							<el-dropdown trigger="click" >
								<span class="el-dropdown-link">
							        {{nowElekType}}<i class="el-icon-caret-bottom el-icon--right"></i>
							      </span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item v-for='(item,index) in gameType' @click.native="updateElekType(item.elek_type,item.cn_name)">{{item.cn_name}}</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</div>
					</div>
					<div class="game_li left" v-for='(item,index) in gameList'>
						<img :src="item.pic_url" class="gameImg"/>
						<h2 v-if="item.menu_name">{{item.menu_name}}</h2>
						<h2 v-else>{{item.cn_name}}</h2>
						<div class="game_btn">
							<a href='javascript:void(0)' @click="getRoomUrl(item.trial_url,false)"><img src="../../assets/Android/drawable-xhdpi/mianfei.png" class="left"/></a>
							<a href='javascript:void(0)' @click="getRoomUrl(item.real_url,true)"><img src="../../assets/Android/drawable-xhdpi/jinru.png" class="right"/></a>
						</div>
					</div>
					<div class="loading" v-if='loading'>
						<img src="../../assets/Android/drawable-xhdpi/loading.gif" />
					</div>
					<div class="aiglo_game" v-if='aiglo_show'></div>
				</div>
			</div>
		</section>
		<foot></foot>
	</div>
</template>

<script>
	import HeadTop from '@/components/header/head'
	import Foot from '@/components/footer/footer'
	export default{
		name:'quick',
		data(){
			return{
				goback: true,
				service: true,
				logged: true,
				sidbar: false,
				all:[],		   /* 所有游戏列表 */
				gameType:[],	/* 游戏分类 */
                gameList:[],  /* 选中游戏列表 */
                gameMenu:[],  /* 左边菜单 */
                nowSel:'live',  /* 左边菜单 */
                nowElekType:'分类',  /* 左边菜单 */
                keyword_name:'',  /* 搜索游戏 */
				openSearch:false,
                loading: true,
                aiglo_show: true,
			}
		},
        created(){
            this.getDigitalGame();
        },
		methods:{
            /*  获取游戏列表 */
            getDigitalGame(){
                let self = this;
                this.axios.post('api/getDigitalGameApi',{
                    eqpt:'mobile',
				},{needToken:false}).then(function(res){
                    self.all['live'] = res.data.content.live;
                    self.all['fish'] = res.data.content.fish;
                    self.all['sport'] = res.data.content.sport;
                    self.all['lottery'] = res.data.content.lottery;
                    if (res.data.content.live.length !== 0) { self.gameMenu.push({'code':'live','name':'真人视讯'}) }
                    if (res.data.content.fish.length !== 0) { self.gameMenu.push({'code':'fish','name':'捕鱼'}) }
                    if (res.data.content.sport.length !== 0) { self.gameMenu.push({'code':'sport','name':'体育'}) }
                    if (res.data.content.lottery.length !== 0) { self.gameMenu.push({'code':'lottery','name':'彩票'}) }
                    $.each(res.data.content.elek, function(idx,item) {
                        self.gameMenu.push({'code':'elek'+idx,'name':item.menu_name});
                        self.all['elek'+idx] = item;
                    });
                    /* 赋值默认的游戏列表 */ /* 赋值默认的游戏分类 */
                    if (self.all[self.nowSel].game_list){
                        self.gameList = self.all[self.nowSel].game_list;
                        self.gameType = self.all[self.nowSel].elek_type;
                        self.openSearch = true;
					}else{
                        self.gameList = self.all[self.nowSel];
                        self.gameType = [];
					}
                    self.loading = false;
                    self.aiglo_show = false;
                }).catch(function(error){
                    console.log('获取信息失败');
                })
			},
			/* 左边菜单栏的选择 */
            updateSel(code){
                this.nowSel = code;
                if (this.all[code].game_list) {
                    this.gameList = this.all[code].game_list;
                    this.gameType = this.all[code].elek_type;
                    this.openSearch = true;
                    /* 获取分类的游戏 */
                    this.updateElekType(this.all[code].elek_type[0].elek_type,this.all[code].elek_type[0].cn_name);
                } else if (code == 'elekETAG') {
                    this.gameList = [];
                	this.gameList.push(this.all[code]);
                    this.gameType = [];
                    this.openSearch = false;
            	}else{
                    this.gameList = this.all[code];
                    this.gameType = [];
                    this.openSearch = false;
				}
			},
			/* 修改游戏分类选择 */
			updateElekType(type,name){
			    let self = this;
			    let newGameList = [];
                self.nowElekType = name;
                self.keyword_name = '';
                $.each(self.all[self.nowSel].game_list, function(idx,item) {
					if (item.elek_type.indexOf(type) >= 0){
                        newGameList.push(item);
					}
                });
                self.gameList = newGameList;
			},
			/* 修改游戏分类选择 */
            searchName(){
                let self = this;
                let newGameList = [];
                $.each(self.all[self.nowSel].game_list, function(idx,item) {
                    if (item.cn_name.indexOf(self.keyword_name) >= 0){
                        newGameList.push(item);
                    }
                });
                self.gameList = newGameList;
            },
			/* 进入真式环境游戏 */
            getRoomUrl(url,need){
                let self = this;
                let newWin = window.open('about:blank');
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
                    console.log('获取信息失败');
                })
			},
		},
        components: {
            HeadTop,
            Foot
        },
	}
	
</script>
<style lang="scss" scoped>
	@import '../../style/mixin';
	@import '../../style/quickGame';
	.bg_2 {
		@include wh(100%, 100%);
		position: fixed;
		/*background: #261f15;*/
	}
	.quick_main{
		@include wh(100%,100%);
		position: relative;
		.game_classify{
			@include wh(23%,100%);
			position: fixed;
			z-index:66;
			background: #261f15;
			ul{
				@include wh(100%,100%);
				padding-bottom:9rem;
				overflow-y:auto;
				li{
					@include wh(100%,5rem);
					color: #fff;
					font-size: 1.6rem;
					text-align:center;
					line-height:5rem;
					background:#322a1d;
					margin-bottom:0.1rem;
				}
			}

			.router-link-exact-active {
				li {
					color: #f19818;
					background: #261f15;
					border-left: 0.5rem solid #f19818;
				}
			}
		}

	}
	.header_title {
		display: inline-block;
		color: #fff;
		font-size: 1.8rem;
		@include center;
	}
	.noSearch{
		padding-top: 0rem;
	}
</style>