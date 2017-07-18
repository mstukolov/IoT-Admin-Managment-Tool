/**
 * Created by MAKS on 18.07.2017.
 */
function findTableRows(tableId, inputTextId) {
    // Declare variables
    var input, filter, table, tr, td, i;
    input = document.getElementById(inputTextId);
    filter = input.value.toUpperCase();
    table = document.getElementById(tableId);
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
$(document).on("dblclick", ".lookup-row", function () {

    saveReference(this.parentNode.parentNode.id, (document.getElementById("recId").innerHTML).substr(10,11) , this.id)
        //organizationLookup.style.display = "none";

});

function saveReference(_lookup, _recId, _refRecId) {
    var request;
    if(_lookup == 'lookupOrgTable'){
        request = '/updateUser?recid=' + _recId + '&orgid=' + _refRecId;
    }
    console.info(request);
    $.get(request, function(data, status){
        window.location.reload(false)

    });
}

