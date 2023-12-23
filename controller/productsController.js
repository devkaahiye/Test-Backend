import Products from './../models/productsSchema.js';

export const getProducts = async(req, res)=>{
    try{

        const products = await Products.find()
        res.status(200).json(products)

    }catch(e){
        res.status(400).json('Error in getting products: ', e);
    }
}

export const getProductById = async(req, res)=>{
    try{

        const product = await Products.findById(req.params.id)
        if (product) {
            res.status(200).json(product)
            
        }

    }catch(e){
        return res.status(404).json({message:'No product found with the given ID', e});
    }
}

export const createProduct = async(req, res)=>{
    try{
        const { name,category, image, description, price, oldPrice,countInStock } = req.body

        const product = await Products.create({
            name,category, image, description, price, oldPrice,countInStock
        })

        res.status(201).json(product)

    }catch(e){
        return res.status(500).json({message:"Internal server error", e})
    }
}

export const updateProduct = async(req, res)=>{
    try{
        const id = req.params.id;

        const product = await Products.findByIdAndUpdate(id, req.body)
        if (product) {
            res.status(200).json(product)
            
        }

    }catch(e){
        return res.status(404).json({message:`No product found with the id ${req.params.id}`}, e)
    }
}

export const deleteProduct = async(req, res)=>{
    try{

        const product = await Products.findByIdAndDelete(req.params.id)
        if (product) {
            res.status(200).json({"message":"Product deleted successfully"})
            
        }

    }catch(e){
        return res.status(404).json({message:`No product found with the id ${req.params.id}`, e})
    }
}