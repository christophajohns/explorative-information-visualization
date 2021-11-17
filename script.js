async function search(requestBody, scrollID="1m") {
  response = await fetch(`https://www.memoriaal.ee/.netlify/functions/search?scroll_id=${scrollID}`, {
    "credentials": "omit",
    "headers": {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:93.0) Gecko/20100101 Firefox/93.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Sec-GPC": "1"
    },
    "referrer": "https://www.memoriaal.ee/en/search/?q=a&f=all",
    "body": JSON.stringify(requestBody),
    "method": "POST",
    "mode": "cors"
    });
    data = await response.json();
    return data
}

function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

requestBody = {"query": {"match_all": {}}}
data = await search(requestBody)
downloadObjectAsJson(data, "memorial")
