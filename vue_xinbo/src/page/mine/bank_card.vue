<template>
	<div>
		<head-top :logged="logged" :goback="goback" :service="service">
			<span class="core">绑定银行卡</span>
		</head-top>
		<notice></notice>
		<div class="card">
			<p class="name" v-if="cn_name != ''">{{name}}</p>
			<label class="iccid"  v-else>
				<span>开户姓名：</span>
				<input type="text" v-model="name" />
			</label>
			<i>*真实姓名不可修改，请填写你的真实信息！</i>
			<label class="iccid">
				<span>填写卡号：</span>
				<input type="text" v-model="bank_card" />
			</label>
			<label class="iccid elect">
				<span>选择银行：</span>
				<el-select  v-model="bank_code">
				    <el-option  v-for="(value, key) in options" :label="value" :value="key">
				    </el-option>
			  	</el-select>
			</label>
			<label class="iccid">
				<!--<span>省</span>-->
				<div class="province">
					<el-select v-model="address" placeholder="省" v-on:change="provinceChange">
					    <el-option
					      v-for="(item,index) in addr"
					      :key="index"
					      :label="item.name"
					      :value="item.name"
					      >
					    </el-option>
				  	</el-select>
				</div>
				<!--<span class="ct">|市</span>-->
			  	<div class="city">
					<el-select v-model="city" placeholder="市">
					    <el-option
					      v-for="(items,ind) in citys"
					      :key="ind"
					      :label="items.name"
					      :value="items.name">
					    </el-option>
				  	</el-select>
			  	</div>
			</label>
			<label class="iccid">
				<span>填写开户行：</span>
				<input type="text" v-model="bank_branch" />
			</label>
			<input type="text" placeholder="手机验证码" v-model="phone_code" class="ipt2" name='code_phone' v-validate="'required'" />
			<input type="button" class="code_img" />
			<button class="btn1" @click='getMemberPhoneVerify()' :disabled="disabled">{{code_txt}}</button>
			<i>*验证码已经过期，请重新获取！</i>
			<button class="binds" @click="subBindingCard()" :disabled="btn_disabled">{{btn_text}}</button>
			<a @click="bind=true">点击查看已绑定的银行卡</a>
		</div>
		<div class="pop" v-if="bind">
			<div class="sen">
				<hgroup class="caption">
					<img src="../../assets/Android/drawable-xhdpi/cz_Bank-card-icon1.png"/>
					<span>已绑定银行卡</span>
					<i class="iconfont icon-close" @click="bind=false"></i>
				</hgroup>
				<section>
					<el-table
					    :data="tableData"
					    border
					    style="width: 100%"
					    :row-class-name="tableRowClassName">
					    <el-table-column prop="user_acct_name" label="姓名"></el-table-column>
					    <el-table-column prop="user_bank_name" label="银行"></el-table-column>
					    <el-table-column prop="user_bank_card" label="银行卡号"></el-table-column>
					</el-table>
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
				cn_name:'',  /* 开户姓名 */
				name:'',  /* 开户姓名 */
                bank_card:'', /* 绑定卡号 */
				bank_code:'', /* 银行编号 */
                bank_branch:'', /* 开户支行 */
				options: [],
		        tableData: [],
		        bind:false,
		        addr:'',//省 集合
		        citys:'',//市 集合
                address:'', /* 选择的省 */
		        city:'', /* 选择的市 */
                phone_code:'',
                code_txt: '获取验证码',
                disabled: false,
				btn_text:'获取中',
				btn_disabled:true,
			}
		},
        methods: {
            //把历史记录的数据填入到对应的输入框中
            getBindingCard(){
                let self = this;
				this.axios.get('api/getBindingCardApi',{needToken:true,notLoading:false}).then(function(res){
					if(res.data.status == '1'){
						let datas=res.data.content;
						self.name = datas.member.cn_name;
						self.cn_name = datas.member.cn_name;
						self.options = datas.bankList;
                        self.btn_text = '提交绑定';
						self.btn_disabled = false;
						for (var key in datas.bankBind){ self.tableData.push(datas.bankBind[key]); }
						return;
					}else{
                        let lay = self.$layer.open({
                            content: res.data.msg,
                            btn: '确定',
                            shadeClose: false,
                            yes: function(){
                                layer.close(lay);
                                self.$router.push({ path: '/my'  });
                            }
                        });
					}
				}).catch(function(error){
					console.log('获取信息失败')
				})

            },
			/* 提交绑定银行卡 */
			subBindingCard(){
                let self = this;
                self.btn_text = '绑定中···';
                self.btn_disabled = true;
				this.axios.post('api/subBindingCardApi',{
					bank_code:self.bank_code,
					acct_name:self.name,
					province:self.address,
					city:self.city,
					bank_card:self.bank_card,
					phone_code:self.phone_code,
					bank_branch:self.bank_branch,
				},
				{needToken:true}).then((res) => {
                    self.btn_text = '提交绑定';
                    self.btn_disabled = false;
                    let lay = self.$layer.open({
                        content: res.data.msg,
                        btn: '确定',
                        shadeClose: false,
                        yes: function(){
                            layer.close(lay);
                            if(res.data.status == '1'){
                                self.cn_name = self.name;
                                self.bank_code = '';
								self.address = '';
								self.city = '';
								self.bank_card = '';
								self.phone_code = '';
								self.bank_branch = '';
                                self.tableData.push(res.data.content.bankBind);
                            }
                        }
                    });
				}).catch(function(error){
					console.log('获取信息失败')
				})
			},
			/* 获取验证码 */
            getMemberPhoneVerify() {
                let self = this;
                self.code_txt = '发送中··';
                self.disabled = true;
                this.axios.post('api/getMemberPhoneVerifyApi', {},{needToken:true,notLoading:false}).then(function(res) {
                    let lay = self.$layer.open({
                        content: res.data.msg,
                        btn: '确定',
                        shadeClose: false,
                        yes: function(){
                            layer.close(lay);
                        }
                    });
                    if(res.data.status == 1) {
                        self.time = 60;
                        self.code_txt = '发送成功';
                        self.disabled = true;
                        self.timer();
                    }else{
                        self.code_txt = '获取验证码';
                        self.disabled = false;
					}
                }).catch(function(error) {
                    console.log(error)
                })
            },
            timer() {
                if(this.time > 0) {
                    this.time--;
                    //			         	console.log(this.time);
                    this.code_txt = '(' + this.time + 's)后重新发送';
                    setTimeout(this.timer, 1000);
                    return;
                }
                this.time = 0;
                this.disabled = false;
                this.code_txt = '获取验证码';
            },

	      	tableRowClassName(row, index) {
	        if (index%2 != 0) {
	          return 'info-row';
	        } 
	        return '';
	      },
	      	getAddr(){
	      	 this.$http.get("../../../static/data/address.json").then((response) => {
//		          console.log(response.data);
		          this.addr=response.data;
		      });
	      },
	      	//获取省的索引值
	       	provinceChange(val){
				let item=this.addr;
				let digit=0;
				$.each(item,function(idx,el){
					if (el.name==val) {
						digit=idx;
					}
				});
				this.citys=this.addr[digit].city;
				this.city='';
	      	}
	    },
	    created(){
            this.getBindingCard();
			this.getAddr();
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
	.card{
		overflow: hidden;padding: 1rem 5% 0.5rem;
		p{
			width: 100%;height: 3.5rem;padding-left: 1.5rem;color: rgb(153,153,153);
			font-size: 1.6rem;line-height: 3.5rem;background: rgb(204,204,204);
			border-radius: 1.5rem;
		}
		i{margin: 0.7rem 0 0.7rem 1rem;display: block;font-size: 1.2rem;}
		label{
			display: block;width: 100%;height: 3.5rem;background: #fff;
			line-height: 3.5rem;font-size: 1.4rem;border-radius: 1.5rem;
			margin-bottom: 2rem;overflow: hidden;
			span{margin-left: 1.5rem;}
			input{width: 60%;height: 3rem;font-size: 1.4rem;}
			div{display: inline-block;}
			.ct{margin: 0;}
		}
		.ipt2{
			width: 55%;height: 3.5rem;font-size: 1.5rem;
			border-radius:1.3rem;padding: 0 1rem;
		}
		.btn1{width: 39%;margin-left: 3%;height: 3.5rem;border-radius: 1.3rem;background: #fff;font-size: 1.5rem;}
		.binds{
			width: 100%;
			height: 3.5rem;text-align: center;
			line-height:3.5rem;font-size: 1.6rem;
			background: rgb(255,153,0);
			border-radius: 1.5rem;
		}
		a{
			text-decoration:underline;
			color: rgb(255,153,0);
			font-size: 1.4rem;
			display: block;margin-top: 1rem;
		}
	}
	.pop{
		position:fixed;width: 100%;
		height: 100%;background: rgba(0,0,0,0.3);
		left: 0;top: 0;right: 0;z-index: 999;
		overflow:auto;
		.sen{
			width: 92%;
			height: 25rem;
			@include center;
			overflow: auto;
			background: rgb(238,238,238);
			.caption{
				width: 100%;height: 3.5rem;
				background: rgb(76,62,36);position: relative;
				img{width: 2rem;@include ct;margin-left: 1rem;}
				span{color: rgb(255,153,0);font-size: 1.5rem;@include ct;margin-left: 3.3rem;font-weight: 600;}
				i{color: #fff;@include ct;right: 1.5rem;font-size: 1.5rem;}
			}
			section{
				padding-top: 1rem;background: #fff;padding-bottom: 3rem;
			}
		}
	}
</style>
<style lang="scss">
	/*修改element原有的样式*/
	.iccid{
		.el-input__inner{
		    border: none;
		}
	}
	.elect{
		.el-select{
			width: 67%;
			height: 3.5rem;
			.el-input__icon{
				color: #383333;
			}
			.el-input__inner{
				height: 3rem;
				font-size: 1.4rem;
			}
		}
	}
	.el-select-dropdown__item{
		font-size: 1.4rem;height: 2.6rem;line-height: 2.4rem;color: black;
		padding-top:0 ;
	}
	.province{
		margin-left: 1rem;
	}
	.province,.city{
		width: 47%;
		.el-select{
			width: 100%;
			height: 3.5rem;
			.el-input__icon{
				color: #383333;
			}
			.el-input__inner{
				height: 3rem;
				font-size: 1.4rem;
			}
		}
	}
	.el-table .info-row {
	    background: #c9e5f5;
	  }
	td,th{
		font-size: 1.4rem;
	}
</style>