import React from 'react'
import './index.css'

function DashboardCard({heading,createdAt,createdBy,description}) {
  const date = new Date(createdAt).toLocaleDateString();

  return (
    <div className='dashboardCard'>
        <div className='dcHeader'>
            <div>{heading}</div>
            <div>{createdBy} {date}</div>
        </div>
        <div className='dcBody'>
            {description}
        </div>

    </div>
  )
}

export default DashboardCard