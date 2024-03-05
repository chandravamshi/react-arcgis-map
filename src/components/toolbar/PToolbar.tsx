import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  resetScale,
  setScale,
  setSketchMode,
  addToHistory,
  navigateHistoryBackward,
  navigateHistoryForward,
} from "../../store/mapSlice";

const Toolbar: React.FC = () => {
  const { sketchMode, scale, minScale, maxScale, history, currentPosition } =
    useSelector((state: RootState) => state.map);
  type ToolBarButton = {
    label: string;
    action: () => void;
    mode: string;
    disabled?: boolean;
  };

  const dispatch = useDispatch();

  // Function to handle zoom in action
  const zoomIn = () => {
    const newScale = scale / 2;
    if (newScale > maxScale) {
      // console.log('zoomin',newScale)
      dispatch(setScale(newScale));
      dispatch(addToHistory(newScale)); // Add the scale to the history array
    }
  };

  // Function to handle zoom out action
  const zoomOut = () => {
    const newScale = scale * 2;
    if (newScale < minScale) {
      console.log("zoomout", newScale);
      dispatch(setScale(newScale)); // Update the scale in Redux
      dispatch(addToHistory(newScale));
    }
  };

  // Function to handle zoom rectangle in action
  const zoomRectIn = () => {
    // console.log("inside rect zoom in");
    dispatch(setSketchMode("zoomIn")); // Set sketch mode to zoomIn
  };

  // Function to handle zoom rectangle out action
  const zoomRectOut = () => {
    dispatch(setSketchMode("zoomOut")); // Set sketch mode to zoomOut
  };

  // Function to handle pan action
  const pan = () => {
    dispatch(setSketchMode("pan"));
  };
  const goBackward = () => {
    dispatch(setScale(history[currentPosition - 1]));
    dispatch(navigateHistoryBackward());
  };
  const goForward = () => {
    dispatch(setScale(history[currentPosition + 1]));
    dispatch(navigateHistoryForward());
  };

  const info = () => {
    dispatch(setSketchMode("info")); // Set sketch mode to zoomOut
  };

  const unSelect = () => {
    dispatch(setSketchMode("unSelect")); // Set sketch mode to zoomOut
  };
  const select = () => {
    dispatch(setSketchMode("select")); // Set sketch mode to zoomOut
  };

  const buttons: ToolBarButton[] = [
    { label: "Zoom In", action: zoomIn, mode: "none" },
    { label: "Zoom Out", action: zoomOut, mode: "none" },
    { label: "Zoom Reset", action: () => dispatch(resetScale()), mode: "none" },
    { label: "Zoom Rect In", action: zoomRectIn, mode: "zoomIn" },
    { label: "Zoom Rect Out", action: zoomRectOut, mode: "zoomOut" },
    { label: "Pan", action: pan, mode: "pan" },
    {
      label: "Go Backward",
      action: goBackward,
      mode: "none",
      disabled: currentPosition === 0,
    },
    {
      label: "Go Forward",
      action: goForward,
      mode: "none",
      disabled: currentPosition === history.length - 1,
    },
    { label: "Info", action: info, mode: "info" },
    { label: "Select", action: select, mode: "select" },
    { label: "UnSelect", action: unSelect, mode: "unSelect" },
  ];

  /*  console.log("history length", history.length);
  console.log("curentpostion", currentPosition);
  console.log("history ",history);
  console.log("value",history[currentPosition]) */

  return (
    <div>
      {buttons.map((button) => (
        <button
          disabled={button.disabled}
          key={button.label}
          onClick={button.action}
          style={{
            border: sketchMode === button.mode ? "2px solid red" : "none",
          }}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
