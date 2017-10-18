/**
 * Created by MAKS on 13.10.2017.
 */
window.onload = function () {
    buildChartView()
}
var svg;
function buildChartView() {
    var $data = $('.data').attr('data-value')
    //debugger;
    if(svg == undefined){
        svg = dimple.newSvg("#chartContainer",  "100%", 400);
    }
    var myChart = new dimple.chart(svg, JSON.parse("[" + $data + "]")[0]);

    myChart.setBounds(60, 30, "100%", 305);
    //var x = myChart.addTimeAxis("x", "recdate", "%Y-%m-%d", "%d-%m-%Y");
    var x = myChart.addTimeAxis("x", "recdatehour");
    x.tickFormat = "%Y-%m-%d %H:%M";
    x.addOrderRule("Date");

    var y = myChart.addMeasureAxis("y", "countevent");
    y.overrideMax = 100;
    y.tickFormat = ',.1f';
    var s = myChart.addSeries(["devid"], dimple.plot.line);
    myChart.addLegend(60, 10, 500, 20, "bottom");
    myChart.draw();
}
function statloadtranshourView() {
    console.log('statloadtransView is run')
    $('tbody').empty();

    $.ajax({
        type: 'GET',
        url: '/show-statloadtransday',
        data:{},
        success: function(result) {
            //buildChartView(result.data)
            $('tbody').empty();
            for (var row in result.data) {
                $('tbody').append(
                    '<tr>' +
                        '<th width="15%">'+result.data[row].devid+'</th>' +
                        '<th width="15%">'+result.data[row].recdate+'</th>' +
                        '<th width="15%">'+result.data[row].daysum+'</th>' +
                    '</tr>'
                );
            }
        }
    });
}