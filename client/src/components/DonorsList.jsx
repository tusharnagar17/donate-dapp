import React, { useEffect, useState } from "react"
import { BigNumber } from "ethers"

const DonorsList = ({ state }) => {
    const [list, setList] = useState([])
    const { contract } = state

    useEffect(() => {
        const fetchList = async () => {
            try {
                const tempList = await contract.getDonor()
                setList(tempList)
                console.log("tempList", tempList[0])
            } catch (error) {
                console.log("Error Fetching data:", error)
            }
        }

        contract && fetchList()
    }, [contract])

    const convertDayTime = (hexTime) => {
        const decimalTimestamp = BigNumber.from(hexTime).toNumber()

        const date = new Date(decimalTimestamp * 1000)
        const day = date.toLocaleDateString()
        const time = date.toLocaleTimeString()

        return `${day} - ${time}`
    }
    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center py-4 text-4xl font-medium font-sans">Donors List</div>

            {/* Table */}
            <div className="relative overflow-x-auto text-black bg-white">
                <table className="w-full rounded-lg text-sm text-left rtl:text-right">
                    <thead className="text-xs bg-gray-300 rounded-xl text-gray-700 uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Message
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {list &&
                            list.map((item) => (
                                <tr className="">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium  whitespace-nowrap "
                                    >
                                        {item.name}
                                    </th>
                                    <td className="px-6 py-4">{item.message}</td>
                                    <td className="px-6 py-4">{convertDayTime(item.timestamp)}</td>
                                    <td className="px-6 py-4">{item.from}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DonorsList
