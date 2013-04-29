require({
    paths: {
        'highcharts': 'http://news.bbcimg.co.uk/news/special/shared/js/highcharts/2.3.3/highcharts',
        'bbcTheme': '/news/special/2012/newsspec_4551/js/themes/bbc'
    }
},
    ['jquery-1', 'gelui-1', './js/PPCalculator', './data/petrol', 'highcharts', 'bbcTheme'],
    function ($, gelui, PPCalculator, petrolData, Highcharts, theme) {
        $(function () {
        });