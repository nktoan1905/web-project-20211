import React, { useState } from 'react'
import { Checkbox, Collapse,Button } from 'antd';
import 'antd/dist/antd.css';
const { Panel } = Collapse


const CheckBox = (props) => {

    const [Checked, setChecked] = useState([])


    const handleToggle = (value) => {

        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)
        //update this checked information into Parent Component 

    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox
                onChange={() => handleToggle(value._id)}
                type="checkbox"
                checked={Checked.indexOf(value._id) === -1 ? false : true}
            />
            {/* <span>{value.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
            <button type="button" onClick={() => handleToggle(value._id)} className={Checked.indexOf(value._id) === -1 ? "btn btn-secondary mb-2" :"btn btn-primary mb-2"}>{value.name}</button>
            {' '}
        </React.Fragment>
    ))

    return (
        <div className='mt-3 mb-3' >
            <Collapse accordion >   
                <Panel header={props.title} key="1" >
                    {renderCheckboxLists()}
                </Panel>
                     
            </Collapse>
        </div>
    )
}

export default CheckBox
