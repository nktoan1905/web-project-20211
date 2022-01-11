import React from 'react'

const Rating = (props) => {
    const {count, value, inactiveColor,size,activeColor, onChange} = props
    const stars = Array.from({length: count}, () => '🟊')
    const handleChange = (value) => {
        onChange(value + 1);
    }
    return (
        <div>
            {stars.map((s, index) => {
                let style = inactiveColor;
                if (index < value) {
                style=activeColor;
                }
                return (
                <span className={"star"}  
                    key={index}
                    style={{color: style, width:size, height:size, fontSize: size}}
                    onClick={()=>handleChange(index)}>{s}</span>
                )
            })}
            {value}
        </div>
    )
}

export default Rating
