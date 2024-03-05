import React, { useState, useEffect, useCallback } from "react";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { Button } from "@progress/kendo-react-buttons";
//import "./CustomLayerList.css"; // Add your CSS here for styling the component

interface LayerInfo {
  layer: FeatureLayer;
  isVisible: boolean;
  opacity: number;
}

interface CustomLayerListProps {
  view: MapView;
}

const CustomLayerList: React.FC<CustomLayerListProps> = ({ view }) => {
  const [layers, setLayers] = useState<LayerInfo[]>([]);

  useEffect(() => {
    const loadLayers = async () => {
      if (view && view.map && view.map.layers) {
        const initialLayers = view.map.layers.map((layer) => ({
          layer: layer as FeatureLayer,
          isVisible: layer.visible,
          opacity: layer.opacity,
        }));
        setLayers(initialLayers.toArray());
      }
    };

    loadLayers();
    view.goTo({
      zoom: 200,
    });
  }, [view]);

  const handleVisibilityChange = useCallback(
    (layerId: string) => {
      setLayers(
        layers.map((l) => {
          if (l.layer.id === layerId) {
            const newVisibility = !l.isVisible;
            l.layer.visible = newVisibility;
            return { ...l, isVisible: newVisibility };
          }
          return l;
        })
      );
    },
    [layers]
  );

  const handleOpacityChange = useCallback(
    (layerId: string, opacity: number) => {
      setLayers(
        layers.map((l) => {
          if (l.layer.id === layerId) {
            l.layer.opacity = opacity;
            return { ...l, opacity };
          }
          return l;
        })
      );
    },
    [layers]
  );

  const handleLayerOrderChange = useCallback(
    (startIndex: number, endIndex: number) => {
      const result = Array.from(layers);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      view.map.layers.reorder(removed.layer, endIndex);
      setLayers(result);
    },
    [layers, view]
  );

  // Render layer controls
  return (
    <div className="layer-list">
      {layers.map((layer, index) => (
        <div key={layer.layer.id} className="layer-item">
          <div className="layer-title">{layer.layer.title}</div>
          <label>
            Visible
            <input
              type="checkbox"
              checked={layer.isVisible}
              onChange={() => handleVisibilityChange(layer.layer.id)}
            />
          </label>
          <label>
            Opacity
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={layer.opacity}
              onChange={(e) =>
                handleOpacityChange(layer.layer.id, parseFloat(e.target.value))
              }
            />
          </label>
          <button onClick={() => handleLayerOrderChange(index, index - 1)}>
            Move Up
          </button>
          <button onClick={() => handleLayerOrderChange(index, index + 1)}>
            Move Down
          </button>
        </div>
      ))}
    </div>
  );
};

export default CustomLayerList;
