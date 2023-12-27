import React from 'react'

const DescModal  = ({isVisible,onClose,selected}) => {
  if(!isVisible)return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center max-md:items-end'>
        <div className=' flex flex-col'>
            <div className='bg-white p-4 rounded max-lg:w-[80vw] max-md:w-[100vw] h-[70vh] max-md:h-[80vh]'>
                <button className='w-full flex justify-end' onClick={()=>onClose()}>X</button>  
                <div className='p-4'>
                    <h4 className='font-bold'>Description:</h4>
                    <div className='font-semibold'>{selected.title}</div>
                    <div className='text-[#BA0000] text-semibold text-sm'>Due : {selected.dueDate}</div>
                    <div>{selected.description}</div>
                    {selected.img && <img src={selected.img}/>}
                </div>
            </div>
        </div>
    </div>
  )
}
export default DescModal
