import {
    Box,
    Container,
    Heading,
    Image,
    Spinner,
    Text,
    VStack,
    useColorModeValue,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProductStore } from "../store/products";

const SingleProductPage = () => {
    const { id } = useParams();
    const { fetchSingleProduct } = useProductStore(); // You need to implement this in your store
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    useEffect(() => {
        const loadProduct = async () => {
            const data = await fetchSingleProduct(id);
            setProduct(data);
            setLoading(false);
        };
        loadProduct();
    }, [id, fetchSingleProduct]);

    if (loading) {
        return (
            <Container maxW='container.md' py={12} centerContent>
                <Spinner size='xl' />
            </Container>
        );
    }

    if (!product) {
        return (
            <Container maxW='container.md' py={12} centerContent>
                <Text fontSize='xl' fontWeight='bold' color='red.500'>
                    Product not found 😢
                </Text>
            </Container>
        );
    }

    return (
        <Container maxW='container.md' py={12}>
            <Box bg={bg} shadow='md' rounded='lg' overflow='hidden'>
                <Image src={product.image} alt={product.name} w='full' h='80' objectFit='cover' />

                <Box p={6}>
                    <VStack align='start' spacing={4}>
                        <Heading size='lg'>{product.name}</Heading>
                        {product.description && (
                            <Text fontSize='md' color={textColor}>
                                {product.description}
                            </Text>
                        )}

                        <Text fontSize='2xl' fontWeight='bold' color={textColor}>
                            ${product.price}
                        </Text>
                    </VStack>
                </Box>
            </Box>
        </Container>
    );
};

export default SingleProductPage;
