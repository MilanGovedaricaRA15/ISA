import { Component, Input, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { HttpClient } from '@angular/common/http';
import Projection from 'ol/proj/Projection';
import {fromLonLat} from 'ol/proj'
import Vector from 'ol/layer/Vector';
import {Icon,Style} from 'ol/style';
import Vector2 from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private http: HttpClient){}
  map: Map;
  @Input() address: String;
  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.address != null){
      this.http.get('http://api.positionstack.com/v1/forward?access_key=9ec1f2ec9ed8d162d6df85299b1e4131&query='+ this.address+', Novi Sad, Serbia'+'&limit=1').subscribe(ret => {
          let podaci = JSON.parse(JSON.stringify(ret));
          let center = podaci['data'];
          let point = podaci['data'];
          const markerSource = new Vector2();

          var markerStyle = new Style({
            image: new Icon({
              anchor: [0.5, 46],
              anchorXUnits: 'fraction',
              anchorYUnits: 'pixels',
              opacity: 0.75,
              src: "../../assets/icon/icon.png"
            }
            )
          });
          this.map = new Map({
            target: 'ol-map',
            layers: [
              new TileLayer({
                source: new OSM(),
              }),
              new Vector({
                source: markerSource,
                style: markerStyle,
              }),
            ],
            view: new View({
              center: fromLonLat([center[0]['longitude'],center[0]['latitude']]),
              zoom: 13
            })
          
          });

          var iconFeature = new Feature({
            geometry: new Point(fromLonLat([center[0]['longitude'],center[0]['latitude']]))
          });
          markerSource.addFeature(iconFeature);
    });
}
      
     
    
  }

}
