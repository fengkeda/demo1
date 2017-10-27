<template>
<div class="introduction">
    <head-top :goback='goback' :service='service' :logged='logged'>
		<span class="header_title">品牌介绍</span>
	</head-top>
	<div class="bg_2"></div>
    <section class="common_content">
    	<h2>品牌介绍</h2>
    	<p>
    		新博集团成立于2006年，总部设于菲律宾马尼拉，是一家致力于商业地产、商业连锁、旅游购物、休闲娱乐和文化传媒等诸多领域的上市集团公司。旗下的“凯悦娱乐场酒店(Hyatt Hotel and Casino Manila)”是马尼拉湾的豪华地标，颇受瞩目，富丽堂皇，尤其是内部的娱乐场，各国游客都趋之若鹜。同时，该集团旗下运营的“新博娱乐城”，是全球知名网络博彩平台，受到全球特别是亚洲地区热爱网络游戏的广大玩家所喜爱和信赖！
    	</p>
    	<h2>公司文化</h2>
    	<p>
    		新博国际秉承以人为本，科技立身为宗旨，为业界研发打造10秒到账（秒提）技术，致力为博彩界打造提款最迅速的公司。
    	</p>
    	<h3>品牌优势</h3>
    	<ul>
    		<li>1、提款：20万以下提款10秒到账，全球首发。</li>
    		<li>2、服务：7*24小时在线服务，提供优质服务。</li>
    		<li>3、安全：采用128位ssl高标准加密技术。</li>
    		<li>4、佣金结算：采用全球最优质的结算方式日结佣金。</li>
    		<li>5、产品丰富：真人视讯，电子游艺，体育，时时彩，六合彩等。</li>
    		<li>6、强大的品牌优势：多年业界运营实践经验，咨询丰富。</li>
    		<li>7、平台自动化：自助优惠，自助洗码，独立研发。</li>
    		
    	</ul>
    	<p>无论您拥有的是网络资源，或是人脉资源，都欢迎您加入新博国际合作商的行列，无须承担任何费用，就可以开始无上限的收入，新博国际绝对是您最明智的选择！</p>
    </section>



	<foot></foot>
</div>


</template>

<script>
	import HeadTop from '@/components/header/head'
	import Foot from '@/components/footer/footer'

	export default {
		name: 'introduction',
		data() {
			return{
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
	
	.introduction{
	}
</style>