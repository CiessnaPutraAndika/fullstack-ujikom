import Product from "../models/ProductModels.js";

export const getAllProduct = async (req, res) => {
    try{
        const products = await Product.findAll({
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "seluruh data product tidak terambil" });
    }
}

export const getProductById = async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "id product tidak ditemukan" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "data product tidak terambil" });
    }
}

export const createProduct = async (req, res) => {
    try{
        const { name, description, price, gambar } = req.body;
        const product = await Product.create({name, description, price, gambar});
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({error: error.message, message: "gagal createProduct"})
    }
}

export const updateProduct = async (req, res) => {
    try{
        const { id } = req.params;
        const { name, description, price, gambar } = req.body;
        const [updated] = await Product.update({ name, description, price, gambar }, { where: { id } });
        const updatedProduct = await Product.findByPk(id);        
        if (updated === 0){
            res.status(404).json({error: error.message, message: "product tidak ter-update"})
        }else{
            res.status(200).json(updatedProduct);
        }
    }catch(error){
        res.status(500).json({error: error.message, message: "gagal mengupdate order"})
    }
}

export const deleteProduct = async (req, res) => {
    try{
        const {id} = req.params;
        const deleted = await Product.destroy({where: {id}});
        res.status(200).json(deleted + ` product berhasil terhapus`)
    }catch(error){
        res.status(500).json({error: error.message, message: "gagal menghapus product"})
    }
}