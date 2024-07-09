import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Players() {
  const [formData, setFormData] = useState({
    player1: "",
    player2: "",
  });

  const navigate=useNavigate()
  const toast = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(formData.player1 && formData.player2){
        sessionStorage.setItem("players", JSON.stringify(formData))
        toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            position:"top",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })

        navigate("/dashboard")
    }

    //console.log(formData);

    setFormData({
      player1: "",
      player2: "",
    });
  };

  return (
    <Box h={"100vh"} bg={"purple.500"} p={"7% 30%"}>
      <Box bg={"white"} boxShadow={"md"} borderRadius={"10px"} p={"50px"}>
        <Heading fontSize={"35px"} fontFamily={"serif"} color={"purple"}>
          Welcome's to Chess App
        </Heading>

        <Text fontWeight={"bold"} color={"#565757"} fontFamily={"cursive"}>
          Select a two player's and start the game!
        </Text>

        <Box mt={"10px"}>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Player1</FormLabel>
              <Input type="text" placeholder="Enter player1 name" name="player1" value={formData.player1} onChange={handleChange} isRequired />
            </FormControl>

            <FormControl mt={"10px"}>
              <FormLabel>Player2</FormLabel>
              <Input type="text" placeholder="Enter player2 name" name="player2" value={formData.player2} onChange={handleChange} isRequired />
            </FormControl>

            <Button w={"100%"} type="submit" mt={"30px"} colorScheme="purple">
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
export default Players;
