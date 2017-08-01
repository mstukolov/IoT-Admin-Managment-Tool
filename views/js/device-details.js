/**
 * Created by MAKS on 01.08.2017.
 */
//Функция инициализации страницы. Загрузка списка устройств и инициализация карты
window.onload = function () {

    // Создает экземпляр карты и привязывает его к созданному контейнеру
    var map = new YMaps.Map(document.getElementById("YMapsID"));
    // Устанавливает начальные параметры отображения карты: центр карты и коэффициент масштабирования
    map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 10);
    map.enableScrollZoom()
    /* var myEventListener = YMaps.Events.observe(map, map.Events.Click, function (map, mEvent) {
     var placemark = new YMaps.Placemark(mEvent.getGeoPoint());
     map.addOverlay(placemark);
     }, this);*/

    //Блок кода для запроса существующих организаций для привязки в лукапе
    var organizationLookup = document.getElementById('organizationLookup');
    $(document).on("click", ".lookupOrgs", function () {
        organizationLookup.style.display = "block";
        document.getElementById("recId").innerHTML = this.id;
        $.ajax({
            type: 'GET',
            url: '/getLookupOrganizations',
            success: function (result) {

                $('#lookupOrgTable tr:not(:first)').remove();
                for (var index = 0; index < result.length; index++) {
                    var row = $('<tr id="' + result[index].id + '" class="lookup-row">' +
                        '<td><output type="text" id="orgid_' + result[index].id + '" style="font-size: larger">' + result[index].id + '</output></td>' +
                        '<td><output type="text" id="name_' + result[index].id + '" style="font-size: larger">' + result[index].organization + '</output></td>' +
                        '</tr>');
                    $("#lookupOrgTable").append(row);
                }
            }
        });

    });
    // When the user clicks on <span> (x), close the modal
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        organizationLookup.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == organizationLookup) {
            organizationLookup.style.display = "none";}
    }
    //Выбор организации по двойному клику в лукапе
    $(document).on("dblclick", ".lookup-row", function () {
       /* var _devid = (document.getElementById("recId").innerHTML).substr(13,18)
        var request = '/updateDevice?id=' + _devid + '&orgid=' + this.id;
        console.log(request)*/
        $.post('/updateDeviceOrganization',{id: (document.getElementById("recId").innerHTML).substr(13,18), orgid: this.id},
            function(data, status){
            window.location.reload(false)
            }
        );
        //organizationLookup.style.display = "none";
    });

};