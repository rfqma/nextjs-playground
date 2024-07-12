"use client";

import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

interface MapProps {
  uuid: string;
  displayName: string;
  tacticalDescription: string;
  coordinates: string;
  listViewIcon: string;
  displayIcon: string;
}

export default function Map(item: MapProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleModalOpen = () => {
    onOpen();
  };

  return (
    <>
      <Button
        fullWidth
        size="lg"
        startContent={
          <Image
            width={200}
            alt={`${item.displayName} small icon`}
            src={item.listViewIcon}
          />
        }
        className="flex items-center justify-between p-2"
        onPress={handleModalOpen}
      >
        {item.displayName}
      </Button>
      <Modal
        size={"2xl"}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {item.displayName}
                <span className="font-normal text-xs">{item.coordinates}</span>
                <span className="font-normal text-xs">
                  {item.tacticalDescription}
                </span>
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-center items-center">
                  {item.displayIcon ? (
                    <Image
                      alt={`${item.displayName} full portrait`}
                      src={item.displayIcon}
                      width={500}
                    />
                  ) : (
                    <span>no image</span>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
