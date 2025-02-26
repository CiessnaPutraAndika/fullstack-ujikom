import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { deleteAdmin, refreshTokens } from '../services/Api';
import logo from '../assets/logo.jpg';
import { Modal } from '../components/EditModals';
import { BiPencil, BiTrash } from 'react-icons/bi';

const Dashboard = (props) => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const navigate = useNavigate();
    const [allList, setAllList] = useState();

    const [modalOpen, setModalOpen] = useState(false);
    const openModals = () => setModalOpen(true);
    const closeModals = () => setModalOpen(false);

    const refreshToken = async () => {
        try {
            const response = await refreshTokens();
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.username);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        refreshToken();
    }, []);

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await refreshTokens();
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.username);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getAdmin = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:5500/admin', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAllList(response.data);
        } catch (error) {
            console.error('Error fetching admin data:', error);
        }
    };

    useEffect(() => {
        if (token) {
            getAdmin();
        }
    }, [token]);

    const [put, setPut] = useState({
        id: '',
        username: '',
        email: '',
        password: ''
    });

    const setEditData = (item) => {
        setPut({
            id: item.id,
            username: item.username,
            email: item.email,
            password: ''
        });
        openModals();
    };

    const getDataId = async (e) => {
        e.preventDefault();

        try {
            await axiosJWT.put(`http://localhost:5500/admin/update/${put.id}`, put, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('Admin successfully updated! Refreshing list...');
            closeModals();

            await getAdmin(); // Refresh the list
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update admin.');
        }
    };

    function handleData(e) {
        const newPut = { ...put };
        newPut[e.target.id] = e.target.value;
        setPut(newPut);
    }

    // delete menu
    const deletedAdmin = async (id) => {
        try {
            await deleteAdmin(id);
            const updatedPost = allList.filter(post => post.id !== id);
            if (updatedPost) {
                alert('Admin successfully deleted!');
            }
            setAllList(updatedPost);
        } catch (error) {
            console.error('error deleting post: ', error);
        }
    };

    return (
        <div className='w-full'>
            <Navbar />
            <div className='w-full flex justify-center items-center'>
                <Sidebar />
                <div className='w-full lg:w-[95%] sm:w-[90%] p-3 bg-slate-100 m-auto h-screen flex flex-col lg:flex-col outline outline-slate-300'>
                    <div className='w-full m-auto flex h-full flex-col justify-start items-start gap-3'>
                        <p className='font-extrabold text-2xl flex items-center gap-2'>Welcome {name} </p>
                        <div className='w-full m-auto h-screen flex justify-center p-2 gap-5 overflow-x-auto' style={{ scrollbarWidth: '6px' }}>
                            <div className='w-full overflow-x-auto'>
                                <table className='shadow-lg w-full min-w-[600px]'>
                                    <thead className='text-white rounded-t-lg'>
                                        <tr>
                                            <th className='py-3 bg-black rounded-tl-lg'>Id</th>
                                            <th className='py-3 bg-black'>username</th>
                                            <th className='py-3 bg-black'>email</th>
                                            <th className='py-3 bg-black rounded-tr-lg'>Action</th>
                                        </tr>
                                    </thead>
                                    {
                                        allList?.map((items) => (
                                            <tr className="bg-white cursor-pointer" key={items.id}>
                                                <td className="py-3 px-6">{items.id}</td>
                                                <td className="py-3 px-6">{items.username}</td>
                                                <td className="py-3 px-6">{items.email}</td>
                                                <td className="py-3 px-6 flex gap-3 justify-center items-center">
                                                    <button onClick={() => setEditData(items)}>
                                                        <BiPencil className="text-2xl hover:text-black/50" />
                                                    </button>
                                                    <form onSubmit={getDataId}>
                                                        <Modal isBuka={modalOpen} onTutup={closeModals} judul="Edit Admin">
                                                            <div className="flex flex-col gap-y-3">
                                                                <input
                                                                    onChange={(e) => handleData(e)}
                                                                    id="username"
                                                                    value={put.username}
                                                                    type="text"
                                                                    placeholder="Username..."
                                                                    className="w-full outline-2 flex rounded-md outline-black p-2 text-black"
                                                                />

                                                                <input
                                                                    onChange={(e) => handleData(e)}
                                                                    id="email"
                                                                    value={put.email}
                                                                    type="text"
                                                                    placeholder="Description..."
                                                                    className="w-full outline-2 flex rounded-md outline-black p-2 text-black"
                                                                />

                                                                <input
                                                                    onChange={(e) => handleData(e)}
                                                                    id="password"
                                                                    value={put.password}
                                                                    type="text"
                                                                    placeholder="Password..."
                                                                    className="w-full outline-2 flex rounded-md outline-black p-2 text-black"
                                                                />
                                                            </div>
                                                        </Modal>
                                                    </form>

                                                    <button onClick={() => deletedAdmin(items.id)}>
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
    );
};

export default Dashboard;