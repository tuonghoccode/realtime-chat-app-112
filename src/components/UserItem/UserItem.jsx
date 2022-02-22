import { Avatar } from '@nextui-org/react'
import React from 'react'
import './useritem.scss'


const UserItem = ({src, name, role}) => {
  return (
    <div className='user-item'>
        <Avatar squared bordered color='secondary' src={src}/>
        <div className="info">
            <div className="name">{name}</div>
            <div className="role">{role}</div>
        </div>
    </div>
  )
}

export default UserItem