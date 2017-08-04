/**
 * Created by MAKS on 04.08.2017.
 */
window.onload = function () {
// Создает экземпляр карты и привязывает его к созданному контейнеру
    var map = new YMaps.Map(document.getElementById("YMapsID"));
    // Устанавливает начальные параметры отображения карты: центр карты и коэффициент масштабирования
    map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 10);
    map.enableScrollZoom()
    /*var placemark = new YMaps.Placemark(new YMaps.GeoPoint(document.getElementById('lng').value,document.getElementById('ltd').value));
    map.addOverlay(placemark);*/
};