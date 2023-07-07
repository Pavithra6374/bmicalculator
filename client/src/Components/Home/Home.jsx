import {
  Box,
  Stack,
  InputGroup,
  Input,
  InputLeftElement,
  
  Icon,
  Container,
  Heading,
  Highlight,
  Button,
  
  
  
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  
  
  Card,
  
  CardBody,
  CardFooter,
  SimpleGrid,
  Text,
  
  
  
  
  useToast,
  FormControl,
  
  HStack,
  Image,
  Center,
} from "@chakra-ui/react";

// import image1 from '../../assets/Normal weight.png'
// import image2 from '../../assets/Obese.png'
// import image3 from '../../assets/Overweight.png'
// import image4 from '../../assets/Underweight.png'


import { React, useState } from "react";
import { BiUser, BiCategoryAlt } from "react-icons/bi";
import { TbArrowAutofitHeight } from "react-icons/tb";


import { HiOutlinePhone } from "react-icons/hi";



import { GiWeight } from "react-icons/gi";

function PostCreate() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bmi, setBMI] = useState("");
  const [category, setCategory] = useState("");
  const {
    isOpen: isChooseOpen,
    onOpen: ChooseOpen,
    onClose: ChooseOnClose,
  } = useDisclosure();

  // const { isOpen, onOpen, onClose } = useDisclosure();
  const toasterr = useToast();
  

  function handleError(errorMessage) {
    toasterr({
      title: "Error",
      description: errorMessage.toString(),
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  function handleSuccess(Message) {
    toasterr({
      title: "",
      description: Message,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  const getBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) {
      return "Underweight";
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      return "Normal weight";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      return "Overweight";
    } else {
      return "Obese";
    }
  };

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    const bmiCategory = getBMICategory(bmiValue);
    const convertred = bmiValue.toFixed(2);
    setBMI(convertred);
    setCategory(bmiCategory);

    if (
      name === "" ||
      age === "" ||
      weight === "" ||
      height === "" ||
      phoneNumber === ""
    ) {
      handleError("Please Fill the Field First");
    } else {
      ChooseOpen();
    }
  };

  const handlesubmitCheck = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name,
        age,
        weight,
        height,
        phoneNumber,
        bmi,
        category,
      };

      fetch("http://localhost:8000/api/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body
: JSON.stringify(data),
      });

      handleSuccess("Stored!!!");
      ChooseOnClose();
    } catch (error) {
      console.log(error.message);
      handleError(error.message);
    }
  };
  return (
    
      <Container maxW={"2xl"}>
        <Box className=" mt-20 md:mt-15" boxShadow="lg" p="6" rounded="lg" color={"white"}>
          <Heading lineHeight="tall">
            <Highlight
              query=" Bmi Register"
              styles={{ px: "2", py: "1", rounded: "full", bg: "orange.400" }}
            >
              BMI CALCULATOR
            </Highlight>
          </Heading>
          <Stack spacing={4} mt={5}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={BiUser} color="#8b008b" />}
              />
              <Input
                type="text"
                placeholder="Name"
                value={name}
                color={"white"}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={BiCategoryAlt} color="#8b008b" />}
              />

              <Input
              type="number"
                placeholder="Age"
                value={age}
                color={"white"}
                onChange={(e) => setAge(e.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children={<Icon as={HiOutlinePhone} color="#8b008b" />}
              />
              <Input
              type="number"
                maxLength={0}
                placeholder="Phone no"
                value={phoneNumber}
                color={"white"}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </InputGroup>

            <HStack>
              <Box width={"full"}>
                <FormControl id="" isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children={<Icon as={GiWeight} color="#8b008b" />}
                    />
                    <Input
                      width={"full"}
                      type="number"
                      placeholder="Weight"
                      value={weight}
                      color={"white"}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
              </Box>
              <Box width={"full"}>
                <FormControl id="">
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children={
                        <Icon as={TbArrowAutofitHeight} color="#8b008b" />
                      }
                    />
                    <Input
                      width={"full"}
                      type="number"
                      placeholder="Height"
                      value={height}
                      color={"white"}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
              </Box>
            </HStack>

            <Button onClick={calculateBMI} colorScheme="teal" variant="solid" color={"#fffafa  "}>
              CALCULATE
            </Button>
            <Modal
              closeOnOverlayClick={false}
              isOpen={isChooseOpen}
              onClose={ChooseOnClose}
            >
              <ModalOverlay />
              <ModalContent backgroundcolor={"black"}>
                <ModalHeader color="#8b008b">BMI CALCULATION</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <SimpleGrid
                    spacing={4}
                    templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                  >
                    <Card>
                      {/* <CardHeader>
                        <Heading size="md">BMI CALCULATION</Heading>
                      </CardHeader> */}
                      <CardBody className="text-center" color={"#ff0800"}>
                        <Text>BMI Value : {parseFloat(bmi)}</Text>
                        <Text>Category : {category}</Text>
                        <Container mt={5}>
                          <Center>

                          <Image width={200} height={300} borderRadius={10} src={require(`../../img/${category?category:"Obese"}.png`)}/>

                          </Center>

                        </Container>
                      </CardBody>
                      <CardFooter>
                        <Button width={"full"} onClick={handlesubmitCheck} color={"white"}>
                          Store
                        </Button>
                      </CardFooter>
                    </Card>
                  </SimpleGrid>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Stack>
        </Box>
      </Container>
    
  );
}

export default PostCreate;
