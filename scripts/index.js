showInfo = (info) => {
    $('#alert').html(info);
    $('#alert').removeClass('hidden');
}
successHandler = function(data, status, jqXHR) {
    showInfo('OK');
}
errorHandler = function(jqXHR, status, error) {
    console.log(`Status: ${status} with error: ${error}`);
    showInfo('Something is wrong');
}
addUpdate = () => {
    try {
        let jsonData = JSON.parse($('#editor').val());
        $.ajax({
            type: "POST",
            url: "/editor/add",
            data: jsonData,
            success: successHandler,
            error: errorHandler,
        });
    } catch (e) {
        console.log(e);
        showInfo('Something is wrong');
    }
}
loadTemplate = () => {
    $.get("/editor/template", function(data) {
        let json = JSON.stringify(data, null, '\t');
        $('#editor').val(json);
    });
}
$(window).on('load', function() {
    $('#add').on('click', (event) => {
        addUpdate();
    });
    $('#reset').on('click', (event) => {
        loadTemplate();
        showInfo('Reseted');
    });

    $("#menu").load("menu.html");
    loadTemplate();
});