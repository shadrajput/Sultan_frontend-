import React from 'react'
import { BiSearch } from "react-icons/bi"
import { AiFillEye } from "react-icons/ai";
import "../../../App.css"
import { useNavigate } from "react-router-dom";
import ChargeFormModal from '../../../Component/ChargeFormModal';


function EMIHistory() {
    const navigate = useNavigate();
    const [chargeFormModal, setChargeFormModal] = React.useState(false);

    return (
        <>
            <div className='xs:px-5 sm:px-10 sm:py-5 h-full'>
                <div className='sm:py-5'>
                    <h1 className='text-[#0d0d48] text-2xl font-bold'>EMI Details</h1>
                </div>
                <div className='xs:px-0 xs:py-5 xl:px-20'>
                    <div className="bg-white xs:overflow-x-scroll xl:overflow-x-hidden">
                        <table className="w-full bg-[#0d0d48] text-sm text-center  " id="table-to-xls" >
                            <thead className="text-xs text-gray-700 bg-class3-50 uppercase  ">
                                <tr className="text-white text-xs ">
                                    <th scope="col" className="pl-3 py-4">
                                        Receipt No
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Installment
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        status
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white items-center bg  overflow-x-scroll xl:overflow-x-hidden 2xl:overflow-x-hidden">
                                <tr className=" border-b">
                                    <th className="py-5 px-6">
                                        01
                                    </th>
                                    <td className="px-6 py-5 ">
                                        05/01/2023
                                    </td>
                                    <td className="px-6 py-5 capitalize">
                                        5000
                                    </td>
                                    <td className="px-6 py-5">
                                        2
                                    </td>
                                    <td className="px-6 py-5">
                                        <h1 className='bg-green-300 text-green-900 font-bold py-[2px] rounded-md'>
                                            Paid
                                        </h1>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex justify-center items-center">
                                            <AiFillEye
                                                className="xs:text-base md:text-sm lg:text-[19px] hover:cursor-pointer "
                                                onClick={() =>
                                                    navigate(`/Receipt/Receipt`)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody className="bg-white items-center bg  overflow-x-scroll xl:overflow-x-hidden 2xl:overflow-x-hidden">
                                <tr className=" border-b">
                                    <th className="py-5 px-6">
                                        01
                                    </th>
                                    <td className="px-6 py-5 ">
                                        05/01/2023
                                    </td>
                                    <td className="px-6 py-5 capitalize">
                                        5000
                                    </td>
                                    <td className="px-6 py-5">
                                        2
                                    </td>
                                    <td className="px-6 py-5">
                                        <h1 className='bg-red-300 text-red-900 font-bold py-[2px] rounded-md'>
                                            Paid
                                        </h1>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div
                                            onClick={() => setChargeFormModal(true)}
                                            className="flex justify-center items-center bg-green-600 hover:bg-green-500 py-[5px] rounded-lg cursor-pointer text-white font-semibold">
                                            Pay
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <ChargeFormModal
                    showModal={chargeFormModal}
                    handleShowModal={setChargeFormModal}
                // refetchData={refetchData}
                // tournamentDetails={tournamentDetails}
                />
            </div>
        </>
    )
}

export default EMIHistory