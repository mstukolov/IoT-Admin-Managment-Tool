/**
 * Created by MAKS on 14.07.2017.
 */
window.onload = function () {

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

        $("[readonly]").dblclick(
            function(){
                this.readOnly = false;
            });
        $("[type=checkbox]").on("click", function(){
            if ($(this).attr("checked")==undefined) {
                $(this).attr("checked","checked");
                $.get('/updateUser?recid=' + (this.id).substr(7,8) + '&status=true', function(data, status){});
                console.info(this.id + ' was checked');
            } else {
                $(this).attr("checked",false);
                $.get('/updateUser?recid=' + (this.id).substr(7,8) + '&status=false', function(data, status){});
                console.info(this.id + ' was UNchecked');
            }
        });

        $(document).on("click", ".open-addOrgDialog", function () {
            var userId = $(this).data('id');
            $(".modal-body #userId").val( userId );
        });



        var organizationLookup = document.getElementById('organizationLookup');

        $(document).on("click", ".lookupUsers", function () {
            console.log('Нажата кнопка лукапа:' + this.id)
            organizationLookup.style.display = "block";
            document.getElementById("lineId").innerHTML = this.id;

            $.ajax({
                type: 'GET',
                url: '/getLookupOrganizations',
                success: function(result) {

                    console.log(result)

                    $('#lookupOrgTable tr:not(:first)').remove();
                    for (var index = 0; index< result.length; index++) {

                        console.log(result[index]['id'] +'::'+ result[index]['organization'])
                        var row = $('<tr id="row'+ index +'">' +
                            '<td><input type="checkbox" id="chk_' + result[index].id + '" style="width: 20px; height: 20px;"/></td>' +
                            '<td><output type="text" id="type_' + result[index].id + '" style="font-size: larger">'+ result[index].id +'</output></td>' +
                            '<td><output type="text" id="name_' + result[index].id + '" style="font-size: larger">'+ result[index].organization +'</output></td>' +
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
                    organizationLookup.style.display = "none";
                }
            }

    }
function findFunction(tableId) {
    // Declare variables
    var input, filter, table, tr, td, i;
    input = document.getElementById("findInput");
    filter = input.value.toUpperCase();
    table = document.getElementById(tableId);
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

