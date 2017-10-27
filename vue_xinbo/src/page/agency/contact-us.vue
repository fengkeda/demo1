<template>
	<div class="contactUs">
		<head-top :goback='goback' :service='service' :logged='logged'>
			<span class="header_title">联系我们</span>
		</head-top>
        <section>
        	<div>
        		<img src="../../assets/Android/drawable-xhdpi/callme.png"/>
        	</div>
        	<div class="contact">
        		<ul>
        			<li>
        				<label>QQ 1:</label><span>1246927722</span>
        				<label>QQ 2:</label><span>1251481122</span>
        			</li>
        			<li>
        				<label>weixin:</label><span>{{weixin}}</span>
        			</li>
        			<li>
        				<label>email:</label><span>{{email}}</span>
        			</li>
        		</ul>
        	</div>
        </section>
		<foot></foot>
	</div>

</template>

<script>
	import HeadTop from '@/components/header/head'
	import Foot from '@/components/footer/footer'

	export default {
		name: 'contactUs',
		data() {
			return {
				goback: true,
				service: true,
				logged: true,
				sidbar: true,
//				qq:'1246927722',
//				weixin:'456sfa54',
//				email:'56464@464654.com',

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
    .contact{
    	padding: 2rem;
    	ul{
    		li{
    			font-size: 1.6rem;margin-bottom: 0.5rem;
    		}
    	}
    }
</style>