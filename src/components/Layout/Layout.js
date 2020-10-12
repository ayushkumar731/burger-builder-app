import React from 'react';
import Auxiliary from '../../hoc/Auxilliary'
const layout =(props)=>(
    <Auxiliary>
        <div> Toolbar ,Sidebar, Backdrop</div>
        <main>{props .children}</main>
    </Auxiliary>
)

export default layout;