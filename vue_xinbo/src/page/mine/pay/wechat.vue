<template>
	<div class="alipay">
		<div class="ico">
			<p>
				<label v-if="payment.WEIXIN">
					<img src="../../../assets/Android/drawable-xhdpi/WEIXIN.png"/>
					<span>微信</span>
					<div><el-radio class="radio" v-model="radio" label="WEIXIN"> &nbsp; &nbsp;</el-radio></div>
				</label>
				<label v-if="payment.ALIPAY">
					<img src="../../../assets/Android/drawable-xhdpi/ALIPAY.png"/>
					<span>支付宝</span>
					<div><el-radio class="radio" v-model="radio" label="ALIPAY">&nbsp; </el-radio></div>
				</label>
				<label v-if="payment.QQPAY">
					<img src="../../../assets/Android/drawable-xhdpi/QQPAY.png"/>
					<span>QQ钱包</span>
					<div><el-radio class="radio" v-model="radio" label="QQPAY">&nbsp;</el-radio></div>
				</label>
			</p>
		</div>
		
		<section>
			<label class="iccid">
				<span>交易编号：</span>
				<input type="text" v-model="payeeBillNo" name="bill_no" readonly/>
				<!--<i class="iconfont icon-back"></i>-->
			</label>
			<label class="iccid">
				<span>充值金额：</span>
				<input type="text" v-model="money"/>
			</label>
			<label class="iccid elect">
				<span>选择优惠：</span>
				<el-select  v-model="activity_uid">
					<el-option  v-for="(value, key) in activities" :label="value.activity_name" :value="value.uid">
					</el-option>
				</el-select>
			</label>
			<button class="binds" @click="subDepositPay()" :disabled="disabled">{{ btn_text }}</button>
		</section>
		<!--温馨提示-->
		<section class="tishi">
			<p>温馨提示：</p>
			<p>1、支付金额必须精确到分，例如：（100.51）</p>
			<p>2、汇款时请填写与订单一致的金额，否则会影响收款。</p>
			<p>3、您若有未完成的订单，请先完成或撤销之前的订单，否则将无法及时到账。</p>
			<p>4、请不要使用微信绑定的信用卡进行微信支付！如果使用信用卡支付，导致金额不能及时到账，我方恕不负责!</p>
			<p>5、若支付成功未及时到账，请联系在线客服处理！</p>
		</section>
	</div>
</template>

