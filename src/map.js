var geo;
var watchID;
var map;
var mapMarker;

function show_map({ lat, lon }) {
    var latlng = new google.maps.LatLng(lat, lon);
    if (map) {
        //map.panTo(latlng);
        mapMarker.setPosition(latlng);
        map.setCenter(latlng);
        console.log('UPDATE', latlng);
    } else {
        var myOptions = {
            zoom: 5,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
        //map.setTilt(0); // turns off the annoying default 45-deg view

        mapMarker = new google.maps.Marker({
            position: latlng,
            title: 'You are here.',
            map: map
        });
        console.log('SUCCESS!');
    }
}


function simulate_moving(source, destination) {
    let myLocation = source;

    return new Promise(resolve => {
        var myInterval = setInterval(
            () => {
                show_map(myLocation)
                if (parseInt(myLocation.lat) == parseInt(destination.lat)) {
                    myLocation.lat = destination.lat
                }
                else if (parseInt(myLocation.lat) < parseInt(destination.lat)) {
                    myLocation.lat = parseInt(myLocation.lat) + 1;
                }
                else {
                    myLocation.lat = parseInt(myLocation.lat) - 1;
                }


                if (parseInt(myLocation.lon) == parseInt(destination.lon)) {
                    myLocation.lon = destination.lon
                }
                else if (parseInt(myLocation.lon) < parseInt(destination.lon)) {
                    myLocation.lon = parseInt(myLocation.lon) + 1;
                }
                else {
                    myLocation.lon = parseInt(myLocation.lon) - 1;
                }

                if (myLocation.lat === destination.lat && myLocation.lon === destination.lon) {
                    clearInterval(myInterval);
                    resolve('finished')
                }

            }, 300
        )
    })



}

async function move_train(stations) {

    for (let i = 0; i < stations.length - 1; i++) {
        let myLocation = stations[i];
        await simulate_moving(myLocation, stations[i + 1])

    }

}
window.onload = () => {
    let sarajevo = {
        lat: 43.856430,
        lon: 18.413029
    }
    let copenhagen = {
        lat: 55.676098,
        lon: 12.568337
    }


    let stockholm = {
        lat: 59.334591,
        lon: 18.063240
    }
    let stations = [sarajevo, copenhagen, stockholm]

    move_train(stations)

};
