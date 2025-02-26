import Order from "../models/OrderModels.js"
import Product from "../models/ProductModels.js"
import Users from "../models/UsersModels.js";

export const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.findAll({
            // where: { UserId },
            include: [
                { 
                    model: Product, 
                    as: "Product" 
                },
                { 
                    model: Users, 
                    as: "Users" 
                }
            ],
        });

        console.log("Fetched Orders:", orders);
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: error.message || "Server error" });
    }
};


export const getOrderById = async (req, res) => {
    try{
        const { id } = req.params;
        const order = await Order.findByPk(id, {
            include: [
                {
                    model: Product,
                    as: "Product",
                },
                {
                    model: Users,
                    as: "Users",
                },
            ],
        });
        if (!order) {
            return res.status(404).json({ message: "id order tidak ditemukan" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "data order tidak terambil" });
    }
}

export const createOrder = async (req, res) => {
    try{
        const { order_status, total_price, quantity, ProductId } = req.body;
        const ordered = await Order.create({order_status, total_price, quantity, ProductId : ProductId});
        res.status(200).json(ordered);
    }catch(error){
        res.status(500).json({error: error.message, message: "gagal createOrder"})
    }
}

export const updateOrder = async (req, res) => {
    try{
        const { id } = req.params;
        const { order_status, total_price, quantity, ProductId } = req.body;
        const [updated] = await Order.update({ order_status, total_price, quantity, ProductId: ProductId }, { where: { id } });
        const updatedOrder = await Order.findByPk(id);        
        if (updated === 0){
            res.status(404).json({error: error.message, message: "order tidak ter-update"})
        }else{
            res.status(200).json(updatedOrder);
        }
    }catch(error){
        res.status(500).json({error: error.message, message: "gagal mengupdate order"})
    }
}

export const deleteOrder = async (req, res) => {
    try{
        const {id} = req.params;
        const deleted = await Order.destroy({where: {id}});
        res.status(200).json(deleted + ` order berhasil terhapus`)
    }catch(error){
        res.status(500).json({error: error.message, message: "gagal menghapus order"})
    }
}