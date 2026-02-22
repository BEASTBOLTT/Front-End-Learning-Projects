import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste } from '../redux/pasteSlice';

const ViewPaste = () => {

  const {id} = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.find((p)=> p._id === id);

  return (
    <div>
            <div className='flex flex-row gap-7 place-content-between'>
        <input 
        className='pl-4 p-3
        rounded-2xl mt-2 bg-black w-[65%]'
        type="text"
        placeholder='Title' 
        disabled
        value = {paste.title}
        onChange = {(e) => (setTitle(e.target.value))}/>

        {/* <button
        onClick={createPaste}
        className=" p-3 rounded-2xl mt-2 bg-black">
            {
            pasteId ? "Update My Paste"
            : "Create My Paste"}
        </button> */}
        </div>
        <div className='mt-4'>
            <textarea
            className=' rounded-2xl mt-4 bg-black min-w-[500px] p-4'
            value = {paste.content}
            placeholder='Enter The Paste Here'
            disabled
            onChange={(e) => setValue(e.target.value)}
            rows= {20}
            />
        </div>
    </div>
  )
}

export default ViewPaste
