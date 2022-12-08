import { Component } from '@angular/core';


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent {
  display: any;
  center: google.maps.LatLngLiteral = { lat: 49.842957, lng: 24.031111 };
  zoom = 15;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };

  markerPositions: google.maps.LatLngLiteral[] = [
    { lat: 49.842957, lng: 24.031111 },
  ];

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.center = event.latLng.toJSON();
    }
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.display = event.latLng.toJSON();
    }
  }
}
