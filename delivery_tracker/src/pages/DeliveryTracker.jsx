/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import { useFrappeGetDoc, useFrappeGetDocList } from "frappe-react-sdk";
import LeftDrawer from "../components/LeftDrawer";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React, { memo, useState } from "react";
import Loader from "../components/Loader";
import GoogleMapView from "../components/GoogleMapView";

const DeliveryTracker = () => {
  const [selectedAddress, setSelectedAddress] = useState({});
  const [distination, setDistination] = useState({});
  const [filtertext, setFiltertext] = useState("");
  const [showLeftDrawer, setShowLeftDrawer] = useState(
    window.innerWidth <= 768 ? false : true
  );

  const googleSettigns = useFrappeGetDoc("Google Settings", "Google Settings", {
    fields: ["api_key"],
  });
  const { data, isLoading, error } = useFrappeGetDocList("Delivery Trip", {
    fields: ["*"],
    filters: [
      ["docstatus", "=", 1],
      ["status", "!=", "Completed"],
    ],
  });

  if (isLoading) {
    return <Loader isOpen={isLoading} />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>{error.exception}</AlertTitle>
        <AlertDescription>
          {error.httpStatusText} {error.httpStatus}
        </AlertDescription>
      </Alert>
    );
  }

  const toggleLeftDrawer = () => {
    if (window.innerWidth <= 768) {
      setShowLeftDrawer(!showLeftDrawer);
    }
  };
  const filterItem =
    data &&
    data.length > 0 &&
    data.filter(
      (item) =>
        item.name && item.name.toLowerCase().includes(filtertext.toLowerCase())
    );

  return (
    <Grid
      h={{ base: "auto", md: "100vh" }} // Responsive height
      templateRows={{ base: "repeat(2, 1fr)", md: "auto" }} // Adjusted template rows
      templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(12, 1fr)" }} // Adjusted template columns
      gap={0}
      overflow="auto"
    >
      <GridItem
        rowSpan={{ base: showLeftDrawer === true ? 2 : 0, md: 2 }}
        colSpan={{ base: showLeftDrawer === true ? 2 : 0, md: 4 }}
        bg="gray.200"
        display={showLeftDrawer === true ? "block" : "none"} // Control the display
      >
        <LeftDrawer
          array={filterItem}
          setAddress={setSelectedAddress}
          setDistination={setDistination}
          toggleLeftDrawer={toggleLeftDrawer}
          filtertext={filtertext}
          setFiltertext={setFiltertext}
        />
      </GridItem>
      <GridItem
        rowSpan={{ base: showLeftDrawer === true ? 0 : 2, md: 2 }}
        colSpan={{ base: showLeftDrawer === true ? 0 : 2, md: 8 }}
      >
        <GoogleMapView
          currentLocation={selectedAddress}
          selectedAddress={distination}
          apiKey={
            googleSettigns && googleSettigns.data && googleSettigns.data.api_key
          }
        />
        {!showLeftDrawer && (
          <Box
            position="absolute"
            top="10px"
            left="10px"
            zIndex={999}
            display={{ base: "block", md: "none" }} // Display only on small screens
          >
            <Button onClick={toggleLeftDrawer}>Open Drawer</Button>
          </Box>
        )}
      </GridItem>
    </Grid>
  );
};

export default memo(DeliveryTracker);
