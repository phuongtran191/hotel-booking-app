import React from 'react';
import PropTypes from 'prop-types';
import Avatar from "../../Avatar/Avatar"
import "./WidgetUser.scss"
import { MdRemoveRedEye } from 'react-icons/md';
WidgetUser.propTypes ={
    listUser: PropTypes.array,  
}
WidgetUser.defaultProps ={
    listUser: null,  
}
function WidgetUser(props) {
    const { listUser,className } = props
    return (
        <div className={"new-user "+ className}>
            <div className="widget__title">
               New Join Members
           </div>
            <ul className="new-user__list">
                {listUser.map((user) => {
                    return <li key={user.id} className="new-user__item">
                        <Avatar urlImg = {user.avatar} />
                        <div className="new-user__info">
                            <h3>{user.name}</h3>
                            <p>{user.job}</p>
                        </div>
                        <div className="new-user__display">
                            <MdRemoveRedEye  className="icon"/>
                            <p>Display</p>
                        </div>
                    </li>

                })}
            </ul>
        </div>
    );
}

export default WidgetUser;