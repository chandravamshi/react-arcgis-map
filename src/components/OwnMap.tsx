import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { useEffect, useRef } from "react";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LayerList from "@arcgis/core/widgets/LayerList";
function OwnMap() {


  const mapDiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapDiv.current) {
     

      var mapServiceUrl = "https://le1-arcgis11-01.local/arcgis/rest/services/Samson/TKsGray/MapServer"
      //"https://192.168.100.42/arcgis/services/Samson/TKsGray/MapServer/";  

      // Create a MapImageLayer using your map service URL
      var mapImageLayer = new MapImageLayer({
        url: mapServiceUrl,
      });

      // Create a map with your MapImageLayer as the basemap 
      var map = new Map({
        layers: [mapImageLayer],
      });

      const trailheadsLayer = new FeatureLayer({
        url:  "https://le1-arcgis11-01.local/arcgis/rest/services/Samson/MP_MS/MapServer/1", // (9701,12619,12620,12622)
        editingEnabled:true
        //:9701
      });
    
      map.add(trailheadsLayer);
      

      const view = new MapView({
        container: mapDiv.current,
        map: map,
        
      });

      let layerList = new LayerList({
        view: view
      });
      view.ui.add(layerList, {
        position: "top-left"
      });
    }
  }, []);

  return  <div className="mapDiv" ref={mapDiv}></div>
    
  
}

export default OwnMap;