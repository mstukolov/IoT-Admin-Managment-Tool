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
    }
