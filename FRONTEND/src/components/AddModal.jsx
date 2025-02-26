import React from 'react';
import { FaX } from 'react-icons/fa6';
import { convertToRp } from '../currency';
import { Link } from 'react-router-dom';

const AddModal = ({ state, judul, data, setData, onSub, harga }) => {
    function handleChange(e) {
        const { name, value } = e.target;
        const newData = { ...data };

        if (name === 'quantity') {
            const quantity = parseInt(value, 10) || 0;
            newData.quantity = quantity;
            newData.total_price = quantity * harga;
        } else if (name === 'total_price') {
            newData.total_price = parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
        }

        setData(newData);
    }
    const handleSubmit = () => {
        onSub(); // Panggil fungsi onSub yang diteruskan dari parent component
        alert('Data berhasil disubmit!'); // Tampilkan alert setelah submit
    };
    return (
        <div
            id="authentication-modal"
            tabIndex={-1}
            aria-hidden="true"
            className={`${state.modalAdd ? 'flex' : 'hidden'} overflow-y-auto bg-black/50 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full`}
        >
            <div className="relative p-4 w-full max-w-md max-h-full">
                {/* Modal content */}
                <div className="relative bg-white rounded-lg shadow-sm">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900">
                            {judul}
                        </h3>
                        <button
                            onClick={() => state.setModalAdd(false)}
                            type="button"
                            className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-full ms-auto inline-flex justify-center items-center"
                            data-modal-hide="authentication-modal"
                        >
                            <FaX />
                        </button>
                    </div>
                    {/* Modal body */}
                    <div className="p-4 md:p-5">
                        <div className="space-y-4 " action="#">
                            <div>
                                <label
                                    htmlFor="quantity"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Tambah Quantity
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={data ? data.quantity : 0}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Tambah Quantity"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="total_price"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Total Harga
                                </label>
                                <input
                                    type="text"
                                    name="total_price"
                                    value={data ? convertToRp(data.total_price) : ''}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Total Harga"
                                    readOnly
                                />
                            </div>
                            <Link to='/cart'>
                                <button
                                    onClick={(e) => handleSubmit(e)}
                                    className="w-[100%] text-white bg-black hover:bg-black/75 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Submit
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddModal;