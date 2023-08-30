/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Input,
  Flex,
  InputGroup,
  InputLeftElement,
  IconButton,
} from "@chakra-ui/react";
import Card from "./Card";
import { memo, useState } from "react";

const LeftDrawer = ({
  array,
  setAddress,
  setDistination,
  toggleLeftDrawer,
  filtertext,
  setFiltertext,
}) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
    toggleLeftDrawer();
  };

  return (
    <Flex direction="column" p={4} overflowY="auto" h="100vh">
      <Text fontSize="xl" fontWeight="bold">
        Active orders {array && array.length}
      </Text>
      <Flex mt={2}>
        <InputGroup flex={1}>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray" />
          </InputLeftElement>
          <Input
            variant="filled"
            type="text"
            placeholder="Search"
            bg="white"
            value={filtertext}
            onChange={(e) => setFiltertext(e.target.value)}
          />
        </InputGroup>
      </Flex>

      {array &&
        array.map((e, i) => {
          return (
            <Box w="100%" h="auto" key={i} mt={4}>
              {/* {isLoading ? (
              "Loading..."
            ) : ( */}
              <Card
                index={i}
                selectedCardIndex={selectedCardIndex}
                handleCardClick={handleCardClick}
                tripData={e}
                // isLoading={isLoading}
                // data={data}
                setAddress={setAddress}
                setDistination={setDistination}
              />
              {/* )} */}
            </Box>
          );
        })}
    </Flex>
  );
};

export default memo(LeftDrawer);
