$(document).ready(function() {

    var donut = c3.generate({
        bindto: '#donut',
        data: {
            url: window.location.href + '/gender-information',
            mimeType: 'json',
            type: 'donut'
        },
        donut: {
            title: 'Gender Percentage'
        },
        bar: {
            width: {
                ratio: 1 // this makes bar width 50% of length between ticks
            }
        }
    });
    var chart = c3.generate({
        bindto: '#chart',
        data: {
            url: window.location.href + '/gender-information',
            mimeType: 'json',
            type: 'bar'
        },
        bar: {
            width: {
                ratio: 1 // this makes bar width 50% of length between ticks
            }
        }
    });

});