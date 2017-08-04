/**
 * Created by MAKS on 03.08.2017.
 */
window.onload = function () {
    //Блок кода для запроса существующих организаций для привязки в лукапе
    var actionLookup = document.getElementById('actionLookup');
    $(document).on("click", ".lookupActions", function () {
        actionLookup.style.display = "block";
        document.getElementById("parentid").innerHTML = this.id;
        $.ajax({
            type: 'GET',
            url: '/getActions',
            success: function(result) {

                $('#lookupActionTable tr:not(:first)').remove();
                for (var index = 0; index< result.length; index++) {
                    var row = $('<tr id="'+ result[index].id +'" class="lookup-row">' +
                        '<td><output type="text" id="id_' + result[index].id + '" style="font-size: larger">'+ result[index].id +'</output></td>' +
                        '<td><output type="text" id="action_' + result[index].id + '" style="font-size: larger">'+ result[index].action +'</output></td>' +
                        '<td><output type="text" id="object_' + result[index].id + '" style="font-size: larger">'+ result[index].object +'</output></td>' +
                        '</tr>');
                    $("#lookupActionTable").append(row);
                }
            }
        });

    });
    $(document).on("dblclick", ".lookup-row", function () {
        $.ajax({
            type: 'GET',
            url: '/saveActionRoles',
            data:{roleid: document.getElementById("parentid").innerHTML, actionid: this.id},
            success: function(result) {
                window.location.href = "/role-details?roleid=" + document.getElementById("parentid").innerHTML;
            }
        });
        actionLookup.style.display = "none";
    });
}