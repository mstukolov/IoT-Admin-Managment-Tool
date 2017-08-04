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
};