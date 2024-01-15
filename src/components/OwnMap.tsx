import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { useEffect, useRef } from "react";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer.js";
function OwnMap() {
  /**
     * 
     *  const map = new Map({
    basemap: "arcgis/topographic"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.80543,34.02700],
    zoom: 13
  });

//Trailheads feature layer (points)
  const trailheadsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
  });

  map.add(trailheadsLayer);
     */

  /** 
    Basemaps.mybasemap = {
        title: 'My custom basemap',
        thumbnailUrl: 'https://js.arcgis.com/3.22/esri/images/basemap/satellite.jpg',
        //itemId: 'ulas',
        baseMapLayers: [
          { url: "https://services.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer" }
        ]
      };
  return (
    <></>
  )

  **/

  const mapDiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapDiv.current) {
     

      var mapServiceUrl = "https://le1-arcgis11-01.local/arcgis/rest/services/Samson/TKsGray/MapServer?f=json"
      //"https://192.168.100.42/arcgis/services/Samson/TKsGray/MapServer/";

      // Create a MapImageLayer using your map service URL
      var mapImageLayer = new MapImageLayer({
        url: mapServiceUrl,
      });

      // Create a map with your MapImageLayer as the basemap
      var map = new Map({
        layers: [mapImageLayer],
      });

      const view = new MapView({
        container: mapDiv.current,
        map: map,
        
      });
    }
  }, []);

  return (
    <>
      <div className="mapDiv" ref={mapDiv}></div>
    </>
  );
}

export default OwnMap;


 /**  const map = new Map({
       // basemap: "https://le1-arcgis11-01.local/arcgis/rest/services/Samson/TKsGray/MapServer" 
      });

      const view = new MapView({
        container: mapDiv.current,
        map: map,
        center: [0, 0],
        zoom: 3,
      });


      const fl = new FeatureLayer({
        url: "https://le1-arcgis11-01.local/arcgis/rest/services/Samson/TKsGray/MapServer"
      });
      map.add(fl); 
      **/