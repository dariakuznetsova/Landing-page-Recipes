//Останавливаю переход по ссылкам с атрибутом href="#test"
(function(){
    $("a[href='#test']").on('click', function(e) {
        e.preventDefault();
    });
}());



//Слайдер
var silver_track = function () {
    
    var container = $(".my-track");
    var track = $(".slider-container").silverTrack({
        perPage: 1,
        itemClass: "item",
        mode: "horizontal",
        animationAxis: "x"});

    track.install(new SilverTrack.Plugins.Navigator({
        prev: $("a.prev", container),
        next: $("a.next", container)
    }));

    track.install(new SilverTrack.Plugins.CircularNavigator({
        autoPlay: true,
        duration: 2000
    }));

    track.install(new SilverTrack.Plugins.BulletNavigator({
        container: $(".bullet-pagination")
    }));

    track.start();

};

(function() {

    function windowSize(){
        if($(window).width() >= '480') {
            silver_track();
        }else{
            var item_block = $('.slider-container .item'),
                first_child = $('.slider-container .item:first-child'),
                last_child = $('.slider-container .item:last-child'),
                itemWidth = item_block.width(),
                newWidth = 0,
                prevclick = 0,
                nextclick = 0,
                flag_prev = true,
                flag_next = true;

            item_block.each(function() {                
                $(this).css('left','+'+newWidth+'px');
                newWidth = newWidth + itemWidth;
            });

            $('.prev').removeClass('disabled');
            
            $('.next').on('click', function(event) {
                event.preventDefault();

                if(last_child.css('left') !== '0px') {
                    $(item_block).animate({left:'-='+itemWidth+'px'},400);
                };     
            });

            $('.prev').on('click', function(event) {
                event.preventDefault();

                    if(first_child.css('left') !== '0px') {
                       $(item_block).animate({left:'+='+itemWidth+'px'},400); 
                    };
            });
            
        };
    };
    $(window).on('load', windowSize);

}());






//Плавный переход по якорной ссылке на странице
$(document).ready(function(){

    $(".header__button").on("click", function (event) {
        event.preventDefault();

        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        
        $('body,html').animate({scrollTop: top}, 800);
    });

    $(".up-button").on("click", function (event) {
        event.preventDefault();

        var id2  = $(this).attr('href'),
            top = $(id2).offset().top;
        
        $('body,html').animate({scrollTop: top}, 800);
    });

});



//Появление кнопки "Up!"
(function() {
        
        var windowHeight = Math.ceil($(window).height()),
            up_button = $('.up-button');

        $(window).scroll(function() {
            var scrollTop = $(window).scrollTop();
            if(scrollTop > windowHeight) {
               $(up_button).show(); 
            }else if (scrollTop <= windowHeight){
                $(up_button).hide();
            };
        });

}());


//Анимация счетчика по скроллу (в данном случае только один раз)
(function() {

        var flag = true;
        
        $(window).scroll(function() {
            var mainHeight = $(document).outerHeight(true),
                windowHeight = Math.ceil($(window).height()),
                scrollTop = $(window).scrollTop(),
                scrollBottom = $(window).scrollTop() + $(window).height(),
                offset = $('.content-cuisine').offset().top,
                goal = scrollTop - offset;

            if(flag) {
                if(mainHeight == scrollBottom || goal == 0) {
                    $(".spincrement").stop(true,true).spincrement({
                        from: 0,
                        duration: 700
                    });
                    flag = false;
                };                
            }; 
        });

}());

//Иконка-гамбургер
    (function() {
        var $trigger = $('.trigger'),
            burger = $('.burger'),
            hamburger = $('.hamburger');

        $trigger.on('click', function() {
            hamburger.toggleClass('is-active');
        });
    }());