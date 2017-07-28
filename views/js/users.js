/**
 * Created by MAKS on 14.07.2017.
 */
window.onload = function () {

        $("[readonly]").dblclick(function(){this.readOnly = false;});

        var onChange = function(evt) {
            var request;
            if(this.id.match('name')){
                request = '/updateUser?recid=' + (this.id).substr(5,6) + '&user=' + this.value;
            }
            if(this.id.match('passw')){
                request = '/updateUser?recid=' + (this.id).substr(6,7) + '&password=' + this.value;
            }
            console.info(request);
            $.get(request, function(data, status){});
        };
        var inputs = document.getElementsByClassName('editable');
        for(var i=0;i<inputs.length;i++){
            inputs[i].addEventListener('input', onChange, false);
        }

        //Функция обновления поля статус в таблице ползователи
        $("[type=checkbox]").on("click", function(){
            if ($(this).attr("checked")==undefined) {
                $(this).attr("checked","checked");
                $.get('/updateUser?recid=' + (this.id).substr(7,8) + '&status=true', function(data, status){});
            } else {
                $(this).attr("checked",false);
                $.get('/updateUser?recid=' + (this.id).substr(7,8) + '&status=false', function(data, status){});
            }
        });
        //Функция открытия диалогового окна для привзяки организации к пользователю
        $(document).on("click", ".open-addOrgDialog", function () {
            var userId = $(this).data('id');
            $(".modal-body #userId").val( userId );
        });

        //Блок кода для запроса существующих организаций для привязки в лукапе
        var organizationLookup = document.getElementById('organizationLookup');
        $(document).on("click", ".lookupOrgs", function () {
            organizationLookup.style.display = "block";
            document.getElementById("recId").innerHTML = this.id;
            $.ajax({
                type: 'GET',
                url: '/getLookupOrganizations',
                success: function(result) {

                    $('#lookupOrgTable tr:not(:first)').remove();
                    for (var index = 0; index< result.length; index++) {
                        var row = $('<tr id="'+ result[index].id +'" class="lookup-row">' +
                            '<td><output type="text" id="type_' + result[index].id + '" style="font-size: larger">'+ result[index].id +'</output></td>' +
                            '<td><output type="text" id="name_' + result[index].id + '" style="font-size: larger">'+ result[index].organization +'</output></td>' +
                            '</tr>');
                        $("#lookupOrgTable").append(row);
                    }
                }
            });

        });
    //Блок кода для запроса существующих ролей для привязки в лукапе
    var rolesLookup = document.getElementById('rolesLookup');
    $(document).on("click", ".lookupRoles", function () {
        rolesLookup.style.display = "block";
        document.getElementById("recId").innerHTML = this.id;
        $.ajax({
         type: 'GET',
         url: '/getRoles',
         success: function(result) {

             $('#lookupRolesTable tr:not(:first)').remove();
                 for (var index = 0; index< result.length; index++) {
                     var row = $('<tr id="'+ result[index].id +'" class="lookup-row">' +
                     '<td><output type="text" id="type_' + result[index].id + '" style="font-size: larger">'+ result[index].id +'</output></td>' +
                     '<td><output type="text" id="name_' + result[index].id + '" style="font-size: larger">'+ result[index].role +'</output></td>' +
                     '</tr>');
                     $("#lookupRolesTable").append(row);
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

    }



