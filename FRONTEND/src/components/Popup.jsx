import React from 'react'

const Popup = ({onSub}) => {
  return (
    <>

    <div
      id="popup-modal"
      tabIndex={-1}
      className="flex bg-black/40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4  w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm ">
       
          <div className="p-4 md:p-5 text-center">
           
            <h3 className="mb-5 text-lg font-normal text-gray-500 ">
              Terimakasih telah memesan, mohon menunggu
            </h3>
            <button
              data-modal-hide="popup-modal"
              type="button"
              onClick={onSub}
              className="text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
             Pesan
            </button>
         
          </div>
        </div>
      </div>
    </div>
  </>
  
  )
}

export default Popup
