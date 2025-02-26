import React from 'react';
import { BiSave } from 'react-icons/bi';
import { FcCancel } from 'react-icons/fc';

export const Modalc = ({ isOpen, onClose, title, children, onSave }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-black">{title}</h2>
                    <button 
                        className="text-gray-600 hover:text-gray-900"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <div className="p-4">
                    {children}
                </div>
                <div className="flex justify-end p-4 border-t gap-x-4">
                    <button 
                        className="bg-black text-white px-4 py-2 rounded-md"
                        onClick={onClose}
                    >
                        <FcCancel className='text-lg'/>
                    </button>
                    <button 
                        className="bg-black text-white px-4 py-2 rounded-md"
                        onClick={onSave}
                    >
                        <BiSave className='text-lg'/>
                    </button>
                </div>
            </div>
        </div>
    );
};
