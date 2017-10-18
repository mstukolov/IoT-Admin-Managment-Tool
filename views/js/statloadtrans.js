/**
 * Created by MAKS on 13.10.2017.
 */
window.onload = function () {

}
var svg;
function buildChartView(data) {
    if(svg == undefined){
        svg = dimple.newSvg("#chartContainer",  "100%", 400);
    }
    var myChart = new dimple.chart(svg, data);
    myChart.setBounds(60, 30, "100%", 305);
    var x = myChart.addTimeAxis("x", "recdate", "%Y-%m-%d", "%d-%m-%Y");
    x.addOrderRule("Date");
    var y = myChart.addMeasureAxis("y", "daysum");
    y.overrideMax = 1500;
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
            buildChartView(result.data)
            $('tbody').empty();
            for (var row in result.data) {
                $('tbody').append(
                    '<tr>' +
                        '<th width="5%">'+result.data[row].orgid+'</th>' +
                        '<th width="15%">'+result.data[row].organization+'</th>' +
                        '<th width="15%">' +
                        '<a href="/statloadtranshour?devid=' + result.data[row].devid + '">' +
                            result.data[row].devid
                        +'</a>'+
                        '</th>' +
                        '<th width="15%">'+result.data[row].recdate+'</th>' +
                        '<th width="15%">'+result.data[row].daysum+'</th>' +
                    '</tr>'
                );
            }
        }
    });
}

function findTableRows(tableId, inputTextId) {
    // Declare variables
    var input, filter, table, tr, td, i;
    input = document.getElementById(inputTextId);
    filter = input.value.toUpperCase();
    table = document.getElementById(tableId);
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("th")[1];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}