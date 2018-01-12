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
		this.$Html2= $ ('<div class="down">'
						+'<a class="down-left"> < </a>'
						+'<ul class="smallPic_ul">'
						+'</ul>'
						+'<a class="down-right"> > </a>'
						+'</div>');
		this.$nextBtn=$('.up-right');
		this.$prevBtn=$('.up-left');
		this.$nextroundBtn=$('.down-right');
		this.$lastroundBtn=$('.down-left');
		// this.selectSmall=function(){
		// 	var smallPicId = $('.select').attr("id");
		// 	var smallPicIdNum= parseInt(smallPicId);
		// 	var x=smallPicIdNum;
		// 	console.log(x);
		// }
		// this.$change = 6;
	};
	// 下面是DEFAULTS物件 
	Module.DEFAULTS = {
		 pageSize:6,
		 data:[
			'http://fakeimg.pl/350x300/?text=1',
	        'http://fakeimg.pl/350x300/?text=2',
	        'http://fakeimg.pl/250x250/?text=3',
	        'http://fakeimg.pl/350x300/?text=4',
	        'http://fakeimg.pl/350x200/?text=5',
	        'http://fakeimg.pl/350x300/?text=6',
	        'http://fakeimg.pl/350x300/?text=7',
	        'http://fakeimg.pl/400x300/?text=8',
	        'http://fakeimg.pl/250x300/?text=9',
	        'http://fakeimg.pl/350x400/?text=10',
	        'http://fakeimg.pl/350x350/?text=11',
	        'http://fakeimg.pl/350x200/?text=12',
	        'http://fakeimg.pl/350x400/?text=13',
	        'http://fakeimg.pl/400x300/?text=14',
	        'http://fakeimg.pl/350x300/?text=15',
		],
     }
	

	Module.prototype.init = function () {
		var dataLength=Module.DEFAULTS.data.length;
		console.log(dataLength);
		var smallPicSrc=Module.DEFAULTS.data;
		console.log(smallPicSrc);
		this.creatHtml();
		this.creatSmallPic();
		this.selectSmall();
		this.linkBigPic();
		
		this.onClickNext();
		this.onClickPrev();
		this.onClickNextRound();
		this.onClickPrevRound();
		this.smallArrow();
		this.getSelectPic();
	};

	
	Module.prototype.creatHtml = function () {
		this.$ele.append(this.$Html);
		$('.col-lg-12').append(this.$Html2);
	}//這個function創造Html

	Module.prototype.linkBigPic = function (){
		var selected = $( ".smallPic" ).hasClass( "select" );
		if( selected === true){
			var smallPicSrc = $('.select').attr("src");
			$(".mainPic").attr("src",smallPicSrc);	
		}
	}

	Module.prototype.creatSmallPic = function (){
			if( 0 < this.option.pageSize && this.option.pageSize <=6 ){
				for(var i = 0; i < (this.option.pageSize); i++){
						var smallPic = '<li><img class="smallPic" id="'+ (i) +'small" src="'+Module.DEFAULTS.data[i]+'"></li>';
						$('.smallPic_ul').append(smallPic);
						$('.smallPic').attr(Module.DEFAULTS.data[i] )
						if(i % this.option.pageSize === 0){
							$('.smallPic').addClass( "select" );
						}
			    		// console.log(Module.DEFAULTS.data[i]);//這樣可以抓出data圖片的路徑
			    	}//根據pageSize抓出小圖個數
				}else{
					alert('請將pageSize設定於1到6之間');
				}
	}
	Module.prototype.getSelectPic = function (){
		var smallPicId = $('.select').attr("id");
		var smallPicIdNum= parseInt($('.select').attr("id"));
		var x=smallPicIdNum;
		console.log(x);
	}
	Module.prototype.selectSmall=function(){
		$(".smallPic").click(function(){
			var smallPicSrc = this.src;//這裡的this指向觸發click事件的物件
    		$(".smallPic").removeClass("select");
        	$(this).addClass( "select" );
        	$(".mainPic").attr("src",smallPicSrc); 
    	});
	}

	Module.prototype.onClickNext = function (){
		var dataLength =Module.DEFAULTS.data.length;
		var pageSize=this.option.pageSize;
		$('.up-right').click(function(){
				var smallPicId = $('.select').attr("id");
				var smallPicIdNum= parseInt($('.select').attr("id"));
				var x = smallPicIdNum+1;
				$(".smallPic").removeClass("select");
				var nowSmall=$('#'+ (x++) +'small');
				nowSmall.addClass( "select" );
				var nowSmallSrc=nowSmall.attr("src");
				console.log(nowSmallSrc);
				$(".mainPic").attr("src",nowSmallSrc);
				console.log('this is up right Btn!');
		});

	}
	Module.prototype.onClickPrev = function (){
		var dataLength =Module.DEFAULTS.data.length;
		var pageSize=this.option.pageSize;
		var x=1;
		$('.up-left').click(function(){
			var smallPicId = $('.select').attr("id");
			var smallPicIdNum= parseInt($('.select').attr("id"));
			var x = smallPicIdNum-1;	
			$(".smallPic").removeClass("select");
			// var dataLength =Module.DEFAULTS.data.length;
			var nowSmall=$('#'+(x--)+'small');
			nowSmall.addClass( "select" );
			var nowSmallSrc=nowSmall.attr("src");
			console.log(nowSmallSrc);
			$(".mainPic").attr("src",nowSmallSrc);
			console.log('this is up right Btn!');
		});
	}
