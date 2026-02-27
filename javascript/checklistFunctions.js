function MakeId(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    // Convert to positive and base36 string
    return Math.abs(hash).toString(36);
}

function LoadChecklists() {
    let result = [];
    let deferred = $.Deferred();

    $.getJSON("/checklists/index.json", function (fileList) {
        let requests = [];

        $.each(fileList, function (index, fileName) {

            let request = $.getJSON(`/checklists/${fileName}.json`, function (fileData) {
                result.push({ id: fileName, data: fileData });
            });

            requests.push(request);

        });

        $.when.apply($, requests).then(function () {
            deferred.resolve(result);
        });

    }).fail(function () {
        deferred.reject("Error loading index.json");
    });

    return deferred.promise();
}