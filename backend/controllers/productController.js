import { Product } from "../models/Product.js";
//not final as it still needs other models/etc to be done first.
export async function getAllProducts(req, res) {
  try {
    const { category, search } = req.query;
    const filters = {};

    if (category) filters.category = category;
    if (search) filters.name = { $regex: search, $options: "i" };

    const products = await Product.getAll(filters);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createProduct(req, res) {
  try {
    const { product_name, description, unit_price, cost_price } = req.body;

    if (!product_name || !description || !unit_price || !cost_price)
      return res.status(400).json({ message: "Missing required fields" });

    const unitPriceNum = parseFloat(unit_price);
    const costPriceNum = parseFloat(cost_price);

    if (unitPriceNum <= 0 || costPriceNum <= 0) {
      return res.status(400).json({
        message: "Unit price and cost price must be positive numbers",
      });
    }

    if (unitPriceNum < costPriceNum) {
      return res
        .status(400)
        .json({ message: "Unit price cannot be lower than cost price" });
    }

    /* hoping this works.
    if (category_id) {
        const categoryExists = await Category.findById(category_id);
        if (!categoryExists) return res.status(400).json({ message: "Invalid category" });

    if (supplier_id) {
        const supplierExists = await Supplier.findById(supplier_id);
        if (!supplierExists) return res.status(400).json({ message: "Invalid supplier" });
    }
    */

    await Product.create({
      product_name,
      description,
      //category_id,
      //supplier_id,
      unit_price: parseFloat(unit_price),
      cost_price: parseFloat(cost_price),
      is_active: true,
    });

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    delete updates.product_id;
    delete updates.created_at;
    delete updates.updated_at;

    if (updates.unit_price !== undefined) {
      const unitPriceNum = parseFloat(updates.unit_price);
      if (unitPriceNum <= 0)
        return res
          .status(400)
          .json({ message: "Unit price must be a positive number" });
      updates.unit_price = unitPriceNum;
    }

    if (updates.cost_price !== undefined) {
      const costPriceNum = parseFloat(updates.unit_price);
      if (costPriceNum <= 0)
        return res
          .status(400)
          .json({ message: "Cost price must be a positive number" });
      updates.cost_price = costPriceNum;
    }

    if (updates.unit_price !== undefined && updates.cost_price !== undefined) {
      if (updates.unit_price < updates.cost_price)
        return res
          .status(400)
          .json({ message: "Unit price cannot be lower than cost price" });
    }

    /*
    if (updates.category_id) {
        const categoryExists = await Category.findById(updates.category_id);
        if (!categoryExists) return res.status(400).json({ message: "Invalid category"});
    }

    if (updates.supplier_id) {
        const supplierExists = await Category.findById(updates.supplier_id);
        if (!supplierExists) return res.status(400).json({ message: "Invalid supplier"});
    }
    */

    const result = await Product.update(id, updates);

    if (result.matchedCount === 0)
      return res.status(404).json({ message: "Product not found" });

    if (result.modifiedCount === 0)
      return res.status(200).json({ message: "No changes made" });

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const result = await Product.delete(id);

    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
