/* eslint-disable react/no-children-prop */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import React, { memo, useEffect, useMemo, useState } from "react";
import { useFrappeGetDoc } from "frappe-react-sdk";

import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  DirectionsService,
  Marker,
} from "@react-google-maps/api";
import TabBar from "./TabBar";
import moment from "moment";
import Loader from "./Loader";
import { AddIcon, AtSignIcon } from "@chakra-ui/icons";

const containerStyle = {
  width: "100%",
  height: "100vh", // Adjust for the bottom tab bar
};

const GoogleMapView = ({ currentLocation, selectedAddress, apiKey }) => {
  const [response, setResponse] = useState();
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const originObj = useFrappeGetDoc("Address", currentLocation.driver_address);

  const onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
    setMap(map);
  };

  const directionsCallback = useMemo(
    () => (result, status) => {
      if (result !== null) {
        if (status === "OK") {
          setResponse(result);
        } else {
          console.log("response: ", result);
        }
      }
    },
    []
  );

  const markers = [
    { lat: 24.8655364, lng: 67.0583857 },
    { lat: 24.881299, lng: 67.08367 },
    { lat: 18.559, lng: 73.7868 },
    { lat: 18.5913, lng: 73.7389 },
    { lat: 30.7678429, lng: 61.7862356 },
    { lat: 37.6271867, lng: -103.7900149 },
  ];

  const selectedDeliveryStops = selectedAddress?.delivery_stops || [];

  const waypoints = useMemo(() => {
    const stops = selectedAddress?.delivery_stops || [
      { lat: 18.6298, lng: 73.7997 },
    ];
    return stops
      .slice(0, stops.length - 1)
      .map((e) => ({ location: { lat: e.lat, lng: e.lng } }));
  }, [selectedAddress]);

  useEffect(() => {}, [waypoints, map]);

  const diffDuration = moment(
    selectedAddress.departure_time ? selectedAddress.departure_time : ""
  ).diff(
    moment(
      selectedAddress?.delivery_stops
        ? selectedAddress?.delivery_stops[0].estimated_arrival
        : ""
    )
  );
  const diffDurationFormatted = moment.duration(diffDuration).humanize();

  if (originObj.isLoading) {
    return <Loader isOpen={originObj.isLoading} />;
  }

  if (originObj.error) {
    return <p>{originObj.error}</p>;
  }

  return (
    <Box w="100%" h="100%">
      {isLoaded ? (
        <GoogleMap
          style={{ display: "flex" }}
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
          
          options={{
            mapTypeControl: false,
            streetViewControl: false
          }}
        >
          {selectedAddress && selectedAddress.delivery_stops ? (
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(6, 1fr)",
              }}
              gap={0}
              position="absolute"
              top="10"
              w="100%"
            >
              <GridItem w="100%" h={{ base: "auto", md: 10 }}></GridItem>
              <GridItem
                colSpan={{ base: 1, md: 4 }}
                w="100%"
                h="auto"
                bg="white"
                p={{ base: 2, md: 4 }} // Responsive padding
                pb={{ base: 1, md: 2 }} // Responsive padding-bottom
                borderRadius="xl"
              >
                <Grid
                  templateColumns="repeat(4, 1fr)"
                  gap={2} // Adjusted gap
                  width="100%"
                >
                  <GridItem w="100%" h="auto">
                    <Heading
                      fontSize={{ base: "xs", md: "sm" }}
                      fontFamily="'Didact Gothic', sans-serif"
                    >
                      Current Location
                    </Heading>
                    <Text color="gray.500" fontSize="xs">
                      Route I-75
                    </Text>
                  </GridItem>
                  <GridItem w="100%" h="auto">
                    <Heading
                      fontSize={{ base: "xs", md: "sm" }}
                      fontFamily="'Didact Gothic', sans-serif"
                    >
                      Last Stop
                    </Heading>
                    <Text color="gray.500" fontSize="xs">
                      {diffDurationFormatted} ago
                    </Text>
                  </GridItem>
                  <GridItem w="100%" h="auto">
                    <Heading
                      fontSize={{ base: "xs", md: "sm" }}
                      fontFamily="'Didact Gothic', sans-serif"
                    >
                      Distance
                    </Heading>
                    <Text color="gray.500" fontSize="xs">
                      {selectedAddress?.delivery_stops[0].distance}{" "}
                      {selectedAddress?.delivery_stops[0].uom}
                    </Text>
                  </GridItem>
                  <GridItem w="100%" h="auto">
                    <Heading
                      fontSize={{ base: "xs", md: "sm" }}
                      fontFamily="'Didact Gothic', sans-serif"
                    >
                      Current Speed
                    </Heading>
                    <Text color="gray.500" fontSize="xs">
                      76 mph
                    </Text>
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem w="100%" h={{ base: "auto", md: 10 }}></GridItem>
            </Grid>
          ) : (
            <></>
          )}
          {selectedDeliveryStops.map((e, i) => {
            return (
              <div key={i}>
                {i < selectedDeliveryStops.length - 1 ? (
                  originObj.isLoading ? (
                    ""
                  ) : originObj.data.address_line1 &&
                    selectedDeliveryStops[selectedDeliveryStops.length - 1] ? (
                    <DirectionsServiceWrapper
                      key={i}
                      origin={
                        originObj.isLoading ? "" : originObj.data.address_line1
                      }
                      waypoints={waypoints}
                      destination={
                        selectedDeliveryStops[selectedDeliveryStops.length - 1]
                      }
                      directionsCallback={directionsCallback}
                    />
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
              </div>
            );
          })}

          <DirectionsRenderer
            options={{
              directions: response,
              polylineOptions: {
                strokeColor: "#000000", // Custom color for the route polyline
                strokeWeight: 4, // Custom stroke weight
              },
              markerOptions: {
                label: "Text",
                icon: window.google.maps.SymbolPath,
              },
            }}
          />
        </GoogleMap>
      ) : (
        <></>
      )}
      {currentLocation.driver ? (
        <TabBar
          stops={selectedAddress?.delivery_stops}
          driver={currentLocation.driver}
          vehicle={currentLocation.vehicle}
        />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default memo(GoogleMapView);

const DirectionsServiceWrapper = React.memo(
  ({ origin, waypoints, destination, directionsCallback }) => {
    useEffect(() => {}, [destination]);

    return (
      <div>
        <DirectionsService
          options={{
            origin: origin || "",
            waypoints: waypoints,
            destination: { lat: destination.lat, lng: destination.lng },
            travelMode: "DRIVING",
          }}
          callback={directionsCallback}
        />
        <Marker
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            path: "M 16 0 L 20 8 L 8 8 Z",
            strokeOpacity: 1,
            strokeWeight: 2,
            fillColor: "#ff0000",
          }}
          style={{
            width: "200px"
          }}
          label={{
            className: "marker-lable",
            text: destination.customer_address, // Replace with your desired label text
            color: "white", // Label text color
          }}
        />
      </div>
    );
  }
);
