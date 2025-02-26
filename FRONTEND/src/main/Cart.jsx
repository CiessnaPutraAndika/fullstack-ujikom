import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdArrowBackIos, MdPayment } from 'react-icons/md';
import { usersToken } from '../services/Api';
import { LiaStarSolid } from 'react-icons/lia';
import axios from 'axios';
import { BiTrash } from 'react-icons/bi';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        fetchCartItems();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await usersToken();
            localStorage.setItem("token", response.data.accessToken);
        } catch (error) {
            navigate('/');
        }
    };

    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token tidak ditemukan di localStorage!");
                return;
            }

            const response = await axios.get("http://localhost:5500/order", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            });

            setCartItems(response.data);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5500/order/delete/${id}`);
            fetchCartItems();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handlePayment = async (item) => {
        try {
            await axios.post('http://localhost:5500/transaksi/create', {
                total_price: item.total_price,
                status: true,
                transaction_date: new Date(),
                OrderId: item.id,
            });

            setPaymentDetails({
                productName: item.Product.name,
                totalPrice: item.total_price,
                transactionDate: new Date().toLocaleString(),
            });
            setShowModal(true);
            fetchCartItems();
        } catch (error) {
            console.error('Error creating transaction:', error);
        }
    };

    return (
        <div className='w-full m-auto max-w-[1300px] py-0 sm:py-5'>
            <Link to='/home' className='flex font-bold items-center w-20 mb-4'>
                <MdArrowBackIos className='text-2xl' /> Back
            </Link>
            <div className='flex gap-5'>
                <div className='w-full max-w-[1300px] m-auto flex justify-center items-center'>
                    <div className='w-full flex justify-center items-center gap-15 flex-col'>
                        {cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <div key={index} className='w-full h-screen flex justify-center items-center gap-3'>
                                    <div className='h-full w-[30%] flex justify-center items-center'>
                                        <img src={item.Product.gambar} className="w-full h-full" />
                                    </div>
                                    <div className='w-[70%] h-full flex flex-col gap-6'>
                                        <div className='flex flex-col justify-center gap-1'>
                                            <p className='text-2xl font-semibold'>{item.Product.name}</p>
                                            <ul className='flex items-center gap-1'>
                                                <li><LiaStarSolid /></li>
                                                <li><LiaStarSolid /></li>
                                                <li><LiaStarSolid /></li>
                                                <li><LiaStarSolid /></li>
                                                <li><LiaStarSolid /></li>
                                                <li className='font-bold'>5.0 (5)</li>
                                            </ul>
                                            <p className='font-bold text-lg'>Rp {item.total_price}</p>
                                        </div>
                                        <div className='w-full'>
                                            <div className='flex justify-center outline outline-slate-400 p-2 rounded-lg flex-col'>
                                                <p className='font-extrabold'>Jumlah Pesanan :</p>
                                                <p className='font-semibold'>Quantity : {item.quantity}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => handlePayment(item)} className='w-full rounded-lg bg-black hover:bg-black/75 font-semibold text-white justify-center items-center flex gap-2 p-2'>
                                            <MdPayment className='text-xl' /> Bayar Sekarang
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className='flex items-center text-red-400'>
                                            <BiTrash className='text-2xl' /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Keranjang kosong...</p>
                        )}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/25 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Detail Transaksi</h2>
                        {paymentDetails && (
                            <div>
                                <p>Produk: {paymentDetails.productName}</p>
                                <p>Total Harga: Rp {paymentDetails.totalPrice}</p>
                                <p>Tanggal Transaksi: {paymentDetails.transactionDate}</p>
                            </div>
                        )}
                        <button onClick={() => { setShowModal(false); setCartItems([]); }} className="mt-4 w-full bg-black text-white py-2 rounded-lg">Tutup</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
