(function($) {

    'use strict';

    var ModuleName = 'carousel';

    var Module = function(ele, options, options2) {
        this.ele = ele;
        this.$ele = $(ele);
        this.option = options;
        this.option2 = options2;
        this.$Html = $('<img class="mainPic" src="http://fakeimg.pl/600x400/?text=Hello" alt="">' +
            '<div class="up" src="http://fakeimg.pl/350x200/?text=Hello" alt="">' +
            '<a class="up-left" style="text-decoration:none;"><</a>' +
            '<div class="upcontent"></div>' +
            '<a class="up-right" style="text-decoration:none;">></a>' +
            '</div>' +
            '<div class="img-down">' +
            '<div class="img-down_left">※客房以實際入住房型為主,圖片僅提供參考</div>' +
            '<div class="img-down_right">查看大圖<img src="./zoomIn.png" alt=""></div>' +
            '</div>'
        );
        this.$Html2 = $('<div class="down">' +
            '<a class="down-left"> < </a>' +
            '<ul class="smallPic_ul">' +
            '</ul>' +
            '<a class="down-right"> > </a>' +
            '</div>');
    };

    Module.DEFAULTS = {
        pageSize: 6,
        data: [
            './imgs/img11.jpg',
            'http://fakeimg.pl/350x300/?text=2',
            './imgs/img3.jpg',
            './imgs/img12.jpg',
            './imgs/img4.jpg',
            'http://fakeimg.pl/350x300/?text=6',
            './imgs/img5.jpg',
            'http://fakeimg.pl/400x300/?text=8',
            './imgs/img6.jpg',
            './imgs/img7.jpg',
            'http://fakeimg.pl/350x350/?text=11',
            './imgs/img8.jpg',
            './imgs/img9.jpg',
            './imgs/img10.jpg',
            'http://fakeimg.pl/350x300/?text=15',
        ], //==this.option.data 要記得修改

    }

    Module.prototype.init = function() {
        var dataLength = this.option.data.length; //所有圖片的張數
        var smallPicSrc = this.option.data; //option抓到的圖片
        this.creatHtml();
        this.creatSmallPic();
        this.selectSmall();
        this.linkBigPic();
        this.onClickNext();
        this.onClickPrev();
        this.smallArrow();
        this.getSelectPic();
        this.onClickBigImg();
    };

    Module.prototype.onClickBigImg = function() {
        var onClickBigImgCallBack = this.option.onClickBigImg;
        $(".img-down_right").click(function($bigimgBtn) {
            onClickBigImgCallBack($bigimgBtn);
        });
    }

    Module.prototype.creatHtml = function() {
        this.$ele.append(this.$Html);
        $('.col-lg-12').append(this.$Html2);
    } //這個function創造Html

    Module.prototype.linkBigPic = function() {
        var selected = $(".smallPic").hasClass("select");
        if (selected === true) {
            var smallPicSrc = $('.select').attr("src");
            $(".mainPic").attr("src", smallPicSrc);
        }
    }

    Module.prototype.creatSmallPic = function() {
        if (0 < this.option.pageSize && this.option.pageSize <= 6) {
            for (var i = 0; i < (this.option.pageSize); i++) {
                var smallPic = '<li><img class="' + (i) + 'small smallPic" src="' + this.option.data[i] + '"></li>';
                $('.smallPic_ul').append(smallPic);
                $('.smallPic').attr(this.option.data[i])
                if (i % this.option.pageSize === 0) {
                    $('.smallPic').addClass("select");
                }
                // console.log(this.option.data[i]);//這樣可以抓出data圖片的路徑
            } //根據pageSize抓出小圖個數
        } else {
            alert('請將pageSize設定於1到6之間');
        }
        $('.smallPic:first').addClass('first'); //在每列第一張圖片加上'first'的class
        $('.smallPic:last').addClass('last'); //在每列最後一張圖片加上'Last'的class     
    }

    Module.prototype.getSelectPic = function() {
        var smallPicId = $('.select').attr("class");
        var smallPicIdNum = parseInt($('.select').attr("class"));
    }


    Module.prototype.selectSmall = function() {
        $(".smallPic").on("click", function() {
            var smallPicSrc = this.src; //這裡的this指向觸發click事件的物件
            $(".smallPic").removeClass("select");
            $(this).addClass("select");
            $(".mainPic").attr("src", smallPicSrc);
        });
    }

    Module.prototype.onClickNext = function() {
        var optionData = this.option.data;
        var dataLength = this.option.data.length;
        var pageSize = this.option.pageSize;
        var onClickNextCallBack = this.option.onClickNext;
        $('.up-right').on("click", function($nextBtn) {
            var lastIdNumber = parseInt($('.last').attr("class"));
            var selectNumber = parseInt($('.select').attr("class"));
            var firstIdNumber = parseInt($('.first').attr("class"));
            if (selectNumber !== lastIdNumber) {
                var x = selectNumber + 1;
                $(".smallPic").removeClass("select");
                var nowSmall = $('.' + (x++) + 'small');
                nowSmall.addClass("select");
                var nowSmallSrc = nowSmall.attr("src");
                $(".mainPic").attr("src", nowSmallSrc);
            } else if (selectNumber == lastIdNumber && lastIdNumber < 14) {
                $('.smallPic_ul').empty();
                var changePage = firstIdNumber;
                changePage += pageSize;
                for (var i = 0 + changePage; i < (pageSize + changePage) && i < 15; i++) {
                    var smallPic = '<li><img class="' + (i) + 'small smallPic" src="' + optionData[i] + '"></li>';
                    $('.smallPic_ul').append(smallPic);
                    if (i % pageSize === 0) {
                        $('.smallPic').addClass("select");
                    }
                    var selected = $(".smallPic").hasClass("select");
                    if (selected === true) {
                        var smallPicSrc = $('.select').attr("src");
                        $(".mainPic").attr("src", smallPicSrc);
                    }
                    $(".smallPic").on("click", function() {
                        var smallPicSrc = this.src; //這裡的this指向觸發click事件的物件
                        $(".smallPic").removeClass("select");
                        $(this).addClass("select");
                        $(".mainPic").attr("src", smallPicSrc);
                    });
                };
                $('.smallPic:first').addClass('first'); //在每列第一張圖片加上'first'的class
                $('.smallPic:last').addClass('last'); //在每列最後一張圖片加上'Last'的class 
            }
            onClickNextCallBack($nextBtn);
        });
    } //大圖輪播版本(右箭頭)

    Module.prototype.onClickPrev = function() {
        var optionData = this.option.data;
        var dataLength = this.option.data.length;
        var pageSize = this.option.pageSize;
        var onClickPrevCallBack = this.option.onClickPrev;
        var x = 1;
        $('.up-left').on("click", function($prevBtn) {
            var firstIdNumber = parseInt($('.first').attr("class"));
            var selectNumber = parseInt($('.select').attr("class"));
            if (selectNumber !== firstIdNumber) { //抓零沒有用 要馬就抓first 所以還要有一個first的class
                var x = selectNumber - 1;
                $(".smallPic").removeClass("select");
                var nowSmall = $('.' + (x--) + 'small');
                nowSmall.addClass("select");
                var nowSmallSrc = nowSmall.attr("src");
                $(".mainPic").attr("src", nowSmallSrc);
            } else if (selectNumber == firstIdNumber && firstIdNumber > 0) {
                $('.smallPic_ul').empty();
                var changePage = firstIdNumber;
                changePage -= pageSize;
                for (var i = 0 + changePage; i < (pageSize + changePage); i++) {
                    var smallPic = '<li><img class="' + (i) + 'small smallPic" src="' + optionData[i] + '"></li>';
                    $('.smallPic_ul').append(smallPic);
                    if (i % pageSize === 0) {
                        $('.smallPic').addClass("select");
                    }
                    var selected = $(".smallPic").hasClass("select");
                    if (selected === true) {
                        var smallPicSrc = $('.select').attr("src");
                        $(".mainPic").attr("src", smallPicSrc);
                    }
                    $(".smallPic").on("click", function() {
                        var smallPicSrc = this.src; //這裡的this指向觸發click事件的物件
                        $(".smallPic").removeClass("select");
                        $(this).addClass("select");
                        $(".mainPic").attr("src", smallPicSrc);
                    });
                }
            }
            $('.smallPic:first').addClass('first'); //在每列第一張圖片加上'first'的class
            $('.smallPic:last').addClass('last'); //在每列最後一張圖片加上'Last'的class     
            onClickPrevCallBack($prevBtn);
        });
    } //大圖輪播版本(左箭頭)

    //     Module.prototype.onClickNext = function() {
    // 	var optionData = this.option.data;
    //     var dataLength = this.option.data.length;
    //     var pageSize = this.option.pageSize;
    //     var onClickNextCallBack = this.option.onClickNext;
    //     $('.up-right').on( "click" , function($nextBtn) {
    //         var lastIdNumber = parseInt($('.last').attr("class"));
    //         var selectNumber = parseInt($('.select').attr("class"));
    //         if (selectNumber !== lastIdNumber) {
    //             var x = selectNumber + 1;
    //             $(".smallPic").removeClass("select");
    //             var nowSmall = $('.' + (x++) + 'small');
    //             nowSmall.addClass("select");
    //             var nowSmallSrc = nowSmall.attr("src");
    //             $(".mainPic").attr("src", nowSmallSrc);
    //         } else {
    //             var smallPicIdNum = parseInt($('.first').attr("class"));
    //             var x = smallPicIdNum;
    //             $(".smallPic").removeClass("select");
    //             var nowSmall = $('.' + (x++) + 'small');
    //             nowSmall.addClass("select");
    //             var nowSmallSrc = nowSmall.attr("src");
    //             $(".mainPic").attr("src", nowSmallSrc);
    //         }
    //         onClickNextCallBack($nextBtn);
    //     });

    // }//大圖閉包版本(右箭頭)


    // Module.prototype.onClickPrev = function() {
    //     var dataLength = this.option.data.length;
    //     var pageSize = this.option.pageSize;
    //     var onClickPrevCallBack = this.option.onClickPrev;
    //     var x = 1;
    //     $('.up-left').on( "click", function($prevBtn) {
    //         var firstIdNumber = parseInt($('.first').attr("class"));
    //         var selectNumber = parseInt($('.select').attr("class"));
    //         console.log(selectNumber);
    //         console.log(firstIdNumber);
    //         if (selectNumber !== firstIdNumber) { //抓零沒有用 要馬就抓first 所以還要有一個first的class
    //             var x = selectNumber - 1;
    //             $(".smallPic").removeClass("select");
    //             var nowSmall = $('.' + (x--) + 'small');
    //             nowSmall.addClass("select");
    //             var nowSmallSrc = nowSmall.attr("src");
    //             $(".mainPic").attr("src", nowSmallSrc);
    //         } else {
    //             var smallPicIdNum = parseInt($('.last').attr("class"));
    //             var x = smallPicIdNum;
    //             $(".smallPic").removeClass("select");
    //             var nowSmall = $('.' + (x--) + 'small');
    //             nowSmall.addClass("select");
    //             var nowSmallSrc = nowSmall.attr("src");
    //             $(".mainPic").attr("src", nowSmallSrc);
    //         }
    //         onClickPrevCallBack($prevBtn);
    //     });
    // }//大圖閉包版本(左箭頭);

    Module.prototype.smallArrow = function() {
        var pageNumber = this.option.pageSize;
        var dataLength = this.option.data.length;
        var optionData = this.option.data;
        var lastPageNumber = dataLength % pageNumber;
        var onClickNextRoundCallBack = this.option.onClickNextRound;
        var onClickPrevRoundCallBack = this.option.onClickPrevRound;
        $(".down-right").on("click", function($nextroundBtn) {
            var firstIdNumber = parseInt($('.first').attr("class"));
            var smallPicIdNum = parseInt($('.select').attr("class"));
            var lastIdNumber = parseInt($('.last').attr("class"));
            var changePage = firstIdNumber;
            if (lastIdNumber < 14) {
                $('.smallPic_ul').empty();
                changePage += pageNumber;
                for (var i = 0 + changePage; i < (pageNumber + changePage) && i < 15; i++) {
                    var smallPic = '<li><img class="' + (i) + 'small smallPic" src="' + optionData[i] + '"></li>';
                    $('.smallPic_ul').append(smallPic);
                    if (i % pageNumber === 0) {
                        $('.smallPic').addClass("select");
                    }
                    var selected = $(".smallPic").hasClass("select");
                    if (selected === true) {
                        var smallPicSrc = $('.select').attr("src");
                        $(".mainPic").attr("src", smallPicSrc);
                    }
                    $(".smallPic").on("click", function() {
                        var smallPicSrc = this.src; //這裡的this指向觸發click事件的物件
                        $(".smallPic").removeClass("select");
                        $(this).addClass("select");
                        $(".mainPic").attr("src", smallPicSrc);
                    });
                }
            } //測試中
            $('.smallPic:first').addClass('first'); //在每列第一張圖片加上'first'的class
            $('.smallPic:last').addClass('last'); //在每列最後一張圖片加上'Last'的class 
            onClickNextRoundCallBack($nextroundBtn)
        });

        $(".down-left").on("click", function($lastroundBtn) {
            var firstIdNumber = parseInt($('.first').attr("class"));
            var changePage = firstIdNumber;
            var smallPicIdNum = parseInt($('.select').attr("class"));
            if (firstIdNumber > 0) {
                $('.smallPic_ul').empty();
                changePage -= pageNumber;
                for (var i = 0 + changePage; i < (pageNumber + changePage); i++) {
                    var smallPic = '<li><img class="' + (i) + 'small smallPic" src="' + optionData[i] + '"></li>';
                    $('.smallPic_ul').append(smallPic);
                    if (i % pageNumber === 0) {
                        $('.smallPic').addClass("select");
                    }
                    var selected = $(".smallPic").hasClass("select");
                    if (selected === true) {
                        var smallPicSrc = $('.select').attr("src");
                        $(".mainPic").attr("src", smallPicSrc);
                    }
                    $(".smallPic").on("click", function() {
                        var smallPicSrc = this.src; //這裡的this指向觸發click事件的物件
                        $(".smallPic").removeClass("select");
                        $(this).addClass("select");
                        $(".mainPic").attr("src", smallPicSrc);
                    });
                }
            }
            $('.smallPic:first').addClass('first'); //在每列第一張圖片加上'first'的class
            $('.smallPic:last').addClass('last'); //在每列最後一張圖片加上'Last'的class     
            onClickPrevRoundCallBack($lastroundBtn);
        });
    }


    $.fn[ModuleName] = function(method, options, options2) {
        return this.each(function() {
            var $this = $(this);
            var module = $this.data(ModuleName);
            var opts = null;
            var opts2 = null;
            if (!!module) {
                if (typeof method === 'string' && typeof options === 'undefined') {
                    module[method]();
                } else if (typeof method === 'string' && typeof options === 'object' || typeof options === 'string' || typeof options === 'function' || typeof options2 === 'string' || typeof options2 === 'number' || typeof options2 === 'function') {
                    module[method](options, options2);
                } else {
                    console.log('unsupported options!');
                }
            } else {
                opts = $.extend({}, Module.DEFAULTS, (typeof method === 'object' && method), (typeof options === 'object' && options), (typeof options2 === 'object' && options2));
                opts2 = $.extend({}, Module.DEFAULTS, (typeof method === 'object' && method), (typeof options === 'object' && options), (typeof options2 === 'object' && options2));
                module = new Module(this, opts, opts2);
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