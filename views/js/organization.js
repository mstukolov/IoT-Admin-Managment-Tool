/**
 * Created by MAKS on 03.08.2017.
 */
window.onload = function () {
    var theTbl = document.getElementById("dataTable").getElementsByTagName("tr");
    for(var i=1;i<theTbl.length;i++)
    {
        if(theTbl[i].getElementsByTagName("td")[3].innerHTML == 'false'){
            theTbl[i].className  = 'bg-danger'
        }else{
            theTbl[i].className  = 'bg-success'
        }
    }
    var onChange = function(evt) {
        var request;
        if(this.id.match('name')){
            request = '/updateOrganization?orgId=' + (this.id).substr(5,6) + '&name=' + this.value;
        }
        if(this.id.match('parent')){
            request = '/updateOrganization?orgId=' + (this.id).substr(7,8) + '&parent=' + this.value;
        }
        if(this.id.match('qty')){
            request = '/updateOrganization?orgId=' + (this.id).substr(3,5) + '&inventQty=' + this.value;
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
}