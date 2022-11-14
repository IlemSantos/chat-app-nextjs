import { useState } from "react";
import { Avatar, Button, Center, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import axios from "axios";
import { api } from "../../services/api";

export default function PhotoEdit({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleUpload = async () => {
    setUploading(true)
    try {
      if (!selectedFile) return
      const formData = new FormData()
      formData.append("myImage", selectedFile)
      const { data } = await axios.post("/api/image", formData)

      const res = await api.post("/auth/user", {
        image: "/images/" + data.myImage.newFilename,
      })

      if (res.data) {
        toast({
          title: "Save PhotoEdit",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }

      onClose()
    } catch (error: any) {
      console.log(error.response?.data)
    }
    setUploading(false)
  }

  return (
    <VStack minW="xs" height="full">
      <Flex as="nav">
        <Avatar size="xl" name={user?.name} src={user?.image} onClick={onOpen}>
        </Avatar>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <label>
                <input type="file"
                  hidden
                  onChange={({ target }) => {
                    if (target.files) {
                      const file = target.files[0];
                      setSelectedImage(URL.createObjectURL(file));
                      setSelectedFile(file);
                    }
                  }}
                />
                <Flex p={6} minW="xs" minH="xs" justifyContent="center" alignItems="center" borderStyle="dotted" borderWidth={1} borderRadius={1} borderColor='red'>
                  {selectedImage ? (
                    <img src={selectedImage} alt="" />
                  ) : (
                    <span>Select Image</span>
                  )}
                </Flex>
              </label>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}
              onClick={handleUpload}
              disabled={uploading}
              style={{ opacity: uploading ? ".5" : "1" }}
            >
              {uploading ? "Uploading..." : "Upload Photo"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  )
}