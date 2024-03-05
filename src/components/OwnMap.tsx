import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { useEffect, useRef, useState } from "react";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import CustomLayerList from "./LayersInfo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import PToolbar from "./toolbar/PToolbar";
import Sketch from "@arcgis/core/widgets/Sketch";
import { setMaxScale, setMinScale, setSketchMode } from "../store/mapSlice";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Draw from "@arcgis/core/views/draw/Draw";
import Modal from "./toolbar/InfoModal";
import Graphic from "@arcgis/core/Graphic";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";

function OwnMap() {
  const mapDiv = useRef<HTMLDivElement | null>(null);
  const [view, setView] = useState<MapView | null>(null);
  const { scale, sketchMode } = useSelector((state: RootState) => state.map);
  const dispatch = useDispatch();
  const [sketchViewModel, setSketchViewModel] = useState<Sketch>();
  const [draw, setDraw] = useState<Draw>();
  const [featureLayer, setFeatureLayer] = useState<FeatureLayer>();
  const [graphicsLayer] = useState<GraphicsLayer>(new GraphicsLayer());
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<any[]>([]);
  const [selectFeatures, setSelectFeatures] = useState<any[]>([]);

  // Function to activate rectangle zoom mode
  console.log("sketchMode----------------", sketchMode);
  const activateRectangleZoom = () => {
    if (sketchViewModel) {
      sketchViewModel.create("rectangle");
    }
  };
  const deactivateZoom = () => {
    if (sketchViewModel) {
      sketchViewModel.cancel();
    }
  };

  const queryFeatures = (vertices: any) => {
    if (featureLayer && view) {
      featureLayer
        .queryFeatures({
          geometry: vertices,
          where: "FILTER_SAI_ID = 9701",
          returnGeometry: true,
          spatialRelationship: "intersects",
          outFields: ["*"],
        })
        .then(function (results) {
          // Display the information of the selected features in a list view
          const features = results.features;
          const featureInfo = features.map((feature) => feature.attributes);
          // Display the feature information in a popup or another UI element
          highlightSelectedFeatures(results);
          // Assuming you want to open the modal when features are fetched
          if (sketchMode === "info") {
            highlightSelectedFeatures(results);
            setModalData(featureInfo); // Set modal data here
            setIsOpen(true); // Open the modal
          }
          /* else if (sketchMode === "select") {
            if (results.features.length > 0) {
              setSelectFeatures((prevFeatures) => [...prevFeatures, results]);
            }
          } */
        })
        .catch((error) => {
          console.log(error);
        });
      /*  // Construct the query based on the control key status
      const query = {
        geometry: vertices,
        where: "FILTER_SAI_ID = 9701",
        returnGeometry: true,
        spatialRelationship: "intersects",
        outFields: ["*"],
      };

      // If control key is pressed, query all features intersecting the geometry
      if (ctrlPressed) {
        featureLayer
          .queryFeatures({
            geometry: vertices,
            where: "FILTER_SAI_ID = 9701",
            returnGeometry: true,
            spatialRelationship: "intersects",
            outFields: ["*"],
          })
          .then((results) => {
            setIsOpen(false);
            if (results.features.length > 0) {
              //setSelectFeatures((prevFeatures) => [...prevFeatures, results]);
              // Highlight the selected features
              highlightSelectedFeatures(selectFeatures);
            }
          });
      } else {
        // Otherwise, query only the features within the geometry
        featureLayer
          .queryFeatures({
            geometry: vertices,
            where: "FILTER_SAI_ID = 9701",
            returnGeometry: true,
            spatialRelationship: "intersects",
            outFields: ["*"],
          })
          .then((results) => {
            if (results.features.length > 0) {
              const features = results.features;
              const featureInfo = features.map((feature) => feature.attributes);
              highlightSelectedFeatures(results);
              // Display the information of the selected features in a modal if in "info" mode
              console.log("modemode", sketchMode);
              if (sketchMode == "info") {
                console.log('---------------info')
                setModalData(featureInfo); // Set modal data here
                setIsOpen(true); // Open the modal
              }
            }
          });
      } */
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  console.log(selectFeatures);

  // Function to activate pan mode
  const activatePanMode = () => {
    dispatch(setSketchMode("pan"));
  };

  // Add state to keep track of the control key
  const [ctrlPressed, setCtrlPressed] = useState(false);

  // Function to handle key down event
  const handleKeyDown = (event: any) => {
    if (event.key === "Control") {
      setCtrlPressed(true);
    }
  };

  // Function to handle key up event
  const handleKeyUp = (event: any) => {
    if (event.key === "Control") {
      setCtrlPressed(false);
      highlightSelectedFeatures(selectFeatures);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (mapDiv.current) {
      var mapServiceUrl =
        "http://le1-arcgis11-01.local/arcgis/rest/services/Samson/TKsGray/MapServer";
      //"https://192.168.100.42/arcgis/services/Samson/TKsGray/MapServer/";

      // Create a MapImageLayer using map service URL
      var mapImageLayer = new MapImageLayer({
        url: mapServiceUrl,
      });

      const trailheadsLayer = new FeatureLayer({
        url: "http://le1-arcgis11-01.local/arcgis/rest/services/Samson/MP_MS/MapServer/1", // (9701,12619,12620,12622)
        editingEnabled: true,
        outFields: ["*"],
        id: "states",
      });

      // Create a map with MapImageLayer as the basemap
      var map = new Map({
        layers: [mapImageLayer],
      });

      map.add(trailheadsLayer);

      setFeatureLayer(trailheadsLayer);
      const initializedView = new MapView({
        container: mapDiv.current,
        map: map,
        scale: scale,
        // extent: new Extent({ xmin: envelope.xmin, ymin: envelope.ymin, xmax: envelope.xmax, ymax: envelope.ymax,  })
        //center: [-118.80500, 34.02700],    center: [15, 65],
      });

      // Set view state after the view is initialized
      setView(initializedView);

      initializedView.when(() => {
        dispatch(setMinScale(mapImageLayer.minScale));
        dispatch(setMaxScale(mapImageLayer.maxScale));

        const sketchVM = new Sketch({
          view: initializedView,
          layer: graphicsLayer,
        });

        setSketchViewModel(sketchVM);
        setDraw(draw);
      });
    }

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []);

  // Define a function to highlight selected features
  const highlightSelectedFeatures = (selectedFeatures: any) => {
    // Clear previous selection
    if (view) {
      view.graphics.removeAll();
    }

    // Define symbol for highlighting selected features C:\Users\CVD\react-arcgis\src\components
    const selectionSymbol = new SimpleFillSymbol({
      color: [0, 255, 255, 0.5], // Adjust color and transparency as needed
      outline: new SimpleLineSymbol({
        color: [0, 255, 255],
        width: 2,
      }),
    });

    // Iterate through selected features and add graphics to the view
    selectedFeatures.features.forEach((feature: any) => {
      const graphic = new Graphic({
        geometry: feature.geometry,
        symbol: selectionSymbol,
      });
      if (view) {
        view.graphics.add(graphic);
      }
    });
  };

  useEffect(() => {
    console.log("sketchMode", sketchMode);
    //setSelectFeatures([]);
    if (
      sketchMode == "zoomIn" ||
      sketchMode == "zoomOut" ||
      sketchMode == "info"
    ) {
      activateRectangleZoom();
      listenToCreatSketchViewModel();
    } else if (sketchMode == "select") {
      setSelectFeatures([]);
      activateRectangleZoom();
      listenToCreatSketchViewModel();
    } else if (sketchMode == "unSelect") {
      if (view) {
        view.graphics.removeAll();
      }
      deactivateZoom();
      setSelectFeatures([]);
    } else {
      deactivateZoom();
      activatePanMode();
    }
  }, [sketchMode]);

  useEffect(() => {
    if (view) {
      view
        .goTo({
          scale: scale,
          // duration: 500,
        })
        .catch((error) => console.error(error));
    }
  }, [scale]);

  /*   useEffect(() => {
    if (view) {
      queryFeatures(selectFeatures);
    }
  }, []); */

  const listenToCreatSketchViewModel = () => {
    if (sketchViewModel && view) {
      sketchViewModel.on("create", (event) => {
        if (event.state === "complete") {
          // Perform zoom here based on the geometry
          console.log("sketchMode ", sketchViewModel);
          // Perform zoom based on the current state
          if (sketchMode == "zoomOut") {
            // Zoom in
            view.goTo({
              target: event.graphic.geometry,
              scale: view.scale * 1.5, // Adjust the zoom factor as needed
            });
          } else if (sketchMode == "zoomIn") {
            // Zoom out
            view.goTo({
              target: event.graphic.geometry,
              scale: view.scale / 1.5, // Adjust the zoom factor as needed
            });
          } else if (sketchMode == "select") {
            console.log("inside select ctrlPressedctrlPressedctrlPressed",ctrlPressed);
            // If control key is pressed, add the selected feature to the list
            if (ctrlPressed) {
              console.log("inside contorl fpressedselect");

              if (featureLayer && view) {
                featureLayer
                  .queryFeatures({
                    geometry: event.graphic.geometry,
                    where: "FILTER_SAI_ID = 9701",
                    returnGeometry: true,
                    spatialRelationship: "intersects",
                    outFields: ["*"],
                  })
                  .then(function (results) {
                    setSelectFeatures((prevFeatures) => [
                      ...prevFeatures,
                      results,
                    ]);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            } else {
              // Otherwise, clear the previous selection and select only the current feature
              console.log("inside contorl not pressed");
              setSelectFeatures([]);
              queryFeatures(event.graphic.geometry);
            }

            //queryFeatures(event.graphic.geometry);
          } else if (sketchMode == "info") {
            queryFeatures(event.graphic.geometry);
          }
          graphicsLayer.remove(event.graphic);
        }
      });
    }
  };

  return (
    <>
      <div>
        {modalData.length > 0 && (
          <Modal isOpen={isOpen} data={modalData} closeModal={closeModal} />
        )}
      </div>

      {view && (
        <>
          <PToolbar />
          {/* <button onClick={activateRectangleZoom}>Rectangle Zoom In</button> */}
        </>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          width: "100%",
        }}
      >
        {view && (
          <div style={{ width: "fit-content", height: "100%" }}>
            <CustomLayerList view={view} />
          </div>
        )}
        <div className="mapDiv" ref={mapDiv}></div>
      </div>
    </>
  );
}

export default OwnMap;
