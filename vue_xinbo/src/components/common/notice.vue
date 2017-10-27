<template>
	<!--公告栏-->
	<div class="bull">
		<i class="iconfont icon-laba"></i>
		<div class="txt">
			<p>
				<ul>
					<li v-for="item in info">
						{{item.notice_content}}
					</li>
				</ul>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				times:'',
				info:[]
			}
		},
		mounted() {
			this.getInfo();
		},
		methods: {
			getInfo(){
				this.axios.get("api/getNoticeApi").then((response) => {
					let self=this;
				  let info=response.data.content.notices;
				  $.each(info, function(idx,item) {
				  	if (item.notice_type !="pop") {
				  		self.info.push(item);
				  	}
				  });
				  this.$nextTick(() => {
				  	let ph = $('.txt').height(); //获取元素的高度
					//计算循环的次数
					let n = ph / 28;
					let th=0;
					this.times = setInterval(()=>{
						$('.txt').css('transform', 'translateY(' + th + 'px)');
						th = th - 28;
						n = n - 1;
						if(n < 1) {
							n = ph / 28;
							th = 0;
						}
					}, 2500);
				  });
				})
			}
		},
		destroyed() { //清除定时器
			clearInterval(this.times);
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.bull {
		width: 100%;
		height: 28px;
		position: relative;
		line-height: 28px;
		color: #FFFFFF;
		font-size: 16px;
		overflow: hidden;
		background: #e5e3e3;
		.txt{
			padding: 0 10px 0 25px;
			position: absolute;
			top: 0;
			left: 0;
			transition: transform ease-out .2s,
			-webkit-transform ease-out .2s;
			-webkit-transform: translateY(0);
    		transform: translateY(0);
		}
		i {
			font-size: 16px;
			margin-top: 0.3rem;
			margin-left: 0.2rem;
		}
	}
</style>