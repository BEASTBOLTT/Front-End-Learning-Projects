import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPaste } from '../redux/pasteSlice'
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom'


const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes)

  const [searchTerm, setSearchTerm] = useState('')

  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()))

  function handleDelete(pasteID) {
    dispatch(removeFromPaste(pasteID))
  }

  return (
    <div>
      <input
        className='p-4 rounded-2xl mt-8 bg-black min-w-[600px] '
        type="search"
        placeholder='Search Here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='flex flex-col gap-5 mt-5'>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) => {
              return (
                <div className='border' key={paste?._id}>
                  <div>
                    {paste.title}
                  </div>
                  <div>
                    {paste.content}
                  </div>
                  <div className='flex flex-row gap-4 place-content-evenly'>
                    <button className=" p-2
                     rounded-xl mt-2 bg-black">
                      <NavLink
                        to={`/pastes/${paste?._id}`}
                        className="!text-inherit !font-normal"
                      >
                        View
                      </NavLink>
                    </button >
                    <button className=" p-2
                     rounded-xl mt-2 bg-black">
                      <NavLink
                        to={`/?pasteId=${paste?._id}`}
                        className="!text-inherit !font-normal"
                      >
                        Edit
                      </NavLink>
                    </button>
                    <button className=" p-2
                     rounded-xl mt-2 bg-black"
                      onClick={() => handleDelete(paste?._id)}>
                      Delete
                    </button>
                    <button className=" p-2
                     rounded-xl mt-2 bg-black"
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content)
                        toast.success("Copied to the Clipboard")
                      }
                      }
                    >
                      Copy
                    </button>
                    <button className=" p-2
                     rounded-xl mt-2 bg-black">
                      Share
                    </button>

                  </div>
                  <div>
                    {paste.createdAt}
                  </div>
                </div>
              )
            }
          )
        }
      </div>
    </div>
  )
}

export default Paste
