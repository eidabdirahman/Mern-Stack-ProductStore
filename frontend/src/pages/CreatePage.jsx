import {
    Box,
    Button,
    Container,
    Heading,
    Input,
    useColorModeValue,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/products";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
    });

    const { createProduct } = useProductStore();
    const toast = useToast();
    const navigate = useNavigate();

    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct);
        if (success) {
            toast({
                title: "Product created.",
                description: "Product Created Successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            setNewProduct({ name: "", description: "", price: "", image: "" });
            navigate("/"); // 👈 Redirect to homepage
        } else {
            toast({
                title: "Error creating product.",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Product
                </Heading>

                <Box
                    w={"full"}
                    bg={useColorModeValue("white", "gray.800")}
                    p={6}
                    rounded={"lg"}
                    shadow={"md"}
                >
                    <VStack spacing={4}>
                        <Input
                            placeholder='Product Name'
                            name='name'
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <Input
                            placeholder='Description'
                            name='description'
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        />
                        <Input
                            placeholder='Price'
                            name='price'
                            type='number'
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <Input
                            placeholder='Image URL'
                            name='image'
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        />

                        <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreatePage;
