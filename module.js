(function($) {
	
	'use strict';

	var ModuleName='carousel';

	var Module = function ( ele, options ,options2) {
		this.ele = ele;
		this.$ele = $(ele);
		this.option = options;
		this.option2 = options2;
		this.data=data;
		this.data=$(data);
	};
	// 下面是DEFAULTS物件 
	Module.DEFAULTS = {
		speed:1000,
		progressNumber : 90,
		// data:[
		// 	'./imgs/hotes-1.jpg',
	 //        './imgs/img001.jpg',
	 //        'http://fakeimg.pl/350x200/?text=Hello',
	 //        './imgs/img002.jpg',
	 //        'http://fakeimg.pl/350x200/?text=World&font=lobster',
	 //        './imgs/img003.jpg',
	 //        './imgs/img004.jpg',
	 //        'http://fakeimg.pl/350x200/?text=World&font=lobster',
	 //        './imgs/img005.jpg',
	 //        'http://fakeimg.pl/350x200/?text=Hello',
	 //        'http://fakeimg.pl/350x200/?text=World&font=lobster',
	 //        'http://fakeimg.pl/350x200/?text=Hello',
	 //        './imgs/img006.jpg',
	 //        'http://fakeimg.pl/350x200/?text=World&font=lobster',
	 //        'http://fakeimg.pl/350x200/?text=Hello',
		// ],
     }
	
//這裡有clearTimer()
	Module.prototype.init = function () {
		var progressNumber=this.option.progressNumber;
 		this.addTransition();
 		//設定result長度
 		this.$bar.width(progressNumber + '%');
	};
	


	$.fn[ModuleName] = function ( method, options, options2 ) {
		return this.each(function(){
			var $this = $(this);
			var module = $this.data( ModuleName );
			var opts = null;
			var opts2= null;
			if ( !!module ) {
				if ( typeof method === 'string' &&  typeof options === 'undefined' ) {
					module[method]();
				} else if ( typeof method === 'string' && typeof options === 'object' || typeof options === 'string' || typeof options === 'function'|| typeof options2 === 'string' || typeof options2 === 'number'|| typeof options2 === 'function') {
					module[method]( options, options2);
				} else {
					console.log('unsupported options!');
				}
			} else {
				opts = $.extend( {}, Module.DEFAULTS, ( typeof method === 'object' && method ), ( typeof options === 'object' && options ), ( typeof options2 === 'object' && options2 ) );
				opts2 =$.extend( {}, Module.DEFAULTS, ( typeof method === 'object' && method ), ( typeof options === 'object' && options ), ( typeof options2 === 'object' && options2 ) );
				module = new Module(this, opts , opts2);
				$this.data(ModuleName, module);
				module.init();
				// 執行的function
				module.$ele.on(module.transitionEndEvent, function(e, ignore) {
					if (ignore) {
						console.log('trigger transitionend and dont run anything');
					} else {
						module.transitionEnd();
					}
				//模組(on)transition事件
			});
			}
		});
	};
/////////////////////////注意option數量
})(jQuery);