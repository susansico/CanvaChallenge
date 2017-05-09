// clientFetch.js

function fetchGetFile(path) {

    let initOptions = {method: "GET",
                       mode: "cors"};

    fetch(path, initOptions)

        .then(function(response) {

            if (response.ok) {

                // console.log(response);
                return response;
            }
            else console.log("Status Code: " + response.status);

        })

        .catch(function(error) {

            console.log("Fetch error: " + error.message);
        });
}

function fetchGetData(path) {

    let initOptions = {method: "GET",
                       mode: "cors",
                       headers: new Headers({"Content-Type": "application/json"})};

    fetch(path, initOptions)

        .then(function(response) {

            if (response.ok) {

                console.log(response);
                return response.json;

            } else console.log("Status Code: " + response.status);
        })

        .then(function(jsonResponse) {

            console.log(jsonResponse);
        })

        .catch(function(error) {

            console.log("Fetch error: " + error.message);
        });
}

function fetchPost() {

    let initOptions = {method: "POST",
                       mode: "cors",
                       headers: new Headers({"Content-Type": "application/json"})};

    fetch(path, initOptions)

        .then(function(response) {

            if (response.ok) {

                console.log(response);
                return response.json;

            } else console.log("Status Code: " + response.status);
        })

        .then(function(jsonResponse) {

            console.log(jsonResponse);
        })

        .catch(function(error) {

            console.log("Fetch error: " + error.message);
        });
}
