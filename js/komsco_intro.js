;(function($,window,document,undefined){

    var komsco = {
        init:function(){
            this.headerFn();
            this.section1Fn();
            this.section2Fn();
            this.section3Fn();
            this.section4Fn();
            this.section5Fn();
            this.section6Fn();
            this.footerFn();
        },
        headerFn:function(){

        },
        section1Fn:function(){

            var $pageBtn = $('#section1 .page-btn');
            var $stopBtn = $('#section1 .stop-btn');
            var $slide = $('#section1 .slide');
            var $winW = $(window).innerWidth();
            var $txt = $('#section1 .txt');
            var n = $('#section1 .slide').length-1;
            var cnt = 0;
            var cnt2 = 0;
            var z = null;
            var setId = null;
            var setId2 = null;
            var t = 0;

            //메인슬라이드
            function mainNextSlideFn(){
                if(z==null){  //페이지버튼을 클릭하지 않음
                    z = cnt==0?n:cnt-1;
                }
                
                $slide.css({zIndex:1}).stop().animate({opacity:1},0);  //전체 슬라이드 초기화
                $slide.eq( z ).css({zIndex:2});  //다음 슬라이드 보인다.
                $slide.eq(cnt).css({zIndex:3}).stop().animate({opacity:0},0).animate({opacity:1},1500);
                pageBtnFn();
                z = null;
            }
            function mainPrevSlideFn(){
                if(z==null){  //페이지버튼을 클릭하지 않음
                    z = cnt==n?0:cnt+1
                }
                $slide.css({zIndex:1}).stop().animate({opacity:1},0);  //전체 슬라이드 초기화
                $slide.eq(cnt).css({zIndex:2});  //다음 슬라이드 보인다.
                $slide.eq( z ).css({zIndex:3}).stop().animate({opacity:1},0).animate({opacity:0},1500);
                pageBtnFn();
                z = null;
            }
            
            //다음,이전 슬라이드 카운트
            function nextSlideCountFn(){
                cnt++;
                if(cnt > n){
                    cnt=0;
                }
                mainNextSlideFn();
            }
            function prevSlideCountFn(){
                cnt--;
                if(cnt < 0){
                    cnt=n;
                }
                mainPrevSlideFn();
            }

            //페이지버튼
            function pageBtnFn(){
                $pageBtn.removeClass('addPage');
                $pageBtn.eq(cnt>n?0:cnt).addClass('addPage');
            }
            pageBtnFn();

            $pageBtn.each(function(idx){
                $(this).on({
                    click:function(e){
                        e.preventDefault();
                        
                        z=cnt;  //현재 실행 중인 슬라이드

                        if(cnt>idx){    //페이지버튼 클릭 인덱스 값이 cnt보다 더 작으면
                            cnt=idx;    //클릭된 인덱스 번호
                            mainPrevSlideFn();
                        }
                        if(cnt<idx){    //페이지버튼 클릭 인덱스 값이 cnt보다 더 크면
                            cnt=idx;
                            mainNextSlideFn();
                        }
                        stopPalyFn();
                    }
                });
            });

            /*
            $pageBtn.eq(0).on({
                click:function(){
                    cnt=0;
                    mainNextSlideFn();
                }
            });
            $pageBtn.eq(1).on({ 
                click:function(){
                    if(cnt>1){  //cnt가 현재 클릭 인덱스 번호보다 크면(2,3)
                        cnt=1;
                        mainPrevSlideFn();
                    }
                    if(cnt<1){  //cnt가 현재 클릭 인덱스 번호보다 작으면(0)
                        cnt=1;
                        mainNextSlideFn();
                    }
                }
            });
            $pageBtn.eq(2).on({ 
                click:function(){
                    if(cnt>2){  //cnt가 현재 클릭 인덱스 번호보다 크면(4)
                        cnt=2;
                        mainPrevSlideFn();
                    }
                    if(cnt<2){  //cnt가 현재 클릭 인덱스 번호보다 작으면(0,1)
                        cnt=2;
                        mainNextSlideFn();
                    }
                }
            });
            $pageBtn.eq(3).on({
                click:function(){
                    cnt=3;
                    mainNextSlideFn();
                }
            });
            */

            //자동 슬라이드
            function autoTimerFn(){
                setId = setInterval(nextSlideCountFn, 4000);
            }
            autoTimerFn();

            //타이머 중지 자동 타이머
            function stopPalyFn(){
                cnt2=0;  //초기화
                clearInterval(setId);  //초기화
                clearInterval(setId2);  //초기화
                $stopBtn.addClass('addStop');

                setId2 = setInterval(function(){
                    cnt2++;
                    if(cnt2>=5){
                        cnt2=0;
                        clearInterval(setId);
                        clearInterval(setId2);
                        nextSlideCountFn();  //즉시 다음 슬라이드 호출 실행 그리고
                        autoTimerFn();  //오토 타이머는 4초 후에 실행 반복
                        $stopBtn.removeClass('addStop');
                    }
                },1000)
            }

            //플레이버튼 클릭 이벤트(완전 중지)
            $stopBtn.on({
                click:function(e){
                    e.preventDefault();
                    if(t==0){
                        t=1;
                        clearInterval(setId);  //완전 중지
                        $stopBtn.addClass('addStop');
                    }
                    else{
                        t=0;
                        clearInterval(setId); //중지한 다음에 재생(버블링 발생 방지)
                        nextSlideCountFn();
                        autoTimerFn();  //재생
                        $stopBtn.removeClass('addStop');
                    }

                }
            });


        },
        section2Fn:function(){
            var $tabBtn = $('#section2 .tab-btn');
            var $row2_1 = $('#section2 .row2-1');
            var $row2_2 = $('#section2 .row2-2');

            $tabBtn.each(function(idx){
                $(this).on({
                    click:function(e){
                        e.preventDefault();
                        $tabBtn.removeClass('addTab');
                        $(this).addClass('addTab');
                        if(idx==0){
                            $row2_1.css({zIndex:2,position:'relative'}).stop().animate({opacity:0},0).animate({opacity:1},1000);
                            $row2_2.css({zIndex:1,position:'absolute'}).stop().animate({opacity:1},0).animate({opacity:0},0);
                        }
                        if(idx==1){
                            $row2_2.css({zIndex:2,position:'relative'}).stop().animate({opacity:0},0).animate({opacity:1},1000);
                            $row2_1.css({zIndex:1,position:'absolute'}).stop().animate({opacity:1},0).animate({opacity:0},0);
                        }
                    }
                });
            });

        },
        section3Fn:function(){

        },
        section4Fn:function(){

        },
        section5Fn:function(){

        },
        section6Fn:function(){

        },
        footerFn:function(){

        },
    }
    komsco.init();

})(jQuery,window,document);