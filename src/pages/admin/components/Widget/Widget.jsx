import React from 'react';
import WidgetTransactions from './WidgetTransactions/WidgetTransactions';
import WidgetUser from './WidgetUSer/WidgetUser';
import "./Widget.scss"


function Widget(props) {
    const {listUser,listOrder} = props;
    return (
        <div className="widget">
            <WidgetUser listUser= {listUser}  className="WidgetUser"/>
            <WidgetTransactions  listOrder={listOrder} className="WidgetTransactions"/>
        </div>
    );
}

export default Widget;