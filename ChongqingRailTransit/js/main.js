$(function () {
    /*S 第一页的开始查询*/
    $('.query_btn').click(function () {
        var topNum = $('.page_2').offset().top;
        $('html, body').animate({
            'scrollTop': topNum
        }, 500);
    });
    /*E 第一页的开始查询*/

    /*S 下拉选择*/
    $(".dropdown p").click(function () {
        var ul = $(this).parent().find('ul');
        ul.parents('.query_select').siblings().find('ul').slideUp('fast');
        if (ul.css("display") == "none") {
            ul.slideDown("fast");
        } else {
            ul.slideUp("fast");
        }
    });
    $(".dropdown ul li a").click(function () {
        var that = $(this);
        var txt = that.text();
        that.parents('.dropdown').find('p').html(txt);
        var value = that.attr("rel");
        that.parents('ul').hide();
    });
    /*E 下拉选择*/

    /*S 第一页的小轻轨*/
    var imgSet = [
        'images/scenery1/奥体中心_2号线袁家岗站.jpg',
        'images/scenery1/巴国城_2号线马王场站.jpg',
        'images/scenery1/白公馆_1号线烈士墓站.jpg',
        'images/scenery1/朝天门_1号线小什字站.jpg',
        'images/scenery1/磁器口_1号线磁器口站.jpg',
        'images/scenery1/大礼堂_2号线曾家岩站.jpg',
        'images/scenery1/洪崖洞_1-2号线较场口站.jpg',
        'images/scenery1/皇冠大扶梯_1-3号线两路口站.jpg',
        'images/scenery1/黄金双子塔_3号线工贸站.jpg',
        'images/scenery1/解放碑_1-2号线较场口站.jpg',
        'images/scenery1/缙云山_6号线北碚站.jpg',
        'images/scenery1/烈士墓_1号线烈士墓站.jpg',
        'images/scenery1/罗中立美术馆_1号线尖顶坡站.jpg',
        'images/scenery1/美术馆_1-2号线较场口站.jpg',
        'images/scenery1/南山植物园_3号线南坪站.jpg',
        'images/scenery1/三峡博物馆_2号线曾家岩站.jpg',
        'images/scenery1/宋庆龄故居_1-3号线两路口站.jpg',
        'images/scenery1/园博园_3号线园博园站.jpg',
        'images/scenery1/长江索道_1号线小什字站.jpg',
        'images/scenery1/自然博物馆_6号线状元碑站.jpg'
    ];

    (function ($) {
        var cache = [];
        $.preLoadImages = function () {
            var args_len = arguments.length;
            for (var i = args_len; i--;) {
                var cacheImage = document.createElement('img');
                cacheImage.src = arguments[i];
                cache.push(cacheImage);
            }
        }
    })(jQuery);
    $.each(imgSet, function (index, val) {
        $.preLoadImages(val);
    });

    var obstacle = [];
    var page_num = 0;
    var currObstacle = [];
    $('.scenery_center').each(function (i, o) {
        obstacle.push(o);
    });
    obstacle.reverse();
    trainExercise();
    function trainExercise() {
        $('.light_rail_1').animate({
            textIndex: $(window).width() + $(window).width() / 3 * 1
        }, {
            duration: 10000,
            easing: 'linear',
            step: function (now, fx) {
                var that = $(this);
                obstacle.forEach(function (o, i) {
                    if (parseInt(that.offset().left) <= parseInt($(o).offset().left + $(o).width())) {
                        $(o).addClass('active');
                        currObstacle.push(obstacle.shift());
                    }
                });
                currObstacle.forEach(function(o, i){
                    if(parseInt(that.offset().left) < parseInt($(o).offset().left-$(o).width()*2)){
                        $(o).removeClass('active');
                        currObstacle.shift();
                    }
                });
                $(this).css({
                    '-webkit-transform': 'translate(' + (-now) + 'px, -100%)',
                    '-moz-transform': 'translate(' + (-now) + 'px, -100%)',
                    'transform': 'translate(' + (-now) + 'px, -100%)'
                });
            },
            complete: function () {
                $(this).css('textIndex', '0');
                $(this).css({
                    '-webkit-transform': 'translate(100%, -100%)',
                    '-moz-transform': 'translate(100%, -100%)',
                    'transform': 'translate(100%, -100%)'
                });

                page_num = (++page_num) >= (imgSet.length / 5) ? 0 : page_num;

                $('.scenery_center').each(function (i, o) {
                    var imgSrc = imgSet[(page_num * 5) + i];
                    var nameStr = imgSrc.split('.')[0].split('/')[2].split('_');
                    $(o).find('.scenery_name').text(nameStr[0]);
                    $(o).find('.scenic_site').text(nameStr[1]);
                    $(o).removeClass('active').find('.scenery_img').attr('src', imgSrc);
                    obstacle.push(o);
                });
                obstacle.reverse();
                trainExercise();
            }
        });
    }

    $('.scenery_center').hover(function () {
        $('.light_rail_1').pause();
    }, function () {
        $('.light_rail_1').resume();
    });
    /*E 第一页的小轻轨*/

    /*S 第一屏风景图获得鼠标动画*/
    var flg_active = false;
    $('.scenery_center').hover(function () {
        if ($(this).hasClass('active')) {
            flg_active = !flg_active;
            $(this).addClass('active2');
            return;
        }
        $(this).addClass('active');
    }, function () {
        if (flg_active) {
            $(this).removeClass('active2');
            flg_active = !flg_active;
            return;
        }
        $(this).removeClass('active');
    });
    /*E 第一屏风景图获得鼠标动画*/


    /*S 滚动时第二屏的过度动画*/
    var _window = $(window);
    var WH;
    var _sms_ani = $('.sms-ani');
    var _ss_ani = $('.ss-ani');
    var _scrollTop = _window.scrollTop();
    function scrollAni(n) {
        WH = WH >= 880 ? WH : 880;
        if (n <= 100) {
            _sms_ani.removeClass('active');
            _ss_ani.removeClass('active');
        } else if (n > 100 && n <= WH + 100) {
            _sms_ani.addClass('active');
            _ss_ani.removeClass('active');
        } else if (n > WH + 100 && n <= WH * 2 + 100) {
            _sms_ani.addClass('active');
            _ss_ani.addClass('active');
        } else if (n > WH * 2 + 100 && n <= 3 * WH) {
            _ss_ani.addClass('active');
            _sms_ani.removeClass('active');
        } else {
            _ss_ani.removeClass('active');
            _sms_ani.removeClass('active');
        }
    }
    scrollAni(_scrollTop);
    $(window).scroll(function () {
        _scrollTop = _window.scrollTop();
        scrollAni(_scrollTop);
    });
    /*E 滚动时第二屏的过度动画*/

    /*S 第二页左侧导航获得鼠标动画*/
    $('.nav_left_item').click(function () {
        var currThis = $(this),
            name = currThis.attr('data-alias');

        currThis.addClass('active').siblings().removeClass('active');
        if ($('.nav_left_info_cen').children('.' + name).length > 0) {
            $('.nav_left_info_cen').children('.' + name).css({
                'visibility': 'visible'
            }).siblings().css({
                'visibility': 'hidden'
            });
        }
    });
    /*E 第二页左侧导航获得鼠标动画*/

    /*S 第二页线路查询*/
    $('.query_btn_line').click(function () {
        $('#price').text('8元');
        $('#used_time').text('58分钟');
        $('#platform_num').text('38站');
        $('.nav_left_info_cen').children('.lineT').css({
            'visibility': 'visible'
        }).siblings().css({
            'visibility': 'hidden'
        });
        setTimeout(function () {
            $('.nav_left_info_cen').children('.lineT').find('.line_img_1').addClass('active')
        }, 500);
    });
    /*E 第二页线路查询*/

    /*S 第二页轮播*/
    var swiper = new Swiper('.swiper-container', {
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        loopedSlides: 5,
        autoplay: true,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '.swiper-banner-next',
            prevEl: '.swiper-banner-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            progress: function (progress) {
                for (i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i);
                    var slideProgress = this.slides[i].progress;
                    modify = 1;
                    if (Math.abs(slideProgress) > 1) {
                        modify = (Math.abs(slideProgress) - 1) * 0.1 + 1;
                    }
                    translate = slideProgress * modify * 120 + 'px';
                    scale = 1 - Math.abs(slideProgress) / 5;
                    zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                    slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                    slide.css('zIndex', zIndex);
                    slide.css('opacity', 1);
                    if (Math.abs(slideProgress) > 3) {
                        slide.css('opacity', 0);
                    }
                }
            },
            setTransition: function (transition) {
                for (var i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i)
                    slide.transition(transition);
                }

            }
        }
    })
    /*E 第二页轮播*/
});