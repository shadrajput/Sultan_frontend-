import { React, useState } from 'react'
import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi"
import { FaUsers } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { GiSmartphone } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { getAllPurchase, getPendingEmi } from '../../utils/apiCalls';
import { useQuery } from 'react-query'
import ChargeFormModal from '../../Component/ChargeFormModal';
import Pagination from 'react-responsive-pagination'
import '../../Component/Pagination/pagination.css'
import moment from 'moment'

function Dashboard() {
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(1);
  const PendingEMI = useQuery(['emi', pageNo], () => getPendingEmi({ pageNo: pageNo - 1, }))
  const Pending_Customer = PendingEMI?.data?.data?.totalPendingCustomers
  const Today_Collection = PendingEMI?.data?.data?.todaysCollection
  const Today_Model = PendingEMI?.data?.data?.totalModels
  const [chargeFormModal, setChargeFormModal] = useState(false);
  const [EMI_Details, setEMIDetails] = useState("");
  const [is_Edit, setIsEdit] = useState(false);

  const handlePayEMI = (id) => {
    navigate(`/receipt/Generate/${id}`,
      {
        state: {
          emi_id: id,
        }
      })
  };

  const handleSearchStudents = (e) => {
    let last_name = e.target.value
    // const Customer = purchase?.data?.data?.AllPurchase?.filter((n) => {
    //   return n.customer.last_name == last_name
    // })
    return
    setClassStudents(() =>
      allClassStudents?.filter((data) => {
        let searched_value = e.target.value;
        const full_name =
          data.student_id.basic_info_id.full_name?.toLowerCase();
        let isNameFound = false;

        if (isNaN(searched_value)) {
          searched_value = searched_value.toLowerCase();
        }

        if (full_name.indexOf(searched_value) > -1) {
          isNameFound = true;
        }

        return (
          data.student_id.student_id == searched_value ||
          isNameFound ||
          data.student_id.contact_info_id.whatsapp_no == searched_value
        );
      })
    );
  };

  return (
    <div className='px-5 py-5 xl:px-10 '>
      <div className='grid grid-cols-4 my-10 gap-5 '>
        <div className='bg-[#f9b115] flex justify-between items-start py-5 px-3 rounded-md drop-shadow-lg '>
          <div className='flex flex-col space-y-4'>
            <p className="text-white text-lg font-semibold ">Total Customer</p>
            <div className='flex items-center space-x-5'>
              <div className='bg-white text-[#f9b115] px-2 py-2 text-3xl rounded-md'>
                <FaUsers />
              </div>
              <h1 className="text-white font-roboto font-bold text-3xl">
                {
                  Pending_Customer
                }
              </h1>
            </div>
          </div>
          <div className='flex justify-end items-end'>
            <BiDotsVerticalRounded className='text-white' />
          </div>
        </div>
        <div className='bg-[#321fdb] flex justify-between items-start  py-5 px-3 rounded-md drop-shadow-lg '>
          <div className='flex flex-col space-y-4 '>
            <p className="text-white text-lg font-semibold ">Total Model</p>
            <div className='flex items-center space-x-5'>
              <div className='bg-white text-[#321fdb] px-2 py-2 text-3xl rounded-md'>
                <GiSmartphone />
              </div>
              <h1 className="text-white font-roboto font-bold text-3xl">
                {Today_Model}
              </h1>
            </div>
          </div>
          <div className='flex justify-end items-end'>
            <BiDotsVerticalRounded className='text-white' />
          </div>
        </div>
        <div className='bg-[#3399ff] flex justify-between items-start  py-5 px-3 rounded-md drop-shadow-lg '>
          <div className='flex flex-col space-y-4 '>
            <p className="text-white text-lg font-semibold ">Total Pending Payment</p>
            <div className='flex items-center space-x-5'>
              <div className='bg-white text-[#3399ff] px-2 py-2 text-3xl rounded-md'>
                <BiRupee />
              </div>
              <h1 className="text-white font-roboto font-bold text-3xl">
              </h1>
            </div>
          </div>
          <div className='flex justify-end items-end'>
            <BiDotsVerticalRounded className='text-white' />
          </div>
        </div>

        <div className='bg-[#de4141] flex justify-between items-start  py-5 px-3 rounded-md drop-shadow-lg '>
          <div className='flex flex-col space-y-4 '>
            <p className="text-white text-lg font-semibold ">Today's Collection</p>
            <div className='flex items-center space-x-5'>
              <div className='bg-white text-[#de4141] px-2 py-2 text-3xl rounded-md'>
                <GiTakeMyMoney />
              </div>
              <h1 className="text-white font-roboto font-bold text-3xl">
                {Today_Collection}
              </h1>
            </div>
          </div>
          <div className='flex justify-end items-end'>
            <BiDotsVerticalRounded className='text-white' />
          </div>
        </div>

      </div>
      <div className="bg-white shadow-md rounded-md  xs:overflow-x-scroll xl:overflow-x-hidden px-10 py-5">
        <div className='flex justify-between items-center py-5'>
          <div className='flex justify-start items-center w-1/3 '>
            <input
              type="search"
              placeholder='Search Customer'
              onChange={handleSearchStudents}
              className='drop-shadow-lg border px-4 py-[6px] focus:outline-none rounded-l-lg w-full'
            />
            <div className='bg-[#3399ff]  px-3 py-[7px] group rounded-r-lg flex justify-center items-center
                         shadow-xl cursor-pointer text-white text-2xl '>
              <BiSearch className='search group-hover:scale-125 duration-300' />
            </div>
          </div>
          <div className="right flex items-center space-x-3 pr-6">
            <div className='flex items-center space-x-3'>
              <div className='bg-green-200 rounded-md px-3 shadow-lg py-[10px] flex flex-col justify-center  items-center'>
                <h1 className='font-semibold text-sm'>
                  Total : 291840
                </h1>
              </div>
            </div>
          </div>
        </div>
        <table
          className="w-full text-sm text-center text-white bg-[#3399ff]"
          id="table-to-xls">
          <thead className="text-xs uppercase">
            <tr className=" text-sm">
              <th scope="col" className="pl-3 py-3">
                Serial No
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile
              </th>
              <th scope="col" className="px-6 py-3">
                Model
              </th>
              <th scope="col" className="px-6 py-3">
                EMI Date
              </th>
              <th scope="col" className="px-6 py-3">
                EMI Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Profile
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {
            PendingEMI?.data?.data?.pendingEmiCustomers?.length > 0 ? (
              PendingEMI?.data?.data?.pendingEmiCustomers?.map((item, index) => {
                console.log(item)
                return (
                  <tbody key={index} className="bg-white text-black items-center  overflow-x-scroll xl:overflow-x-hidden 2xl:overflow-x-hidden">
                    <tr className=" border-b">
                      <th className="py-5 px-6">
                        {index + 1}
                      </th>
                      <td className="px-6 py-5 capitalize">
                        {item.purchase?.customer?.full_name}
                      </td>
                      <td className="px-6 py-5">
                        {item.purchase?.customer?.mobile}
                      </td>
                      <td className="px-6 py-5">
                        {item?.purchase?.phone?.company?.company_name} || {item?.purchase?.phone?.model_name}
                      </td>
                      <td className="px-6 py-5">
                        {moment(item.due_date).format("DD / MM")}
                      </td>
                      <td className="px-6 py-5">
                        {item?.amount}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-center items-center">
                          <Tippy content="Customer Profile">
                            <div>
                              <AiFillEye
                                className="xs:text-base md:text-sm lg:text-[19px] hover:cursor-pointer "
                                onClick={() =>
                                  navigate(`/InstallmentList/profile-detail/${item?.purchase?.customer?.id}`)}
                              />
                            </div>
                          </Tippy>
                        </div>
                      </td>
                      <td className="px-6 py-5 ">
                        <div className="flex justify-center space-x-3">
                          <button
                            onClick={() => handlePayEMI(item.id)}
                            className='bg-green-800 hover:bg-green-700 px-4 text-white py-[3px] text-sm font-semibold rounded-md'>
                            Pay
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                )
              })
            ) : (
              null
            )}
        </table>
        {
          PendingEMI?.data?.data?.pendingEmiCustomers?.length > 0 ?
            null
            :
            <div className='flex justify-center items-center w-full rounded-b-lg py-[5px] text-red-900 space-x-4 bg-red-200'>
              <FaUsers className='text-2xl' />
              <h1 className='text-sm font-bold'>No customers with pending fees</h1>
            </div>
        }
      </div>

      {
        PendingEMI?.data?.data?.pendingEmiCustomers?.length > 0 ?
          <div className='mx-auto px-20 py-12 sm:px-24 sm:py-12 md:px-28 md:py-5'>
            <Pagination
              total={PendingEMI && PendingEMI?.data?.data?.pageCount ? PendingEMI?.data?.data?.pageCount : 0}
              current={pageNo}
              onPageChange={(page) => setPageNo(page)}
            // previousLabel="Previous" nextLabel="Next"
            />
          </div>
          :
          null
      }

      <ChargeFormModal
        showModal={chargeFormModal}
        handleShowModal={setChargeFormModal}
        is_Edit={is_Edit}
        EMI_Details={EMI_Details}
      />
    </div>
  )
}

export default Dashboard