/**
 * http请求
 */
export const http = (url) => {
		let self = this;
		let reToken = sessionStorage.getItem('refreshToken');
		let acToken = sessionStorage.getItem('accessToken');
		let siToken = sessionStorage.getItem('singleToken');
		
		if(reToken && acToken && siToken){
			
			this.axios.get(url,{
				headers:{
					refreshToken:reToken,
					Authorization:'Bearer ' + acToken,
					singleToken:siToken,
				}
			}).then(function(res){
				
				if(res.data.status == 1){
					
					console.log(res.data)
					const refreshToken = res.headers.refreshtoken;
					const accessToken = res.headers.authorization;
					const singleToken = res.headers.singletoken;
					
					window.sessionStorage.setItem('refreshToken', refreshToken);
					window.sessionStorage.setItem('accessToken', accessToken);
					window.sessionStorage.setItem('singleToken', singleToken);
					
				}
			}).catch(function(error){
						console.log('获取信息失败')
			})
			
		}
}

