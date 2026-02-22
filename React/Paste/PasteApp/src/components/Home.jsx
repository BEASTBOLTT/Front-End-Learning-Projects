import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste } from '../redux/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const pasteId = searchParams.get("pasteId")

    const dispatch = useDispatch();

    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(()=> {
        if(pasteId){
            const paste = allPastes.find((p)=> p._id === pasteId);
            setTitle(paste.title);
            setValue(paste.content);
        }
    },[pasteId])

    function createPaste() {
        const paste ={
            title : title,
            content : value,
            _id : pasteId || Date.now().toString(32),
            createdAt: new Date().toISOString(),
        }

        if(pasteId){
            dispatch(updateToPaste(paste))
            
        }
        else{
            dispatch(addToPaste(paste))
        }

        setTitle('');
        setValue('');
        setSearchParams({});
    }
  return (
    <div>
            <div className='flex flex-row gap-7 place-content-between'>
        <input 
        className='pl-4 rounded-2xl mt-2 bg-black w-[65%]'
        type="text"
        placeholder='Title' 
        value = {title}
        onChange = {(e) => (setTitle(e.target.value))}/>

        <button
        onClick={createPaste}
        className=" p-3 rounded-2xl mt-2 bg-black">
            {
            pasteId ? "Update My Paste"
            : "Create My Paste"}
        </button>
        </div>
        <div className='mt-4'>
            <textarea
            className=' rounded-2xl mt-4 bg-black min-w-[500px] p-4'
            value = {value}
            placeholder='Enter The Paste Here'
            onChange={(e) => setValue(e.target.value)}
            rows= {20}
            />
        </div>
    </div>
    
  )
}

export default Home
