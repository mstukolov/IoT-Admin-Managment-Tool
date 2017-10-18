/**
 * Created by MAKS on 04.08.2017.
 */
window.onload = function () {

    // Создает экземпляр карты и привязывает его к созданному контейнеру
    var map = new YMaps.Map(document.getElementById("YMapsID"));
    // Устанавливает начальные параметры отображения карты: центр карты и коэффициент масштабирования
    map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 10);
    map.enableScrollZoom()

    var devices = document.getElementsByClassName("deviceid");
    for(var i=0; i<devices.length; i++) {
        $.ajax({
            type: 'GET',
            url: '/findByName',
            data:{devid: devices[i].innerText},
            success: function(result) {
                var placemark = new YMaps.Placemark(new YMaps.GeoPoint(result['lng'],result['ltd']));
                map.addOverlay(placemark);
            }
        });
    }

    var elements = document.getElementsByClassName("time");
    var curdate = new Date()
    for(var i=0; i<elements.length; i++) {
        var delta = curdate - new Date(elements[i].innerText.replace( /(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3") )
        var status = document.getElementById("status_"+(elements[i].id).substr(5,12));
        if(delta > 300000){
            status.innerText = "Устройство не доступно"
        } else {status.innerText = "ОК"}
    }
};