import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { convertToRp } from '../currency';
import Popup from '../components/Popup';
import { Nav } from '../components/Nav';
import { FaShoppingCart } from 'react-icons/fa';
import bg from '../assets/bg.jpeg';
import logo from '../assets/logo.jpg';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import AddModal from '../components/AddModal';

const Home = () => {
    const sectionRef = useRef(null);

    const handleScroll = () => {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    };  

    const [dataMenu, setDataMenu] = useState([]);
    const [dataTr, setDataTr] = useState({
        quantity: 0,
        total_price: 0,
        order_status: 0,
        ProductId: 0,
        UserId: 0,
    });
    const [modalBeli, setModalBeli] = useState(false);
    const [hargaMenu, setHargaMenu] = useState(0);
    const [idMenu, setIdMenu] = useState(0);
    const [idCart, setIdCart] = useState(0);
    const [totalHarga, setTotalHarga] = useState(0);
    const [modalAprove, setModalAprove] = useState(false);

    const getAllData = async () => {
        try {
            const response = await axios.get('http://localhost:5500/products/');
            return response.data || [];
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    };

    useEffect(() => {
        getAllData().then((result) => setDataMenu(result));
    }, []);

    const handleOrder = (e) => {
        setIdMenu(e.id);
        setHargaMenu(e.price);
        setModalBeli(true);
        setDataTr({ ...dataTr, ProductId: e.id, UserId: e.UserId });
    };

    const handleAddCart = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem("dataku"));
            if (!userData || !userData.UserId) {
                console.error("User ID tidak ditemukan");
                return;
            }
    
            const userId = userData.UserId;
            
            const response = await axios.post('http://localhost:5500/order/create', { 
                ...dataTr, 
                ProductId: idMenu,
                UserId: userId 
            });
    
            console.log('Order created:', response.data.data);
            setIdCart(response.data.data.id);
            setTotalHarga(response.data.data.total_price);
            setModalBeli(false);
            setModalAprove(true);
        } catch (error) {
            console.error('Order creation failed:', error.response?.data?.msg || error.message);
        }
    };    

    const handlePesan = async () => {
        let id = localStorage.getItem("dataku");
        const parseId = JSON.parse(id);
        try {
            const response = await axios.post('http://localhost:5500/transaksi/create', {
                total_price: totalHarga,
                status: true,
                transaction_date: new Date(),
                OrderId: idCart,
                UserId: parseId.id
            });
            console.log('Transaction created:', response.data.data);
        } catch (error) {
            console.error('Transaction creation failed:', error.response.data.msg);
        }
    };

    return (
        <div className='bg-slate-200 w-full'>
            <Nav />
            <div className='h-screen flex flex-col-reverse lg:flex-row md:flex-row sm:flex-row justify-center items-center bg-white'>
            <div className='flex justify-center items-center h-full w-full sm:w-[40%] flex-col'>
              <div className='w-[80%] text-justify flex flex-col gap-4 py-2'>
                <div className='flex-col text-black'>
                    <div className='flex items-center gap-3'>
                        <img src={logo} className="w-40"/>
                    </div>
                  <p className='font-bold'>Calle De Larache. Clothing brand from Indonesia.</p>
                </div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea rem natus nobis ipsam eum reiciendis sed tenetur praesentium ullam cumque soluta dicta quas ex laboriosam exercitationem recusandae, sit nam distinctio?</p>
                <div className='flex items-center font-bold ease-in-out duration-300 bg-slate-200 rounded-3xl w-60 sm:w-60 outline outline-white'>
                  <button onClick={handleScroll} className='bg-black hover:bg-black/75 ease-in-out duration-300 p-2 text-white rounded-3xl px-6'>SEE PRODUCT</button>
                  <Link to='/cart'><button className='bg-slate-200 ease-in-out duration-300 rounded-e-3xl p-2 px-3 text-black hover:text-black/75'>CART</button></Link>
                </div>
              </div>
            </div>
            <div className='h-full w-full sm:w-[60%]'>
              <img src={bg} className="h-full w-full" />
            </div>
        </div>
            <div className='flex justify-center items-center'>
                <div className='max-w-6xl mx-auto my-10 flex justify-center items-center'>
                    <AddModal
                        judul='Pembelian'
                        data={dataTr}
                        harga={hargaMenu}
                        setData={setDataTr}
                        onSub={handleAddCart}
                        state={{ modalAdd: modalBeli, setModalAdd: setModalBeli }}
                    />
                    {modalAprove && <Popup onSub={handlePesan} />}
                    <div className='w-full flex flex-wrap gap-8 justify-center'>
                        <div ref={sectionRef} className='w-[90%] sm:w-full'>
                            <p className='font-extrabold text-2xl'>All Product</p>
                        </div>
                        {Array.isArray(dataMenu) && dataMenu.length > 0 ? (
                            dataMenu.map((e, i) => (
                                <div key={i} className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg w-65 justify-between">
                                    <div>
                                        <div className="m-2.5 overflow-hidden text-white rounded-md">
                                            <img src={e.gambar} alt={e.name} className="w-full h-40 object-cover" />
                                        </div>
                                        <div className="p-4">
                                            <h6 className="mb-2 text-slate-800 text-xl font-semibold">{e.name}</h6>
                                            <p className="text-slate-600 leading-normal font-light">{e.description}</p>
                                        </div>
                                    </div>
                                    <div className="px-4 pb-4 w-full flex items-end justify-between gap-2">
                                        <p className='font-semibold'>{convertToRp(e.price)}</p>
                                        <button onClick={() => handleOrder(e)} className='px-2 cursor-pointer text-black'>
                                            <FaShoppingCart />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Loading atau tidak ada data...</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;