import "@arcgis/core/assets/esri/themes/dark/main.css";
import { defineCustomElements as defineMapElements } from "@arcgis/map-components/dist/loader";

/**
 * Use the Map Components to define and lazy load the map element.
 */
defineMapElements();

/**
 * Use `document.querySelector()` to get a reference to the `arcgis-map` component.
 * Add an event listener for the `arcgis-map` component's `viewReady` event.
 */
document
  .querySelector("arcgis-map")
  .addEventListener("viewReady", async (event) => {
    /**
     * Get a reference to the ArcGIS Maps SDK for JavaScript `MapView`
     * from the `event.detail` object.
     */
    const view = event.detail.view;
    // Add more functionality here.
  });