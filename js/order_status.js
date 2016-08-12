 
order_status = (function(){
	var OS_UNCONFIRMED=           0; // 未确认
	var OS_CONFIRMED=             1; // 已确认
	var OS_CANCELED=               2; // 已取消
	var OS_INVALID=               3; // 无效
	var OS_RETURNED=             4; // 退货
	var OS_SPLITED=                5; // 已分单
	var OS_SPLITING_PART=          6; // 部分分单
	
	/* 配送状态 */
	var SS_UNSHIPPED=              0; // 未发货
	var SS_SHIPPED=               1; // 已发货
	var SS_RECEIVED=               2; // 已收货
	var SS_PREPARING=              3; // 备货中
	var SS_SHIPPED_PART=          4; // 已发货(部分商品)
	var SS_SHIPPED_ING=           5; // 发货中(处理分单)
	var OS_SHIPPED_PART=           6; // 已发货(部分商品)
	
	/* 支付状态 */
	var PS_UNPAYED=                0; // 未付款
	var PS_PAYING=                1; // 付款中
	var PS_PAYED=                 2; // 已付款
	function unpay(os, ps, ss){
		return os == PS_UNPAYED;
	}
	
	function isCanceled(os){
		return os == OS_CANCELED;
	}
	
	function waitReceive(os,ps, ss){
		var r1 = ps == PS_PAYED;
		var r2 = os == OS_CONFIRMED && ss == SS_UNSHIPPED;
		var r3 = ss == SS_UNSHIPPED && (os == OS_UNCONFIRMED || os == OS_CONFIRMED);
		return {"已付款":r1 , "已发货":r2, "待发货":r3};
	}
	
	
	
	function returned(os){
		return os == OS_RETURNED;
	}
	return {
		unpay:unpay,
		waitReceive:waitReceive,
		returned:returned,
		isCanceled:isCanceled
	};
})();
