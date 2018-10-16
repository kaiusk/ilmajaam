jQuery.fn.updateWithText = function (text, speed) {
    var dummy = $('<div/>').html(text);

    if ($(this).html() != dummy.html()) {
        $(this).fadeOut(speed / 2, function () {
            $(this).html(text);
            $(this).fadeIn(speed / 2, function () {
                //done
            });
        });
    }
}

jQuery.fn.outerHTML = function (s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

function roundVal(temp) {
    return Math.round(temp * 10) / 10;
}

function kmh2beaufort(kmh) {
    var speeds = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117, 1000];
    for (var beaufort in speeds) {
        var speed = speeds[beaufort];
        if (speed > kmh) {
            return beaufort;
        }
    }
    return 12;
}

jQuery(document).ready(function ($) {

    var news = [];
    var newsIndex = 0;

    //var eventList = [];

    //var lastCompliment;
    //var compliment;

    moment.lang(lang);

    //connect do Xbee monitor
    /*var socket = io.connect('http://rpi-development.local:8080');
     socket.on('dishwasher', function (dishwasherReady) {
     if (dishwasherReady) {
     $('.dishwasher').fadeIn(2000);
     $('.lower-third').fadeOut(2000);
     } else {
     $('.dishwasher').fadeOut(2000);
     $('.lower-third').fadeIn(2000);
     }
     });
     */

    (function checkVersion() {
        $.getJSON('githash.php', {}, function (json, textStatus) {
            if (json) {
                if (json.gitHash != gitHash) {
                    window.location.reload();
                    window.location.href = window.location.href;
                }
            }
        });
        setTimeout(function () {
            checkVersion();
        }, 3000);
    })();

    (function updateTime() {
        var now = moment();
        var date = now.format('LLLL').split(' ', 4);
        date = date[0] + ' ' + date[1] + ' ' + date[2] + ' ' + date[3];

        $('.date').html(date);
        $('.time').html(now.format('HH') + ':' + now.format('mm') + '<span class="sec">' + now.format('ss') + '</span>');

        setTimeout(function () {
            updateTime();
        }, 1000);
    })();

    (function fetchNews() {
        $.feedToJson({
            feed: 'http://uudised.err.ee/uudised_rss.php',
            success: function (data) {
                news = [];
                for (var i in data.item) {
                    var item = data.item[i];
                    news.push(item.title);
                }
            }
        });
        setTimeout(function () {
            fetchNews();
        }, 100000);
    })();

    (function showNews() {
        var newsItem = news[newsIndex];
        $('.news').updateWithText(newsItem, 2000);

        newsIndex--;
        if (newsIndex < 0) newsIndex = news.length - 1;
        setTimeout(function () {
            showNews();
        }, 5500);
    })();

});
