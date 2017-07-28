/**
 * Created by MAKS on 28.07.2017.
 */
window.onload = function () {
    $("[readonly]").dblclick(function () {
        this.readOnly = false;
    });
    var onChange = function(evt) {
        var request;
        if(this.id.match('role')){
            request = '/updateRole?id=' + (this.id).substr(5,6) + '&role=' + this.value;
        }
        console.info(request);
        $.get(request, function(data, status){});
    };
    var inputs = document.getElementsByClassName('editable');
    for(var i=0;i<inputs.length;i++){
        inputs[i].addEventListener('input', onChange, false);
    }

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