var srv = (function () {
    var apiMainUrl = "https://a92de819c6a2.ngrok-free.app/api/Group/";

    function get_server_url() {
        return apiMainUrl;
    }
    function get(url, callback) {

        console.log(url);
        var request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                try {
                    if (request.responseText == "") {
                        return;
                    }
                    var jsonResponse = JSON.parse(request.responseText);
                    if (jsonResponse.success) {
                        if (callback) callback(jsonResponse.data);
                    }
                    else {
                        alert(jsonResponse.msg);
                    }
                } catch (error) {
                    console.error("Ошибка при разборе JSON:", error, request.responseText);
                }
            } else if (request.readyState == 4) {
                console.error("Сервер вернул ошибку:", request.status, request.statusText);
            }
        };

        // request.open('GET', url);
        request.send();
    }
    function post(url, data, callback) {
        console.log(url);
        fetch(url, {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                response.json().then(function (data) {
                    if (data) {
                        if (data.success) {
                            console.log(data.data);
                            if (callback) callback(data);
                        }
                        else {
                            alert(data.msg);
                        }

                    }
                    else {
                        alert("No data in response")
                    }
                })
            })
            .then((dt) => {
                x = dt;
            })
            .catch((err) => {
                console.log('err', err);
            });
    }
    function send(url, formData, callback) {
        var is_json = false;

        var url_full = apiMainUrl + url;

        fetch(url_full, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) { // Пытаемся определить тип ответа 
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        is_json = true;
                        return response.json();
                    } else if (contentType && contentType.includes('text/plain')) {
                        return response.text();
                    } else if (contentType && contentType.includes('image/')) {
                        return response.blob();
                    } else {
                        return response.arrayBuffer();
                    }
                } else {
                    throw new Error('Сетевая ошибка: ' + response.statusText);
                }
            }).then(data => {
                if (is_json) {
                    if (data.success) {
                        callback(data);
                    }
                    else {
                        alert(data.message);
                    }
                }
                else {
                    console.log('Тело ответа:', data); // Дополнительная обработка данных 
                }
            }).catch(error => {
                alert('Ошибка:' + apiMainUrl + url + "\n" + error);
            });

    }

    function exec(name, method, data, callback) {
        if (method == "get") {
            get(apiMainUrl + name, callback);

        }
        else if (method = "post") {
            post(apiMainUrl + name, data, callback)
        }
        else {
            alert("Unknown method :" + method);
        }
    }
//    alert(apiMainUrl);
    return {
        exec: exec,
        send: send,
    }
})(window);