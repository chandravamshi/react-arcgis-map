 /* featureLayer
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
            setModalData(featureInfo); // Set modal data here
            setIsOpen(true); // Open the modal
          } else if (sketchMode === "select") {
            if (results.features.length > 0) {
              setSelectFeatures((prevFeatures) => [...prevFeatures, results]);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        }); */