
$(document).ready(function(){
    $.getJSON('/waka_api.php', function data(data){
        console.dir(data.daily);
        $('.avatar').attr('src',data.user.photo);
        $('.uname').html(data.user.full_name);
        var programming_now_message;
        var i = 1;
        var color = d3.scale.category20b();
        var platformElements = Object.keys(data.daily.operating_systems).length;
        var countElements = Math.floor(12/platformElements);
        var col = "col-md-"+countElements;
        var w = $('.svgs').width();
        var wh = (w/platformElements)-((w/platformElements)*30/100);
        var wh = wh  > 300 ? 300 : wh;
        $.each(data.daily.operating_systems, function(idx, val){
            spend_time = fromSeconds(val.total_seconds, true);
            var id = val.name.replace(/ /g, '_');
            var elm = '<div class="'+col+' text-center">' +
                '<p class="h2 text-capitalize">'+val.name+'</p>' +
                '<svg height="'+wh+'" width="'+wh+'" id="'+id+'"></svg>' +
                '<p class="text-center text-muted">czas: '+spend_time+'</p></div>';
            $(".svgs").append(elm);
            var _colors = [color(i++), color(i++), color(i++), color(i++)];
            graph(id, val.percent, _colors);

        });

        languages_data = [];
        $.each(data.daily.languages, function(idx, val){
            var v = Number((parseFloat(val.percent)).toFixed(1));
            if (v>0.1) {
                languages_data.push({name: val.name, value: v})
            }
        });

        languages_data.sort(compare);

        graphLanguages(languages_data, 'major-languages', 10);
        //graphLanguages(minor, 'minor-languages');

    })

});