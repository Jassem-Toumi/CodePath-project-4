import React from 'react'
// import url from "../assets/bookExample.jpeg";
// title, author, publisher, description, lastWeekrank, currRank ,url
function DisplayCard({title, author, publisher, description, lastWeekrank, currRank ,url, handleBan}){
    return (
        <div className="display-Card">
       
        <h2>{title}</h2>
        <div className="categories">
          <div className="book-property">
            <h4>Author: </h4>
            <button onClick={handleBan} value="author">{author}</button>
          </div>
          <div className="book-property">
            <h4>Publisher: </h4>
            <button onClick={handleBan} value="publisher">{publisher}</button>
          </div>
          {/* <div className="book-property">
            <h4>Last Week rank: </h4>
            <button onClick={handleBan} value="lastWeekRank">{lastWeekrank}</button>
          </div> */}
          <div className="book-property">
            <h4>Current Rank</h4>
            <button onClick={handleBan} value="currRank">{currRank}</button>
          </div>
        </div>
        <div className='descriptionWrapper'>
        <img src={url} alt="book cover" />
        {description != "Loading" ? <div className='description' >
          
          <h3>Description: </h3>
          <h4>{description}</h4>
        </div> : <div className='Invisible' ></div>}
        {/* <div className='description' >
          <h3>Description: </h3>
          <h4>{description}</h4>
        </div> */}

        </div>
        <div className="bookMark">
          <button>+</button>
        </div>
        {/* <div className="description">
          <button>{description}</button>
        </div> */}
      </div>
    )
}

export default DisplayCard;