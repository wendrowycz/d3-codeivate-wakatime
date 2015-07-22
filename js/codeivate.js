/**
 * Created by bgrzesiak on 21.07.15.
 */

$(document).ready(function(){
    $.getJSON('https://codeivate.com/users/bgrzesiak.json?callback=?', function data(data){
        console.dir(data);
        var programming_now_message;
        var i = 1;
        var color = d3.scale.category20b();
        var platformElements = Object.keys(data.platforms).length;
        var countElements = Math.floor(12/platformElements);
        var col = "col-md-"+countElements;
        var w = $('.svgs').width();
        var wh = (w/platformElements)-((w/platformElements)*30/100);
        var wh = wh  > 300 ? 300 : wh;
        $.each(data.platforms, function(idx, val){
            spend_time = fromSeconds(val.time, true);
            var id = idx.replace(/ /g, '_');
            var elm = '<div class="'+col+' text-center">' +
                '<p class="h2 text-capitalize">'+idx+'</p>' +
                '<svg height="'+wh+'" width="'+wh+'" id="'+id+'"></svg>' +
                '<p class="text-center text-muted">czas: '+spend_time+'</p></div>';
            $(".svgs").append(elm);
            var _colors = [color(i++), color(i++), color(i++), color(i++)];
            graph(id, val.percent_work, _colors);

        });

        // level
        $('.level').html(Math.floor(parseFloat(data.level)));
        // chart level focus
        chart_data = [
            {name: 'Level', value:data.level},
            {name: 'Fokus', value:data.focus_level}
        ];
        graphChart(chart_data);

        languages_data = [];
        $.each(data.languages, function(idx, val){
            var v = Number((parseFloat(val.level)).toFixed(1));
            if (v>0.1) {
                languages_data.push({name: idx, value: v})
            }
        });

        languages_data.sort(compare);

        minor = [];
        major = [];
        var percentVal = (25/100)*parseFloat(languages_data[0].value);

        $.each(languages_data, function(idx, val){
            if (val.value >= percentVal) {
                major.push(val);
            } else {
                minor.push(val);
            }
        });

        graphLanguages(major, 'major-languages', 4);
        graphLanguages(minor, 'minor-languages', 3);

        if(data.programming_now) {
            $('.programming').addClass('label-success');
            programming_now_message = "Is programming right now in ";
            programming_now_message += data.current_language + ".";
            if(data.streaking_now) {
                programming_now_message += "<br> He is in the zone!";
            }
        } else {
            $('.programming').addClass('label-default');
            programming_now_message = "Is not programming :(";
        }

        $('.programming').html(programming_now_message);
    })

});

