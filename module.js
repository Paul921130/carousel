(function($) {
	
	'use strict';

	var ModuleName='ps_flpk';

	var Module = function ( ele, options ,options2) {
		this.ele = ele;
		this.$ele = $(ele);
		this.option = options;
		this.option2 = options2;
		this.progressPercent = 0;
		this.$result=$('<div class="result" ></div>');
		this.$bar = $('.result');
		this.$totalWidth =$('.ps_flpk').width();
		this.transitionEndEvent = function (transitions){
			var a = document.createElement("fakeelement");
			for (var t in transitions){
				if (a.style[t] !== undefined){
					return transitions[t];
				}
			}
			}({
				"transition": "transitionend",
			});
		//判斷模組有在進行transition!!!	
		// this.getBarLength=function(barLenght){
		//   	var barLenght = $('.result').width()/this.$totalWidth*100;
		//   	console.log( barLenght+'%');
		//   }
		// this.Time = setInterval(this.getBarLength, 100);

	};
	
	// 下面是DEFAULTS物件 
	Module.DEFAULTS = {
		speed:1000,
		progressNumber : 90,
     }
	
//這裡有clearTimer()
	Module.prototype.init = function () {
		var progressNumber=this.option.progressNumber;
 		this.addTransition();
 		//設定result長度
 		this.$bar.width(progressNumber + '%');
	};
	
	Module.prototype.assignPercent = function( asOpt , asOpt2){
		if(asOpt <= 100 && asOpt >= 0){
			this.$bar.width(asOpt + '%');
		}else if( asOpt < 0){
			this.$bar.width(0 + '%');
		}else{
			this.$bar.width(100 + '%');
		}
		var progressNumber = asOpt2;
		var number=asOpt;
		progressNumber(number+'%');			 		
	}
/////完成80%
	Module.prototype.nextProgress = function(neOpt){
		var nowNumber = this.$bar.width() / this.$totalWidth *100;
		//抓出result的width;
		var nextNumber= ( 100 - nowNumber ) / 5 + nowNumber;
		var nowNumber =+ nextNumber;
		if( nowNumber < 100 ){
			this.$bar.width(nowNumber+'%');
		}
		if(typeof neOpt==='function' ){
			var progressNumber = neOpt;
			var number = nowNumber;
			progressNumber(number+'%');
		}
	}


	Module.prototype.doneProgress = function(dOpt){
		this.$bar.width(100+'%');
		if(typeof dOpt==='function' ){
			var progressNumber = dOpt;
			progressNumber(100+'%');
		}		  		
	}

	Module.prototype.zeroProgress = function(zOpt){
		this.$bar.width(0 +'%');
		if(typeof zOpt==='function' ){
			var progressNumber = zOpt;
			progressNumber(0+'%');
		}
	}

	Module.prototype.addTransition = function() {
		var transtionNumber = this.option.speed+'ms';
		this.$bar.css('transition',transtionNumber);
	};
		
   	Module.prototype.transitionEnd = function () {
   		var nowWidth=$('.result').width() /this.$totalWidth*100;
   		console.log(nowWidth+'%');
   		return this;
   		// console.log('我知道這樣不好');
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