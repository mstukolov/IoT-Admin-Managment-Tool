/**
 * Created by MAKS on 01.08.2017.
 */
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
                        '<td><output type="text" id="type_' + result[index].id + '" style="font-size: larger">' + result[index].id + '</output></td>' +
                        '<td><output type="text" id="name_' + result[index].id + '" style="font-size: larger">' + result[index].organization + '</output></td>' +
                        '</tr>');
                    $("#lookupOrgTable").append(row);
                }
            }
        });

    });