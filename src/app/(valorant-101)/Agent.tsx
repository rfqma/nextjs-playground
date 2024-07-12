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
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";

interface AgentProps {
  uuid: string;
  displayName: string;
  displayIconSmall: string;
  fullPortrait: string;
  background: string;
  description: string;
  role: {
    displayName: string;
  };
  abilities: {
    slot: string;
    displayName: string;
    description: string;
    displayIcon: string;
  }[];
}

export default function Agent(item: AgentProps) {
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
            width={50}
            alt={`${item.displayName} small icon`}
            src={item.displayIconSmall}
          />
        }
        className="flex items-center justify-between"
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
                <span className="font-normal text-xs">
                  {item.role.displayName}
                </span>
              </ModalHeader>
              <ModalBody>
                <div
                  className="flex justify-center items-center"
                  style={{
                    backgroundImage: `url(${item.background || ""})`,
                    backgroundSize: "cover",
                  }}
                >
                  <Image
                    alt={`${item.displayName} full portrait`}
                    src={item.fullPortrait}
                    width={500}
                  />
                </div>
                <p>{item.description}</p>

                {item.abilities.map((item, index) => {
                  return (
                    <>
                      <span className="font-normal text-xs text-center">
                        {item.slot}
                      </span>
                      <Popover
                        placement="bottom"
                        showArrow={true}
                        color="foreground"
                      >
                        <PopoverTrigger>
                          <Button color="primary">
                            <Image
                              width={30}
                              alt={`${item.displayName} small icon`}
                              src={item.displayIcon}
                            />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2">
                            <div className="text-small font-bold">
                              {item.displayName}
                            </div>
                            <div className="text-tiny">{item.description}</div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </>
                  );
                })}
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
