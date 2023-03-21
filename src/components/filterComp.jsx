
import React from 'react'


function filterComp({categories, setCurrentCategory}) {
    return (
        <div className="select-wrapper">
        <h3>Pick category</h3>
        <select onChange={setCurrentCategory} defaultValue="hardcover-fiction" >
            {categories.map(category => {
                return <option value={category}>{category}</option>
            })}        
        </select>
      </div>
    )
}


export default filterComp;