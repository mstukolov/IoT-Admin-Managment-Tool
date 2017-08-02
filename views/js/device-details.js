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
    var placemark = new YMaps.Placemark(new YMaps.GeoPoint(document.getElementById('lng').value,document.getElementById('ltd').value));
    map.addOverlay(placemark);


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
        console.log('Нажата строка: ' + this.id + ', ' + document.getElementById('name_' + this.id).innerHTML)
        document.getElementById('orgid').value = this.id;
        document.getElementById('orgname').value = document.getElementById('name_' + this.id).innerHTML;
        organizationLookup.style.display = "none";
    });

    $.ajax({
        type: 'GET',
        url: '/findOrganization',
        data:{orgId: document.getElementById('orgid').value},
        success: function(result) {
            document.getElementById('orgname').value = result.organization
        }
    });

    $.ajax({
        type: 'GET',
        url: '/getDevice',
        data:{id: document.getElementById('id').value},
        success: function(result) {
            var element = document.getElementById('devtype');
            element.value = result.devtype
        }
    });


    $(document).on("click", ".checkAddress", function () {
        var url= 'https://geocode-maps.yandex.ru/1.x/?format=json&geocode=' + encodeURI(document.getElementById('address').value)
        console.log(url)
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false ); // false for synchronous request
        xmlHttp.send( null );

        if(JSON.parse(xmlHttp.responseText).response.GeoObjectCollection.featureMember[0] != undefined){
            var point = JSON.parse(xmlHttp.responseText).response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
            document.getElementById('lng').value = point.substring(0,9)
            document.getElementById('ltd').value = point.substring(10,21)
        }else{alert('Адрес не найден')}
    });

};
