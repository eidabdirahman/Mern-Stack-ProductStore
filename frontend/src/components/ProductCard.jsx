import {
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/products";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        toast({
            title: success ? "Success" : "Error",
            description: message,
            status: success ? "success" : "error",
            duration: 3000,
            isClosable: true,
        });
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        onClose();
        toast({
            title: success ? "Success" : "Error",
            description: success ? "Product updated successfully" : message,
            status: success ? "success" : "error",
            duration: 3000,
            isClosable: true,
        });
        if (success) {
            navigate("/");
        }
    };

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
            </Link>

            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    <Link to={`/product/${product._id}`}>
                        <Text _hover={{ textDecoration: "underline", color: "blue.500" }}>
                            {product.name}
                        </Text>
                    </Link>
                </Heading>

                {product.description && (
                    <Text fontSize='sm' color={textColor} mt={2} noOfLines={3}>
                        {product.description}
                    </Text>
                )}
                <Text fontWeight='bold' fontSize='xl' color={textColor}>
                    ${product.price}
                </Text>


                <HStack spacing={2} mt={4}>
                    <IconButton icon={<FaPencil />} onClick={onOpen} colorScheme='blue' />
                    <IconButton
                        icon={<FaTrash />}
                        onClick={() => handleDeleteProduct(product._id)}
                        colorScheme='red'
                    />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Product Name'
                                name='name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                                <Input
                                    placeholder='Description'
                                    name='description'
                                    value={updatedProduct.description}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
                                />
                            <Input
                                placeholder='Price'
                                name='price'
                                type='number'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />
                            <Input
                                placeholder='Image URL'
                                name='image'
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                        >
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ProductCard;
