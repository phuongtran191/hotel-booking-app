import React from 'react';
import Avatar from '../../Avatar/Avatar';

import "./WidgetTransactions.scss"
function WidgetTransactions(props) {
    const { className, listOrder } = props
    console.log(listOrder[1].time)
    console.log(listOrder)
    const displayTime =(d)=>{
        var result="";
        result = d.getHours()+":"+d.getMinutes()+" "+ d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
        return result;
    }
    return (
        <div className={"last-transactions " + className}>
            <div className="widget__title">
                Lastest Orders
            </div>
            <table className="last-transactions__table">
                <thead>
                    <tr>
                        <th>
                            Customer
                        </th>
                        <th>
                            Date
                        </th>
                        <th>
                            Amount
                        </th>
                        <th>
                            State
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listOrder.map((order) => {
                           return <tr key={order.id}>
                                <td className="av"> <Avatar urlImg = {order.avatar} /><h4>{order.name}</h4>  </td>
                                <td>{displayTime(order.time)}</td>
                                <td>{order.amount}</td>
                                <td>{
                                 <span  className={" btn btn__" +order.status}>{order.status}</span> 
                                    }
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default WidgetTransactions;