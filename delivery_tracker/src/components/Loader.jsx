/* eslint-disable react/prop-types */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Spinner,
} from "@chakra-ui/react";

const Loader = ({ isOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered>
      <ModalOverlay />
      <ModalContent display="flex" alignItems="center" justifyContent="center">
        <ModalBody textAlign="center">
          <Spinner size="xl" />
          <p>Loading...</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Loader;
