import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { createProduct, deleteProduct, getProduct, refreshTokens } from '../services/Api'
import { Modal } from '../components/EditModals'
import { BiPencil, BiTrash } from 'react-icons/bi'
import { Modalc } from '../components/CreateModals'

const Product = (props) => {
    const [name, setName] = useState('')
    const [token, setToken] = useState('')
    const [expire, setExpire] = useState('')
    const navigate = useNavigate()
    const [allList, setAllList] = useState()

    // create
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);  

    // edit
    const [modalOpen, setModalOpen] = useState(false);
    const openModals = () => setModalOpen(true);
    const closeModals = () => setModalOpen(false);

    const refreshToken = async () => {
        try {
            const response = await refreshTokens()
            setToken(response.data.accessToken)
            const decoded = jwtDecode(response.data.accessToken)
            setName(decoded.username)
            setExpire(decoded.exp)
        } catch (error) {
            if (error.response) {
                navigate('/login')
            }
        }
    }

    useEffect(() => {
        refreshToken()
    }, [])

    const [allProducts, setAllProducts] = useState()

    useEffect(() => {
        getProduct(allProducts)
        .then((res) => {
            setAllProducts(res.data)
        })
    }, [])
    console.log(allProducts);

  const [post, setPost] = useState({
    name: '',
    description: '',
    price: '',
    gambar: ''
  })

  const submit = (e) => {
      e.preventDefault();
      if (!post.name || !post.description || !post.price || !post.gambar) {
          alert('Isi form data dengan lengkap')
          return;
      }

      createProduct(post)
      .then(res => {
          console.log(res);
          if(post){
              alert('Table successfully created, please refresh the page!')
          }
          closeModals();
          return res.data;
      })
      .catch(error => {
          console.error('Error :', error)
          alert('An error occurred while creating Table. Please try again later.')
      })
    }

    const handle = (e) => {
      const newPost = {...post}
      newPost[e.target.id]=e.target.value
      setPost(newPost)
    }

    const axiosJWT = axios.create()

    axiosJWT.interceptors.request.use(async(config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await refreshTokens()
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken)
            setName(decoded.username)
            setExpire(decoded.exp)
        }
        return config;
    }, (error) => {
        return Promise.reject(error)
    })
    
    const [put, setPut] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        gambar: '',
    });
    
    // Fungsi untuk menetapkan data sebelum edit
    const setEditData = (item) => {
        setPut({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            gambar: item.gambar,
        });
        openModals(); // Buka modal setelah data diset
    };
    
    const getDataId = async (e) => {
        e.preventDefault();
    
        try {
            await axiosJWT.put(`http://localhost:5500/products/update/${put.id}`, put, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            alert('Product successfully updated! Refreshing list...');
            closeModals();
    
            // Refresh daftar produk setelah update
            const res = await getProduct();
            setAllProducts(res.data);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update product.');
        }
    };

    function handleData(e) {
        const newPut = { ...put };
        newPut[e.target.id] = e.target.value;
        setPut(newPut);
    }

    // delete menu
    const deletedProduct = async (id) => {
        try{
            await deleteProduct(id)
            const updatedPost = allList.filter(post => post.id !== id);
            if(updatedPost){
                alert('Product successfully deleted!')
            }
            setAllList(updatedPost)
        }catch (error){
            console.error('error deleting post: ', error)
        }
    }    
    
  return (
    <div className='w-full'>
        <Navbar/>
        <div className='w-full flex justify-center items-center'>
            <Sidebar/>
            <div className='w-full lg:w-[95%] sm:w-[90%] p-3 bg-slate-100 m-auto h-screen flex flex-col lg:flex-col outline outline-slate-300'>
                <div className='w-full flex h-full flex-col justify-start items-start gap-1'>
                    <p className='font-extrabold text-2xl flex items-center gap-2'>Welcome {name} </p>
                      <div className='h-full w-full flex flex-col items-center p-2 gap-3 overflow-x-auto' style={{ scrollbarWidth: '6px' }}>
                          <div className='flex justify-end items-center w-full'>
                              <button 
                                  className='bg-black text-white p-2 rounded-md hover:bg-black/75 ease-in-out duration-75 px-3 font-semibold'
                                  onClick={openModal}
                              >
                                  Tambah
                              </button>
                          </div>
                          <form onSubmit={(e) => {submit(e)}}>
                              <Modalc 
                                  isOpen={isModalOpen} 
                                  onClose={closeModal} 
                                  title="Tambah Product"
                              >
                                  <div className='flex flex-col gap-y-3'>
                                      <input onChange = {(e) => handle(e)} id='name' value={post.name} type="text" placeholder='name' className='w-full outline-2 flex rounded-md outline-black p-2 text-black'/>

                                      <input onChange={(e) => handle(e)} id='description' value={post.description} type="text" placeholder='Description...' className='w-full outline-2 flex rounded-md outline-black p-2 text-black'/>
                                      <input onChange={(e) => handle(e)} id='price' value={post.price} type="number" placeholder='Price...' className='w-full outline-2 flex rounded-md outline-black p-2 text-black'/>
                                      <input onChange={(e) => handle(e)} id='gambar' value={post.gambar} type="text" placeholder='Gambar Url...' className='w-full outline-2 flex rounded-md outline-black p-2 text-black'/>
                                  </div>
                              </Modalc>
                          </form>
                      <div className='w-full overflow-x-auto'>
                          <table className='shadow-lg w-full min-w-[600px]'>
                              <thead className='text-white rounded-t-lg'>
                              <tr>
                                  <th className='py-3 bg-black rounded-tl-lg'>Id</th>
                                  <th className='py-3 bg-black'>Product</th>
                                  <th className='py-3 bg-black'>Name</th>
                                  <th className='py-3 bg-black'>Description</th>
                                  <th className='py-3 bg-black'>Price</th> 
                                  <th className='py-3 bg-black rounded-tr-lg'>Action</th>
                              </tr>
                              </thead>
                              {
                                allProducts?.map((items) => (
                                    <tr className="bg-white cursor-pointer" key={items.id}>
                                        <td className="py-3 px-6">{items.id}</td>
                                        <td className="py-3 px-6">
                                            <img src={items.gambar} alt={items.name} className="w-full md:h-35 object-cover" />
                                        </td>
                                        <td className="py-3 px-6">{items.name}</td>
                                        <td className="py-3 px-6">{items.description}</td>
                                        <td className="py-3 px-6">{items.price}</td>
                                        <td className="py-3 px-6 flex gap-3 justify-center items-center">
                                            {/* Tombol Edit */}
                                            <button onClick={() => setEditData(items)}>
                                                <BiPencil className="text-2xl hover:text-black/50" />
                                            </button>

                                            {/* Modal Edit */}
                                            <form onSubmit={getDataId}>
                                                <Modal isBuka={modalOpen} onTutup={closeModals} judul="Edit Product">
                                                    <div className="flex flex-col gap-y-3">
                                                        <input
                                                            onChange={(e) => handleData(e)}
                                                            id="name"
                                                            value={put.name}
                                                            type="text"
                                                            placeholder="Name..."
                                                            className="w-full outline-2 flex rounded-md outline-black p-2 text-black"
                                                        />

                                                        <input
                                                            onChange={(e) => handleData(e)}
                                                            id="description"
                                                            value={put.description}
                                                            type="text"
                                                            placeholder="Description..."
                                                            className="w-full outline-2 flex rounded-md outline-black p-2 text-black"
                                                        />

                                                        <input
                                                            onChange={(e) => handleData(e)}
                                                            id="price"
                                                            value={put.price}
                                                            type="number"
                                                            placeholder="Price..."
                                                            className="w-full outline-2 flex rounded-md outline-black p-2 text-black"
                                                        />

                                                        <input
                                                            onChange={(e) => handleData(e)}
                                                            id="gambar"
                                                            value={put.gambar}
                                                            type="text"
                                                            placeholder="Gambar Url..."
                                                            className="w-full outline-2 flex rounded-md outline-black p-2 text-black"
                                                        />
                                                    </div>
                                                </Modal>
                                            </form>

                                            <button onClick={() => deletedProduct(items.id)}>
                                                <BiTrash className="text-2xl hover:text-black/50" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                          </table>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Product