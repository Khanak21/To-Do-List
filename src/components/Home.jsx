import React, { useState,useEffect } from 'react'
import InputModal from './InputModal';
import DescModal from './DescModal';



export const Home = () => {
    const [descModalShow, setDescModalShow] = React.useState(false);//show state of description modal
    const [showModal,setShowModal]=useState(false)//show state of input modal
    const [tasks,setTasks]=useState([])//list of all tasks
    const [completedTasks,setCompletedTasks]=useState([])//list of completed tasks
    const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);//checking the screen view
    const [selected,setSelected]=useState({})//currently selected task
    const [compTab,setCompTab]=useState(false)//completed tab open or not

    console.log(selected)

    //Retrieving data from local storage 
    useEffect(()=>{
        const arr=localStorage.getItem('tasks')
        const comp=localStorage.getItem('completed')

        console.log(arr)
        if(arr){
            setTasks(JSON.parse(arr))
        }
        if(comp){
            setCompletedTasks(JSON.parse(comp))
        }
    },[])

    //Checking if current view is tablet/mobile or larger
    useEffect(() => {
      const handleResize = () => {
        setIsTabletOrMobile(window.innerWidth <= 768);
      };
  
      handleResize();
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    //Delete function
    const handleDelete = (id)=>{
        setTasks(tasks.filter(task=>task.id!=id))
    }
    const handleCompletedDelete = (id)=>{
        setCompletedTasks(completedTasks.filter(task=>task.id!=id))
    }

    //Complete function
    const handleComplete = (id) => {
        const task=tasks.filter(task=>task.id==id)[0]
        setCompletedTasks(prev=>[...prev,task])
        localStorage.setItem('completed', JSON.stringify([...completedTasks, task]));

        handleDelete(id)
      };
    
    //Function to sort by due date
    const sortDueDate = () => {
        const sortedTasks = [...tasks];
        sortedTasks.sort((a, b) => {
          const dateA = new Date(a.dueDate.split("-").reverse().join("-"));
          const dateB = new Date(b.dueDate.split("-").reverse().join("-"));
          return dateA - dateB;
        });
        setTasks(sortedTasks);
      };
    
    //Sort by created Date
    const sortCreateDate = () => {
        console.log("Before Sorting:", tasks);
        const sortedTasks = [...tasks];
        sortedTasks.sort((a, b) => a.createDate - b.createDate);
        console.log("After Sorting:", sortedTasks);
        setTasks(sortedTasks);
      };
      
    console.log(tasks); 
    console.log(completedTasks)
  return (
    <div>
        <div className='text-[#3D00C0] font-black text-6xl mx-8  mt-4 mb-12 md:max-lg:text-center max-md:text-center max-md:text-5xl'>
            TO-DO LIST
        </div>

        {/* Sorting options */}
        <div className='flex justify-end mx-10 md:max-lg:mr-2 max-md:flex-col'>
            <div className='border-2 rounded-[15px] border-[#3D00C0] flex m-2 font-semibold'>
                <div 
                className='text-[#3D00C0] bg-[#E5E4FF] rounded-s-[15px] w-[100px] p-2 text-center max-md:hidden'>
                    sort by</div>
                
                <div 
                className='bg-[#ACA7D5] w-[233px] py-2 text-center max-md:rounded-s-[15px]' 
                onClick={sortCreateDate}>
                    Date created</div>

                <div 
                className='py-2 w-[233px] text-center' 
                onClick={sortDueDate}>
                    Due date</div>
            </div>

            {/* Create new Task button */}
            <div 
            className='bg-[#3D00C0] text-white m-2 px-8 py-2 rounded-[15px] text-center md:max-lg:hidden' 
            onClick={() => setShowModal(true)}>
                Create new task
            </div>
        </div>

        <div className='bg-[#E5E4FF] h-[60vh] mx-12 md:rounded-[15px] flex md:max-lg:mr-0 md:max-lg:h-[80vh] max-md:h-[65vh] max-md:mx-0 max-md:absolute max-md:w-full max-md:bottom-0 '>
            <div className='lg:border-e-[1px]  lg:border-black w-[2000px] pt-4 pb-16 relative '>

        {/* Pending Tasks Tab */}

        {!compTab &&
        <>
            <div className='md:max-lg:flex md:max-lg:justify-between '>
                <div className='font-bold text-xl ml-4'>Pending Tasks</div>
                <div 
                className='bg-[#3D00C0] text-white m-2 px-8 py-2 rounded-[15px] text-center max-md:hidden lg:hidden' 
                onClick={() => setShowModal(true)}>
                Create new task
                </div>
             </div>
            <div className='overflow-y-scroll max-h-[50vh] h-full'>

            {/* List of Tasks */}
            {
                tasks.map(task=>(
                    
                    <div 
                    key={task.id} 
                    className='rounded-s-[15px] my-2 p-4 ml-4 font-semibold flex justify-between max-md:flex-col' 
                    onClick={() => {
                            setSelected(task)
                            if(isTabletOrMobile)setDescModalShow(true)
                            }} style={{backgroundColor: selected.id==task.id ? '#EEEEEE' : '#FFFFFF',borderColor: selected.id==task.id?'#000000':null,borderWidth:selected.id==task.id?'2px':null}}>

                        <div className=' p-1'>{task?.title}</div>
                        <div className='flex md:max-lg:flex-col-reverse max-md:flex-row-reverse'>
                           <div 
                           className='mx-1 bg-[#FFD2D2] text-[#8C0000] rounded-[5px] px-2 py-1 w-[90px] text-center md:max-lg:my-2 max-lg:w-[150px]' 
                           onClick={(e)=>{
                            e.stopPropagation()
                            handleDelete(task.id)
                            }}>Delete</div>

                            <div 
                            className='mx-1 text-[#2F7B00] bg-[#F5FFD8] rounded-[5px] px-2 py-1 w-[90px] text-center max-lg:w-[150px]' 
                            onClick={(e)=>{
                            e.stopPropagation()
                            handleComplete(task.id)}}>Complete</div>
                        </div>
                    </div>
                        
                    
                ))
            }

            </div>
        </>
            }

            {/* Completed Tasks Tab */}
            {
                compTab &&
                <>
             <div className='md:max-lg:flex md:max-lg:justify-between '>
                <div className='font-bold text-xl ml-4'>Completed tasks</div>
             </div>
            <div className='overflow-y-scroll max-h-[50vh] h-full'>
            {
                completedTasks.map(task=>(
                    
                    <div 
                    key={task.id} 
                    className='bg-white rounded-s-[15px] my-2 p-4 ml-4 font-semibold flex justify-between max-md:flex-col' 
                    onClick={() => {
                            setSelected(task)
                            if(isTabletOrMobile)setDescModalShow(true)
                            }}>

                        <div className=' p-1'>{task?.title}</div>
                        <div className='flex md:max-lg:flex-col-reverse max-md:flex-row-reverse'>
                            <div 
                            className='mx-1 bg-[#FFD2D2] text-[#8C0000] rounded-[5px] px-2 py-1 w-[90px] text-center md:max-lg:my-2 max-lg:w-[150px]' 
                            onClick={(e)=>{
                            e.stopPropagation()
                            handleCompletedDelete(task.id)
                            }}>Delete</div>
                        </div>
                    </div>
                        
                    
                ))
            }

            </div>
        </>

            }
            

               {/* Pending & Completed */}
                <div className='flex w-full bottom-0 absolute '>
                    <div 
                    className='bg-[#ACA7D5] font-bold text-center md:rounded-es-[15px] p-6 w-1/2' 
                    onClick={()=>{setCompTab(false)}}>Pending</div>
                    <div 
                    className='bg-[#F5F4FF] font-bold text-center p-6 w-1/2' 
                    onClick={()=>{setCompTab(true)}}>Completed</div>
                </div>
                

            </div>
            
            {/* Description Area */}
            <div className='p-4 max-lg:hidden overflow-y-scroll w-[1000px]'>
            <div className='font-bold text-xl'>Description</div>
            <div className='font-semibold'>
            {selected.title}
            </div>
            <div className='text-[#BA0000] text-semibold text-sm'>Due : {selected.dueDate}
            </div>
            <div>
            {selected.description}
            </div>
            <img src={selected?.img}/>


            </div>

        </div>

      {/* Modals */}
      <InputModal 
      isVisible={showModal} 
      onClose={()=>setShowModal(false)} 
      tasks={tasks} 
      setTasks={setTasks}/>

      <DescModal 
      isVisible={descModalShow} 
      onClose={()=>setDescModalShow(false)} 
      selected={selected} />

       

    </div>
  )
}
