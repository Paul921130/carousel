(function($) {
	
	'use strict';

	var ModuleName='carousel';

	var Module = function ( ele, options ,options2) {
		this.ele = ele;
		this.$ele = $(ele);
		this.option = options;
		this.option2 = options2;
		this.$Html= $('<img class="mainPic" src="http://fakeimg.pl/600x400/?text=Hello" alt="">'
						+'<div class="up" src="http://fakeimg.pl/350x200/?text=Hello" alt="">'
						+'<a class="up-left" href="#"><</a>'
						+'<div class="upcontent"></div>'
						+'<a class="up-right" href="#">></a>'
						+'</div>'
						+'<div class="img-down">'
						+'<div class="img-down_left">※客房以實際入住房型為主,圖片僅供參考</div>'
						+'<div class="img-down_right">查看大圖<img src="./zoomIn.png" alt=""></div>'
						+'</div>'
					);
		this.$Html2=$('<div class="down">'
						+'<a class="down-left"> < </a>'
						+'<ul class="smallPic_ul">'
						// +'<li><img class="smallPic" src="http://fakeimg.pl/350x300/"></li>'
						// +'<li><img class="smallPic" src="http://fakeimg.pl/350x300/"></li>'
						// +'<li><img class="smallPic" src="http://fakeimg.pl/250x250/"></li>'
						// +'<li><img class="smallPic" src="http://fakeimg.pl/350x300/"></li>'
						// +'<li><img class="smallPic" src="http://fakeimg.pl/350x200/"></li>'
						// +'<li><img class="smallPic" src="http://fakeimg.pl/350x300/"></li>'
						+'</ul>'
						+'<a class="down-right"> > </a>'
						+'</div>')
		this.$smallPic= $('<li><img class="smallPic" src="http://fakeimg.pl/350x300/"></li>')

	};
	// 下面是DEFAULTS物件 
	Module.DEFAULTS = {
		 pageSize:6,
		 data:[
			'http://fakeimg.pl/350x300/',
	        'http://fakeimg.pl/350x300/',
	        'http://fakeimg.pl/250x250/',
	        'http://fakeimg.pl/350x300/',
	        'http://fakeimg.pl/350x200/',
	        'http://fakeimg.pl/350x300/',
	        'http://fakeimg.pl/350x300/',
	        'http://fakeimg.pl/400x300/',
	        'http://fakeimg.pl/250x300/',
	        'http://fakeimg.pl/350x400/',
	        'http://fakeimg.pl/350x350/',
	        'http://fakeimg.pl/350x200/',
	        'http://fakeimg.pl/350x400/',
	        'http://fakeimg.pl/400x300/',
	        'http://fakeimg.pl/350x300/',
		],
     }
	
//這裡有clearTimer()
	Module.prototype.init = function () {
		var a = this.option.pageSize;
		console.log(a);
		this.creatHtml();
		this.creatSmallPic();
		$(".smallPic").click(function(){
			var smallPicSrc =this.src;//這裡的this指向觸發click事件的物件
    		$(".smallPic").removeClass("select");
        	$(this).addClass( "select" );
        	$(".mainPic").attr("src",smallPicSrc); 
    	});

    	//以下是測試區
    	
	};

//這個function創造Html	
	Module.prototype.creatHtml = function () {
		this.$ele.append(this.$Html);
		$('.col-lg-12').append(this.$Html2);
	}
	Module.prototype.creatSmallPic = function (){
		// for(var i = 0 ; i < (this.option.pageSize - 1); i++){
		// 	$('.smallPic_ul').append(this.$smallPic);
		// }
		for(var i = 0 ; i < (this.option.pageSize - 1); i++){
			$('.smallPic_ul').append(this.$smallPic);
    		console.log(Module.DEFAULTS.data[i]);
    	}//這樣可以抓出data圖片的路徑

    	var b = Module.DEFAULTS.data[1];
    	console.log(b);
	}	


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