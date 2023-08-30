/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { memo } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Heading,
  Step,
  StepDescription,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import { useFrappeGetDoc } from "frappe-react-sdk";

const TabBar = ({ stops, driver, vehicle }) => {
  const driverDetails = useFrappeGetDoc("Driver", driver);
  const vehicleDetails = useFrappeGetDoc("Vehicle", vehicle);

  if (driverDetails.isLoading === true) {
    return <Text>Loading ...</Text>;
  }
  if (vehicleDetails.isLoading === true) {
    return <Text>Loading ...</Text>;
  }

  return (
    <Grid
      templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(12, 1fr)" }}
      gap={0}
      position="absolute"
      bottom="10"
      w="100%"
      maxWidth={{ base: "90%", md: "66vw" }}
      m={{ base: "20px", md: "0px" }}
    >
      <GridItem w="100%" h={{ base: "auto", md: 10 }}></GridItem>
      <GridItem
        colSpan={{ base: 1, md: 10 }}
        w="100%"
        h="auto"
        borderRadius="xl"
        p={{ base: 2, md: 4 }} // Responsive padding
        bg="white"
        borderTop="1px solid #ddd"
      >
        <Tabs
          position="relative"
          w="100%"
          maxWidth="100%" // Adjusted max width
          overflowX="auto" // Added overflow for horizontal scrolling
          variant="unstyled"
          // onChange={(index) => setSelectedTab(index)}
        >
          <TabList>
            <Tab>Order Details</Tab>
            <Tab>Driver Information</Tab>
            <Tab>Vehicle</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="teal.500"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel w="100%">
              <Stepper
                orientation="vertical"
                height="auto"
                gap="2"
                width="100%"
              >
                {stops.map((stop, index) => (
                  <Step key={index} width="100%">
                    <StepIndicator borderColor="teal !important" h={5} w={5}>
                      <StepStatus
                        incomplete={<StepNumber color="teal" fontSize="10px" />}
                        active={<StepNumber color="teal" fontSize="10px" />}
                      />
                      <StepSeparator style={{ left: 9, height: "200px" }} />
                    </StepIndicator>

                    <Box flexShrink="0" width="96%">
                      <Grid
                        templateColumns="repeat(12, 1fr)"
                        gap={6}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <GridItem colSpan={10}>
                          <StepTitle>{stop.address}</StepTitle>
                          <StepDescription>
                            {stop.estimated_arrival}
                          </StepDescription>
                        </GridItem>
                        <GridItem colSpan={2} textAlign="right">
                          <Checkbox disabled isChecked={stop.visited} />
                        </GridItem>
                      </Grid>
                    </Box>
                  </Step>
                ))}
              </Stepper>
            </TabPanel>
            <TabPanel>
              <Grid templateColumns="repeat(8, 1fr)" gap={4}>
                <GridItem colSpan={7} h="10">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar
                      name={driverDetails.data.full_name}
                      src={`https://bit.ly/${driverDetails.data.full_name}`}
                    />

                    <Box>
                      <Heading
                        size="sm"
                        fontFamily="'Didact Gothic', sans-serif"
                      >
                        {driverDetails.data.full_name}
                      </Heading>
                      <Text>{driverDetails.data.status}</Text>
                    </Box>
                  </Flex>
                </GridItem>
                <GridItem colSpan={1} h="10">
                  <Button
                    as="a"
                    href={`tel:${driverDetails.data.cell_number}`}
                    borderRadius="full"
                    leftIcon={<PhoneIcon />}
                    colorScheme="teal"
                  >
                    Call
                  </Button>
                </GridItem>
              </Grid>
              {/* Grid Row */}
              <Grid templateColumns="repeat(5, 1fr)" gap={6} mt={6}>
                <GridItemView
                  tital={"Experience"}
                  value={driverDetails.data.custom_experience}
                />
                <GridItemView
                  tital={"Driver's license"}
                  value={driverDetails.data.license_number}
                />
                <GridItemView
                  tital={"ID Number"}
                  value={driverDetails.data.custom_id_number}
                />
                <GridItemView
                  tital={"Licence Class"}
                  value={driverDetails.data.custom_licence_class}
                />
                <GridItemView
                  tital={"Insurance number"}
                  value={driverDetails.data.custom_insurance_number}
                />
              </Grid>
            </TabPanel>
            <TabPanel>
              <Grid templateColumns="repeat(5, 1fr)" gap={6} mt={6}>
                <GridItemView
                  tital={"License Plate"}
                  value={vehicleDetails.data.license_plate}
                />
                <GridItemView tital={"Make"} value={vehicleDetails.data.make} />
                <GridItemView
                  tital={"Fuel Type"}
                  value={vehicleDetails.data.fuel_type}
                />
                <GridItemView
                  tital={"Last Odometer"}
                  value={vehicleDetails.data.last_odometer}
                />
                <GridItemView tital={"UOM"} value={vehicleDetails.data.uom} />
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </GridItem>
      <GridItem w="100%" h={{ base: "auto", md: 10 }}></GridItem>
    </Grid>
  );
};

export default memo(TabBar);

function GridItemView({ tital, value }) {
  return (
    <GridItem w="100%" h="10">
      <Text color="gray.500" fontSize="xs">
        {tital}
      </Text>
      <Heading fontSize="sm" fontFamily="'Didact Gothic', sans-serif">
        {value}
      </Heading>
    </GridItem>
  );
}
