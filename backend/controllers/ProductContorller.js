import Product from "../models/Product.Model.js";

const GetAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve products", error });
  }
};

const CreateProduct = async (req, res) => {
  const { name, price, description, image } = req.body;

  if (!name || !price || !description || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const ProductExist = await Product.findOne({ name });

  if (ProductExist) {
    return res.status(400).json({ message: "Product already exists" });
  }

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      image,
    });

    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error });
  }
};

const DeleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
};


const GetProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve product", error });
  }
};

const UpdateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image } = req.body;

  if (!name || !price || !description || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error });
  }
};

export  { 
        CreateProduct,
        DeleteProduct,
        GetAllProducts,
        GetProductById,
        UpdateProduct
 };