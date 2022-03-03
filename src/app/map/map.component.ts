import { Component, AfterViewInit, OnInit } from '@angular/core';
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
// import "leaflet.animatedmarker/src/AnimatedMarker";
// import "leaflet.markercluster";
// import "assets/movingMarker";

const iconRetinaUrl = './assets/marker-icon-2x.png';
const iconUrl = './assets/marker-icon.png';
const shadowUrl = './assets/marker-shadow.png';
const iconDefault = L.icon({
iconRetinaUrl,
iconUrl,
shadowUrl,
iconSize: [25, 41],
iconAnchor: [12, 41],
popupAnchor: [1, -34],
tooltipAnchor: [16, -28],
shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;
const myIcon = L.icon({
  iconUrl: "assets/location.png",
  iconSize: [40, 40] }); 
var paths = [
  [35.62224166666667,10.737660000000002],
  [35.62224166666667,10.737660000000002],
  [35.62224166666667,10.737660000000002],
  [35.62224166666667,10.737660000000002],
  [35.62224166666667,10.737660000000002],
  [35.62224166666667,10.737660000000002],
  [35.62224166666667,10.737660000000002],
  [35.62224166666667,10.737660000000002],
  [35.62224166666667,10.737660000000002],
  [35.62224166666667,10.737660000000002],
  [35.62224166666667,10.737660000000002],
  [35.62224166666667,10.737660000000002],
  [35.62224166666667,10.737660000000002],
  [35.62220333333333,10.737630000000001],
  [35.62216166666666,10.737716666666666],
  [35.622146666666666,10.737720000000001],
  [35.622098333333334,10.737729999999999],
  [35.622036666666666,10.737728333333333],
  [35.62197666666667,10.737725000000001],
  [35.62196166666667,10.737738333333334],
  [35.621764999999996,10.737899999999998],
  [35.62054166666667,10.738064999999999],
  [35.62045833333333,10.738033333333332],
  [35.620443333333334,10.738038333333334],
  [35.62041833333333,10.738071666666666]       
];

var size = paths.length;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit,OnInit {
  map: any;
  constructor() { }
  ngOnInit(): void {
   
  }
  ngAfterViewInit(): void {
       this.createMap();
  }

    createMap(){
    
      this.map = L.map('map', {
        center: [paths[0][0],paths[0][1]],
        zoom: 13
      });
      const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 12,
        maxZoom: 17,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
  
      mainLayer.addTo(this.map);
      

    }

    track(){
      var Start_marker = L.marker([paths[0][0], paths[0][1]]).addTo(this.map).bindPopup("<b>Start</b>").openPopup();
     // marker1.bindPopup("Start").openPopup();
      var line = L.polyline(paths as [number, number][], { color: "red", weight: 6, smoothFactor: 0.5 }).addTo(this.map);
      this.map.fitBounds(line.getBounds());
      var End_marker = L.marker([paths[size-1][0], paths[size-1][1]]).addTo(this.map).bindPopup("<b>End</b>");
      var Moving_marker = L.marker([paths[0][0], paths[0][1]],{icon: myIcon}).addTo(this.map);
      var i = 0;
      var id = setInterval(function(){
          if(i < size)
          {
            Moving_marker.setLatLng(new L.LatLng(paths[i][0], paths[i][1]));
            console.log(i);
          }else{
            clearInterval(id);
          }
      i++}, 250);
    }
}
