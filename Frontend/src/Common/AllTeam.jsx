import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { teamData } from './AllData'

function AllTeam() {
    let slideTeamData = teamData
    return (
        <>
        {
            slideTeamData.map(v=>{
                return(
                    <div className='w-full hover:shadow-lg duration-300 text-center border py-10 '>
                    <div className='w-[120px] m-auto  h-[120px] rounded-[50%] overflow-hidden'>
                    <img src={v.bg} alt="" />
                    
                    </div>
                    <h1 className='text-[19px] py-3'>Member Name</h1>
                    <p>{v.subject}</p>
                    <ul className='flex justify-center text-[13px] text-yellow-400 gap-2 mt-3 mb-2'>
                    <li><FontAwesomeIcon icon={faStar}/></li>
                    <li><FontAwesomeIcon icon={faStar}/></li>
                    <li><FontAwesomeIcon icon={faStar}/></li>
                    <li><FontAwesomeIcon icon={faStar}/></li>
                    <li><FontAwesomeIcon icon={faStar}/></li>
                    
                    </ul>
                    </div>
                    )
                })
            }
            
            </>
            )
        }
        
        export default AllTeam