<script>
	import bus from '@/assets/eventBus.js'
	export default{
		data(){
			return{
                payeeBillNo:'获取中...',
				money:'',
				submits:false,
				radio:'',
				payment:[],
                disabled:true,
                btn_text:'获取信息中...',
                activities:[],
                activity_uid:''
			}
		},
        created(){
            this.getQRDeposit();
        },
		methods: {
            //获取扫码需要信息
            getQRDeposit(){
                let self = this;
				this.axios.get('api/getQRDepositApi', {needToken:true}).then(function(res){
					if(res.data.status == '1'){
						let datas=res.data.content;
						self.payeeBillNo = datas.payeeBillNo;
						self.payment = datas.payment;
						self.activities =  datas.activity;
						/* 初始化 */
						/* 判断哪些渠道已经拥有 */
						if (typeof(datas.payment.WEIXIN) != "undefined"){  self.radio = 'WEIXIN'; }
						else if (typeof(datas.payment.ALIPAY) != "undefined"){ self.radio = 'ALIPAY'}
						else if (typeof(datas.payment.QQPAY) != "undefined"){ self.radio = 'QQPAY' }
                        self.btn_text = '提交';
                        self.disabled = false;
                        self.activity_uid = 0;
						return;
					}else{
                        let lay = self.$layer.open({
                            content: '在线充值系统正在维护，请使用手工存款...',
                            btn: '确定',
                            shadeClose: false,
                            yes: function(){
                                layer.close(lay);
                                self.$router.push({ path: '/pay/mt'  });
                            }
                        });
					}
				}).catch(function(error){
					console.log('获取信息失败')
				})
			},
            /* 提交扫码需要信息 */
			subDepositPay(){
                this.btn_text = '提交中...';
                this.disabled = true;
                let self = this;
                let newWin = window.open('about:blank');
                this.axios.post('api/subDepositPayeeApi',{
                    payment_code:self.radio,
					bank_code:self.radio,
					money:self.money,
                    bill_no:self.payeeBillNo,
                    activity_uid:self.activity_uid,
				},{needToken:true}).then(function(res){
                    let lay = self.$layer.open({
                        content: res.data.msg,
                        btn: '确定',
                        shadeClose: false,
                        yes: function(){
                            layer.close(lay);
                            if(res.data.status == '1'){
                                newWin.location.href = res.data.content.url;
                                self.btn_text = '获取成功，已弹出新窗口充值';
                                return;
                            }
                            newWin.close();
                            self.btn_text = '提交';
                            self.disabled = false;
                        }
                    });
                }).catch(function(error){
                    console.log('获取信息失败')
                })
			},
		},
		mounted(){
//			let self=this;
			bus.$on("getQR",(msg)=>{
				console.log(msg);
				this.sale.push(msg.activity_name);
			});
			bus.$on("getpayment",(msg)=>{
				console.log(msg);
				this.alipay.min=msg.ALIPAY.min;
				this.alipay.max=msg.ALIPAY.max;
				this.weichat.min=msg.WEIXIN.min;
				this.weichat.max=msg.WEIXIN.max;
			});
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../style/mixin';
	.alipay{
		.elect{
			.el-select{
				width: 61%;
				height: 3rem;
				.el-input__icon{
					color: #383333;
				}
				.el-input__inner{
					height: 3rem;
					font-size: 1.4rem;
				}
			}
		}

		padding: 0 5% 1rem;
		.ico{
			p{
				width:100%;
				height: 4rem;
				margin-bottom: 1rem;
				img{
					width:3rem;
					float: left;
					margin-right: 0.4rem;
				}
				span{
					display: block;
					height: 2rem;
					line-height: 2rem;
					font-size: 1.4rem;
					font-weight: 700;
				}
				label{width: 33%;display: inline-block;}
				label:nth-child(1){width: 33.5%;}
			}
		}
		.iccid {
			display: block;
			width: 100%;
			height: 3.5rem;
			background: #fff;
			line-height: 3.5rem;
			font-size: 1.4rem;
			border-radius: 1.5rem;
			margin-bottom: 2rem;
			overflow: hidden;
			span {
				margin-left: 1.5rem;
			}
			.el-input__inner {
				border: none;
			}
			input {
				width: 58%;
				height: 3rem;
				font-size: 1.4rem;
			}
			i {
				float: right;
				margin-right: 1.5rem;
			}
		}
		.binds {
			width: 100%;
			height: 3.5rem;
			text-align: center;
			line-height: 3.5rem;
			font-size: 1.6rem;
			background: rgb(255, 153, 0);
			border-radius: 1.5rem;
		}
		.tishi{
			margin-top: 1rem;
			p{
				color: red;
				line-height: 1.6rem;
				font-size: 1.2rem;
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
			.history {
				width: 80%;
				height: 23rem;
				@include center;
				overflow: auto;
				background: rgb(238, 238, 238);
				ul {
					padding: 0 2%;
					li {
						padding: 1.5rem 0;
						text-align: center;
						border-bottom: 1px solid rgb(203, 203, 203);
						span {
							font-size: 1.2rem;
						}
					}
				}
			}
			.submit{
				width: 80%;
				height: 15rem;
				@include center;
				background: rgb(238, 238, 238);
				p{
					padding: 2rem 10%;
					text-align: center;
					position: relative;
					font-size: 1.4rem;
					border-bottom:1px solid cornflowerblue ;
					i{position: absolute;top: 4px;right: 4px;}
				}
				button{
					background: cornflowerblue;
					font-size: 1.4rem;
					width: 40%;height: 3rem;
					display: block;text-align: center;line-height: 3rem;
					margin-left:30%;margin-top: 6%;color: #fff;
				}
			}
		}
	}
</style>