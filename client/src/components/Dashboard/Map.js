import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default class Map extends React.Component {
  state = {
    data: [
      {
        name: 'Jash Mehta',
        id: '60004180037',
        Lat: 19.2063,
        Long: 72.8416,
      },
      {
        name: 'Jash Mehta',
        id: '60004180037',
        Lat: 19.2063,
        Long: 72.8416,
      },
    ],
  };

  fetchData() {
    const word = 'Token ';
    const token = word.concat(`${localStorage.getItem('Token')}`);
    let formData = new FormData();
    formData.append('Authorization', `${token}`);

    fetch(`http://127.0.0.1:8000/Operations/GetCoordinates`, {
      method: 'POST',
      headers: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          data: data,
        });
      })
      .then(() => {
        const sp1 = L.circle(
          [
            this.state.data.Coordinates[0].Lat,
            this.state.data.Coordinates[0].Long,
          ],
          {
            color: 'red',
            fillColor: 'red',
            fillOpacity: 3,
            radius: 50,
          }
        ).addTo(this.map);
        sp1.bindPopup(
          `<b>${this.state.data.Coordinates[0].name}</b><br>${this.state.data.Coordinates[0].id}`
        );
        const sp2 = L.circle(
          [
            this.state.data.Coordinates[1].Lat,
            this.state.data.Coordinates[1].Long,
          ],
          {
            color: 'purple',
            fillColor: 'purple',
            fillOpacity: 3,
            radius: 50,
          }
        ).addTo(this.map);
        sp2.bindPopup(
          `<b>${this.state.data.Coordinates[1].name}</b><br>${this.state.data.Coordinates[1].id}`
        );
      })
      .catch((err) => console.log);
  }

  refreshAfter1sec = () => {
    setInterval(() => {
      this.fetchData();
    }, 1000);
  };

  componentDidMount() {
    this.refreshAfter1sec();
    this.showMap();
    console.log(this.state.data);
  }

  showMap() {
    this.map = L.map('map', {
      center: [19.2029, 72.8518],
      zoom: 14,
    });

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 19,
        tileSize: 512,
        zoomOffset: -1,
        id: 'mapbox/streets-v11',
        accessToken:
          'pk.eyJ1IjoiamFzaG1laHRhMzMwMCIsImEiOiJjazh3bTBqancwYnRjM2ZvMGhtcW5ubWQzIn0.HCTjDyekVW2_d8bpb-wVZA',
      }
    ).addTo(this.map);
  }

  render() {
    return (
      <div
        style={{
          width: '1070px',
          height: '600px',
          marginTop: '110px',
          marginLeft: '110px',
        }}
        id="map"
      />
    );
  }
}
