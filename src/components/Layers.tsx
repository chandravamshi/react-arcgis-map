import React, { useState, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

interface LayerInfo {
  layer: FeatureLayer;
  isVisible: boolean;
}

interface CustomLayerListProps {
  view: MapView;
}

const Layers: React.FC<CustomLayerListProps> = ({ view }) => {
  const [layers, setLayers] = useState<LayerInfo[]>([]);

  useEffect(() => {
    if (view && view.map && view.map.layers) {
      const initialLayers = view.map.layers.map(layer => ({
        layer: layer as FeatureLayer,
        isVisible: layer.visible
      }));
      setLayers(initialLayers.toArray());
    }
  }, [view]);

  const toggleLayerVisibility = (layerId: string) => {
    setLayers(layers.map(l => {
      if (l.layer.id === layerId) {
        const newVisibility = !l.isVisible;
        l.layer.visible = newVisibility;
        return { ...l, isVisible: newVisibility };
      }
      return l;
    }));
  };

  return (
    <div>
      {layers.map(l => (
        <div key={l.layer.id}>
          <label>
            <input
              type="checkbox"
              checked={l.isVisible}
              onChange={() => toggleLayerVisibility(l.layer.id)}
            />
            {l.layer.title}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Layers;
