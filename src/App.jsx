import Site from "./Site"
import { useState } from "react";
import {useForm} from 'react-hook-form'

function App() {

  const [sites, setSites] = useState(
    localStorage.getItem('sites') ? JSON.parse(localStorage.getItem('sites')) : []
  );

  const [showCreate, setShowCreate] = useState(false)
  const {register, handleSubmit} = useForm();

  return (
    <div className='w-screen h-screen bg-gray-900 p-3 md:p-10 overflow-auto'>
      {
        sites.map((site,i) => (
          <Site key={i} site={site.name} timer={site.timer} />
        ))
      }

      <button onClick={() => setShowCreate(true)}
      className="text-white bg-green-600 hover:bg-green-700 font-semibold p-2 fixed right-2 bottom-2 rounded-md">
        Create New
      </button>

      {
        showCreate && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-70 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg">
              <form onSubmit={handleSubmit((data) => {
                console.log({name: data.name, timer: Number.parseInt(data.timer)*1000})
                setSites([...sites, {name: data.name, timer: Number.parseInt(data.timer)*1000}])
                setShowCreate(false)
                localStorage.setItem('sites', JSON.stringify([...sites, {name: data.name, timer: Number.parseInt(data.timer)*1000}]))
              })}>
                <input {...register('name')} type="text" placeholder="URL" className="w-full p-2 rounded-lg border border-gray-300 mb-3" />
                <input {...register('timer')} type="number" placeholder="Timer in seconds" className="w-full p-2 rounded-lg border border-gray-300 mb-3" />
                <button type="submit" className="bg-green-600 float-left hover:bg-green-700 text-white font-semibold p-2 rounded-md">
                  Create
                </button>
              </form>
              <button onClick={() => setShowCreate(false)}
              type="submit" className="bg-red-600 hover:bg-red-700 float-right text-white font-semibold p-2 rounded-md">
                  Cancel
                </button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default App
