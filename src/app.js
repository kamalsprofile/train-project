import Data from "./data.json";


var geo;
var watchID;
var map;
var mapMarker;
var iconBase = '../public/img/icons8-train-40.png';
console.log(Data);


function show_map(obj, { lat, lon }) {
    var latlng = new google.maps.LatLng(lat, lon);
    if (obj.mapMarker) {
        //map.panTo(latlng);
        obj.mapMarker.setPosition(latlng);
        map.setCenter(latlng);
        console.log('UPDATE', latlng);
    } else {
        var myOptions = {
            zoom: 5,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        if (!map) {
            map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
        }

        //map.setTilt(0); // turns off the annoying default 45-deg view

        if (!obj.mapMarker) {
            obj.mapMarker = new google.maps.Marker({
                position: latlng,
                title: 'You are here.',
                map: map,
                animation: google.maps.Animation.DROP,
                icon: iconBase
            });
            obj.mapMarker.addListener('click', toggleBounce);
        }
        console.log('SUCCESS!');
    }
}
function toggleBounce() {
    if (mapMarker.getAnimation() !== null) {
        mapMarker.setAnimation(null);
    } else {
        mapMarker.setAnimation(google.maps.Animation.BOUNCE);
    }
}


function simulate_moving(obj, source, destination) {
    let myLocation = source;

    return new Promise(resolve => {
        var myInterval = setInterval(
            () => {
                if (obj.trainStopped) {
                    return;
                }
                show_map(obj, myLocation);

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
                    resolve('finished');
                    var date = new Date();
                    document.getElementById(destination.id + "-time").innerText = ":" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
                }

            }, 1000
        )
    })



}


/*async function move_train(stations) {

    for (let i = 0; i < stations.length - 1; i++) {
        let myLocation = stations[i];
        await simulate_moving(myLocation, stations[i + 1])

    }

} */
async function move_train(obj, stations) {

    for (let i = 0; i < stations.length - 1; i++) {
        let myLocation = stations[i];

        await simulate_moving(obj, myLocation, stations[i + 1]);


    }

}




var getMap = function () {
    console.log("hello")
}
const displayTrain = (train) => {
    console.log(train)
    if (train) {
        return ` <div class="col col-4 trains" id="train-${train.id}" >
<h1>${train.name}</h1>
<div class="row">
${train.stations.map((station) => {
                return (`<div class="col col-12 stations">${station.name} <span id='${station.id}-time'></span></div>`)
            }).join("")}
    
</div>
</div>`;
    }


}


const root = document.querySelector("#content");
Data.forEach(element => {
    console.log(element)
    root.insertAdjacentHTML("beforeend", displayTrain(element));
    const btn = document.createElement("button");
    const stopbtn = document.createElement("button");;
    stopbtn.innerHTML = "Stop train";
    stopbtn.setAttribute("class", `btn btn-green stop-btn`)
    stopbtn.addEventListener("click", function () {
        element.trainStopped = true
    })
    document.querySelector(`#train-${element.id}`).appendChild(stopbtn);
    btn.innerHTML = "Move train";
    btn.setAttribute("id", `train-${element.id}`)
    btn.setAttribute("class", `btn btn-green see-map`)
    document.querySelector(`#train-${element.id}`).appendChild(btn);

    btn.addEventListener("click", function () {

        // const canvas = document.createElement("div");
        // canvas.setAttribute("id", "map-canvas");

        console.log(element.stations)
        move_train(element, element.stations);
        console.log(element.id)
    })
})

window.move_all_trains = function () {
    Data.forEach(element => {
        move_train(element, element.stations)
    })
}