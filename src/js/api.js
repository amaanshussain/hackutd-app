
const BASEURL = "http://146.148.46.102/"

export async function ImportData(sensor, weather, leaks) {
    var formdata = new FormData();
    formdata.append("sensor", sensor)
    formdata.append("weather", weather)
    formdata.append("leaks", leaks)

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    return await fetch(BASEURL + "/load", requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

export async function LeakStatus() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return await fetch(BASEURL + "/leaks_status", requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

export async function PredictLeaks() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return await fetch(BASEURL + "/predict_leaks", requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}