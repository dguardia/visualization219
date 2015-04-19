var chart = c3.generate({
    bindto: '#chart',
    data: {
        url: window.location.href + '/enrollment',
        mimeType: 'json',
        type: 'bar'
    },
    bar: {
        width: {
            ratio: 1 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
    }
});
