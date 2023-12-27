import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const InputModal = ({ isVisible, onClose,setTasks,tasks }) => {
  const [formData, setFormData] = useState({
    id:uuidv4(),
    title: '',
    description: '',
    dueDate: '',
    createDate:new Date(),
    img:'',
    file: null,

  });
 
  //Function to handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  //Handle Form submission
  const handleSubmit = () => {
    setTasks(prev=>[...prev,formData]);
    localStorage.setItem('tasks', JSON.stringify([...tasks, formData]));
    console.log('Form Data:', formData);
    setFormData(
      {
        id:uuidv4(),
        title: '',
        description: '',
        dueDate: '',
        createDate:new Date(),
        img:'',
        file: null,
      }
    )
    
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
      <div className='flex flex-col'>
        <div className='bg-white p-4 rounded lg:w-[500px] md:max-lg:w-[60vw] md:max-lg:h-[65vh] max-md:w-[100vw]'>
          <h1 className='text-[#3D00C0]'>New Task</h1>

          <input
            name='title'
            placeholder='Title'
            className='bg-[#E5E4FF] w-full rounded-[15px] p-2'
            value={formData.title}
            onChange={handleInputChange}
          />

          <textarea
            name='description'
            placeholder='Description...'
            className='bg-[#E5E4FF] w-full rounded-[15px] p-2 my-4 h-[250px] resize-none'
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>

         <div className='bg-[#E5E4FF] w-full rounded-[15px] flex justify-between'>
          <label htmlFor='inp' className='px-4 py-2'>Due on:</label>
          <input
          id='inp'
            name='dueDate'
            placeholder='15-11-2023'
            className='bg-transparent'
            value={formData.dueDate}
            onChange={handleInputChange}
          />
          <button className='rounded-e-[15px] px-4 w-36 py-2 bg-[#737374] text-white w-[100px]'>Change</button>
          </div>
         
          <div className='bg-[#E5E4FF] w-full rounded-[15px] flex justify-between my-2'>
          <input
            name='img'
            placeholder='No image...'
            className='bg-transparent p-2 w-full'
            value={formData.img}
            onChange={handleInputChange}
          />
          <button className='rounded-e-[15px] py-2 bg-[#737374] text-white px-1 w-[210px]'>Add Image</button>
          </div>
        
          <div className='flex w-full justify-between'>
            <button className='font-semibold w-1/3' onClick={() => onClose()}>
              Cancel
            </button>
            <button
              className='bg-[#3D00C0] text-white w-1/3 p-3 rounded-[15px]'
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
