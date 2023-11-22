/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { memo, useEffect } from "react";
import moment from "moment";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Badge,
  Text,
  Center,
  Divider,
} from "@chakra-ui/react";
import { useFrappeGetDoc } from "frappe-react-sdk";

const Card = ({
  index,
  selectedCardIndex,
  handleCardClick,
  tripData,
  setAddress,
  setDistination,
}) => {
  const { data, isLoading, error } = useFrappeGetDoc(
    "Delivery Trip",
    tripData.name
  );
  const isSelected = selectedCardIndex === index;

  useEffect(() => {}, [selectedCardIndex]);

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>Error...</p>;
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={2} // Responsive padding
      pl={2} // Responsive padding-left
      borderLeftWidth={isSelected ? "4px" : "1px"}
      borderColor={isSelected ? "teal.500" : "gray.200"}
      onClick={() => {
        handleCardClick(index);
        setAddress(tripData);
        setDistination(data);
      }}
      cursor="pointer"
      _hover={{ borderColor: "teal.300" }}
      maxW="lg"
      overflow="hidden"
      boxShadow="md"
      bg="white"
      w="100%"
    >
      <Flex flexDirection="row" justifyContent="space-between">
        <Heading size="md" fontFamily="'Didact Gothic', sans-serif">
          ID {tripData.name}
        </Heading>
        <Stack pl="8">
          <Badge colorScheme={data.status == "Scheduled" ? "orange" : "green"} textTransform="capitalize" borderRadius="3xl" pr={2} pl={2}>
            {data.status}
          </Badge>
        </Stack>
      </Flex>
      <Flex flexDirection="row" justifyContent="end">
        <Text color="gray.500" fontSize="xs">
          {tripData.custom_load}{" "}
          {data.delivery_stops[data.delivery_stops.length - 1].distance}{" "}
          {data.delivery_stops[data.delivery_stops.length - 1].uom}
        </Text>
      </Flex>
      <Flex mt={2} alignItems="center" justifyContent="center">
        <Flex flexDirection="column" w="14%">
          <Text color="gray.500" m={2} mr={0} fontSize="xs">
            {moment(tripData.departure_time).format("D MMM")}
          </Text>
          <Text color="gray.500" m={2} mt={1} mr={0} fontSize="xs">
            {moment(
              data.delivery_stops[data.delivery_stops.length - 1]
                .estimated_arrival
            ).format("D MMM")}
          </Text>
        </Flex>
        <Center
          display="flex"
          flexDirection="column"
          alignItems="center"
          mx={2}
          height="auto"
        >
          <Box w={1.5} h={1.5} bg="black" borderRadius="full" />
          <Divider
            h={6}
            borderWidth={1.5}
            borderColor="black"
            orientation="vertical"
          />
          <Box w={1.5} h={1.5} bg="black" borderRadius="full" />
        </Center>
        <Flex flexDirection="column" flexShrink={1} width="86%">
          <Text m={1} ml={0} noOfLines={1}>
            {tripData.driver_address}
          </Text>
          <Text m={1} ml={0} noOfLines={1}>
            {data.delivery_stops[data.delivery_stops.length - 1].address}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default memo(Card);
