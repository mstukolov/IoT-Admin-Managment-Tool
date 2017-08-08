/**
 * Created by MAKS on 04.08.2017.
 */
window.onload = function () {
    $.ajax({
        type: 'GET',
        url: '/findOrganization',
        data: {orgId: document.getElementById('orgId').value},
        success: function(result) {
            var element = document.getElementById('active');
            element.value = result.active
        }
    });

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
    //Выбор организации по двойному клику в лукапе
    $(document).on("dblclick", ".lookup-row", function () {
        console.log('Нажата строка: ' + this.id + ', ' + document.getElementById('name_' + this.id).innerHTML)
        document.getElementById('parent_id').value = this.id;
        document.getElementById('parent_name').value = document.getElementById('name_' + this.id).innerHTML;
        organizationLookup.style.display = "none";
    });

    $.ajax({
        type: 'GET',
        url: '/findOrganization',
        data:{orgId: document.getElementById('orgId').value},
        success: function(result) {
            document.getElementById('parent_name').value = result.parentorg.organization
        }
    });
};