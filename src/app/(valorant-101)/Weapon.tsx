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

interface WeaponProps {
  uuid: string;
  displayName: string;
  category: string;
  displayIcon: string;
  shopData: {
    cost: number;
    category: string;
    categoryText: string;
  };
}

export default function Weapon(item: WeaponProps) {
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
            alt={`${item.displayName} display icon`}
            src={item.displayIcon}
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
                  {item.shopData.categoryText}
                </span>
                <span className="font-normal text-xs">
                  {item.shopData.cost} Creds
                </span>
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-center items-center">
                  <Image
                    alt={`${item.displayName} display icon`}
                    src={item.displayIcon}
                    width={500}
                  />
                </div>
                {/* <p>{item.description}</p> */}

                {/* {item.abilities.map((item, index) => {
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
                })} */}
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
