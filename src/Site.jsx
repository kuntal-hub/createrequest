import { useState, useRef } from 'react'
import axios from 'axios'

export default function Site({ site, timer }) {
    const [totalRequests, setTotalRequests] = useState(0)
    const [totalResponses, setTotalResponses] = useState(0)
    const [timePassed, setTimePassed] = useState(0)
    const [nextRequest, setNextRequest] = useState("unknown")
    const [isStart, setIsStart] = useState(false)
    const requestInterval = useRef(null)
    const timeInterval = useRef(null)

    const fetchSite = async () => {
        setTotalRequests(prev => prev + 1)
        try {
            const res = await axios.get(site)
            if (res.data.status === 200) {
                setTotalResponses(prev => prev + 1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const toggleTimer = async () => {
        let interval1, interval2;
        if (!isStart) {
            setIsStart(true)
            const date = new Date();
            const d = new Date(date.getTime()+timer);
            setNextRequest(d.toLocaleTimeString());
            fetchSite()
            interval2 = setInterval(() => {
                console.log("second interval")
                fetchSite()
            }, timer)

            interval1 = setInterval(() => {
                setTimePassed((prev) => {
                    if (prev < 120) {
                        return prev + 1
                    } else {
                        return 0
                    }
                })
            }, 1000)

            requestInterval.current = interval2
            timeInterval.current = interval1
        } else {
            setIsStart(false)
            clearInterval(requestInterval.current)
            clearInterval(timeInterval.current)
            setNextRequest("unknown")
            setTimePassed(0)
        }
    }


    return (
        <div className='p-4 bg-gray-200 rounded-xl md:flex md:flex-nowrap md:justify-between my-2'>
            <div className=' w-full md:w-[79%] lg:w-[69%]'>
                <h1 className='lg:text-xl md:text-lg text-sm font-bold mb-3'>{site}</h1>
                <div className='w-full flex flex-nowrap justify-between'>
                    <div className='w-45%'>
                        <p className='md:text-sm text-[12px] text-gray-600'>
                            Total Requests : {totalRequests}
                        </p>
                        <p className='md:text-sm text-[12px] text-gray-600'>
                            Total Responses : {totalResponses}
                        </p>
                    </div>
                    <div className='w-55%'>
                        <p className='md:text-sm text-[12px] text-gray-600'>
                            Timer : {`${Math.floor(timePassed / 60)}:${timePassed % 60}`}
                        </p>
                        {nextRequest !== "unknown" &&
                            <p className='md:text-sm text-[12px] text-gray-600'>
                                Next Request : {`${nextRequest}`}
                            </p>}

                    </div>
                </div>
            </div>
            <div className='grid place-content-center w-full md:w-[20%] lg:w-[30%] mt-5 md:mt-0'>
                <button onClick={toggleTimer}
                className={`${!isStart? "bg-green-600 hover:bg-green-700":"bg-red-600 hover:bg-red-700"} rounded-md px-8 text-white font-semibold py-2`}>
                    {isStart ? "Stop" : "Start"}
                </button>
            </div>
        </div>
    )
}
