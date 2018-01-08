// html

//<div class="carousel"></div>


// usage js


$('.carousel').carousel({
    // 輸入圖片資料來源
    data: [
        './imgs/hotes-1.jpg',
        './imgs/img001.jpg',
        'http://fakeimg.pl/350x200/?text=Hello',
        './imgs/img002.jpg',
        'http://fakeimg.pl/350x200/?text=World&font=lobster',
        './imgs/img003.jpg',
        './imgs/img004.jpg',
        'http://fakeimg.pl/350x200/?text=World&font=lobster',
        './imgs/img005.jpg',
        'http://fakeimg.pl/350x200/?text=Hello',
        'http://fakeimg.pl/350x200/?text=World&font=lobster',
        'http://fakeimg.pl/350x200/?text=Hello',
        './imgs/img006.jpg',
        'http://fakeimg.pl/350x200/?text=World&font=lobster',
        'http://fakeimg.pl/350x200/?text=Hello',
    ],
    // heightRate:0.5625,//通過比例值計算高度
    pageSize:6, //縮略圖個數
    // 點擊看大圖時執行 callback
    onClickBigImg: function($bigimgBtn){
        console.log($bigimgBtn)
    },//callBack jquery選取物件
    // 點擊下一張圖時執行 callback
    onClickNext: function($nextBtn){
        console.log($nextBtn)
    },
    // 點擊上一張圖時執行 callback
    onClickPrev: function($prevBtn){
        console.log($prevBtn)
    },
    // 點擊下一組圖時執行 callback!!!
    onClickNextRound: function($nextroundBtn){
        console.log($nextroundBtn)
    },
    // 點擊上一組圖時執行 callback!!!
    onClickPrevRound: function($lastroundBtn){
        console.log($lastroundBtn)
    }
});