//doing
	Module.prototype.onClickNextRound = function (){
		var pageNumber = this.option.pageSize;
		var changePage = 0;
		$('.down-right').click(function(){
			console.log('this is down right Btn!');
			// // var a=2;
			// // for (var i=0; i < 3;i++){
			// // 	$('.smallPic').attr('src',Module.DEFAULTS.data[i+a])
			// // }
		});
	}
//doing
	Module.prototype.onClickPrevRound = function (){
		$('.down-left').click(function(){
			console.log('this is down left Btn!');
		});
	}

	Module.prototype.smallArrow = function (){
			var pageNumber = this.option.pageSize;
			var changePage = 0;
			$(".down-right").click(function(){
					$('.smallPic_ul').empty();
					changePage += pageNumber;
					for(var i = 0 + changePage; i < (pageNumber + changePage) && i < 15; i++ ){
						var smallPic = '<li><img class="smallPic" id="'+ (i) +'small" src="'+Module.DEFAULTS.data[i]+'"></li>';
						$('.smallPic_ul').append(smallPic);
						if(i % pageNumber === 0){
							$('.smallPic').addClass( "select" );
						}
						var selected = $( ".smallPic" ).hasClass( "select" );
							if( selected === true){
								var smallPicSrc = $('.select').attr("src");
								$(".mainPic").attr("src",smallPicSrc);	
						}
						$(".smallPic").click(function(){
							var smallPicSrc = this.src;//這裡的this指向觸發click事件的物件
				    		$(".smallPic").removeClass("select");
				        	$(this).addClass( "select" );
				        	$(".mainPic").attr("src",smallPicSrc); 
				    	});
					}
					console.log(i);
			});
	
			$(".down-left").click(function(){
						$('.smallPic_ul').empty();
						changePage -= pageNumber;
						for(var i = 0 + changePage; i < ( pageNumber + changePage )&&i >= 0; i++){
						var smallPic = '<li><img class="smallPic" id="'+ (i) +'small" src="'+Module.DEFAULTS.data[i]+'"></li>';
						$('.smallPic_ul').append(smallPic);
						if(i % pageNumber === 0){
							$('.smallPic').addClass( "select" );
						} 
						var selected = $( ".smallPic" ).hasClass( "select" );
							if( selected === true){
								var smallPicSrc = $('.select').attr("src");
								$(".mainPic").attr("src",smallPicSrc);	
						}
						$(".smallPic").click(function(){
							var smallPicSrc = this.src;//這裡的this指向觸發click事件的物件
				    		$(".smallPic").removeClass("select");
				        	$(this).addClass( "select" );
				        	$(".mainPic").attr("src",smallPicSrc); 
					    	});
						}
						console.log(i);
			});		
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