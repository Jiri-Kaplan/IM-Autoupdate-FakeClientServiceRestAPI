appendUpdateToList = (update) => {
    let title = createTitle(update);
    let name = `Id: ${update.Id} ProductId: ${update.ProductId} Title: ${update.Title}`
    let template = `<li data-toggle="tooltip" title="${title}" class="list-group-item"> <span class="name">${name}</span> <button data-update="${update.Id}" class="btn btn-default btn-xs pull-right remove-item"> <span class="glyphicon glyphicon-remove"></span></button> </li>`
    $(template).appendTo('#updateList')
}
createTitle = (update) => {
    return `
				Id: ${update.Id}\n
				ProductId: ${update.ProductId}\n
				Title: ${update.Title}\n
				ProductName: ${update.ProductName}\n
				Icon: ${update.ProductIconUrl}\n
				InstallCmd: ${update.InstallCommand}\n
				Version: ${update.Version}\n`;
}
load = () => {
    $.get("/updates", function(data) {
        for (let i = 0; i < data.length; i++) {
            let update = data[i];
            appendUpdateToList(update);
        }
    });
}
reload = () => {
    $('#updateList').empty();
    load();
}

$(window).on('load', function() {

    $('#clearAll').on('click', (event) => {
        $.get("/editor/clearAll", function() {});
        reload();
    });
    $('#reload').on('click', (event) => {
        reload();
    });

    // LIST-ITEM EVENT HANDLERS

    $('#updateList').on('mouseenter', '.list-group-item', function(e) {
        $(this).addClass('mouseover');
    }).on('mouseleave', '.list-group-item', function(e) {
        $(this).removeClass('mouseover');
    });

    // LIST-ITEM REMOVE BUTTON EVENT HANDLERS

    $('#updateList').on('mouseenter', '.remove-item', function(e) {
        $(this).addClass('mouseover');
        $(this).parent().mouseleave();
    }).on('mouseleave', '.remove-item', function(e) {
        $(this).removeClass('mouseover');
        $(this).parent().mouseenter();
    });

    $('#updateList').on('click', '.remove-item', function(e) {
        let update = $(this).data("update");
        $.post("/editor/remove", {
            updateId: update
        });
        e.stopPropagation();
        reload();
    });

    $("#menu").load("/menu.html");
    load();
});