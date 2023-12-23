import Products from "./../models/productsSchema.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).json("Error in getting products: ", e);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    }
  } catch (e) {
    return res
      .status(404)
      .json({ message: "No product found with the given ID", e });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      image,
      description,
      price,
      oldPrice,
      countInStock,
    } = req.body;

    const product = await Products.create({
      name,
      category,
      image,
      description,
      price,
      oldPrice,
      countInStock,
    });

    if (product) {
      res.status(201).json(product);
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      image,
      description,
      price,
      oldPrice,
      countInStock,
    } = req.body;

    const product = await Products.findById(req.params.id);

    if (product) {
      product.name = name;
      product.category = category;
      product.image = image;
      product.description = description;
      product.price = price;
      product.oldPrice = oldPrice;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    }
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    if (product) {
      res.status(200).json({ message: "Product deleted successfully" });
    }
  } catch (e) {
    return res
      .status(404)
      .json({ message: `No product found with the id ${req.params.id}`, e });
  }
};
