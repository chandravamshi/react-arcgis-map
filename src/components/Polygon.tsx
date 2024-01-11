import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import { Polygon as ArcGISPolygon } from '@arcgis/core/geometry';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import { useEffect, useRef } from 'react';


function Polygon() {
    const mapDiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
   
    if (mapDiv.current) {
      const map = new Map({
        basemap: "arcgis/topographic" 
      });

      const view = new MapView({
        container: mapDiv.current,
        map: map,
        center: [0, 0],
        zoom: 3,
      });

      // Create a polygon graphic
      const polygon = new ArcGISPolygon({
        rings: [
            [
              [-60, 30],
              [-60, 40],
              [-70, 40],
              [-70, 30],
              [-60, 30],
            ],
          ],
        spatialReference: view.spatialReference,
      });

      const fillSymbol = new SimpleFillSymbol({
        color: [227, 139, 79, 0.8],
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
      });

      const graphic = new Graphic({
        geometry: polygon,
        symbol: fillSymbol,
      });

      // Add the graphic to the view
      view.graphics.add(graphic);

    }
  }, []);

  return (<>
    <div className="mapDiv" ref={mapDiv}></div>
    </> );
}

export default Polygon