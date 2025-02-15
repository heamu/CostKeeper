/* eslint-disable react/prop-types */
import "./styles.css"

function SearchInput({setSearch,search}) {
    return (
        <>

<div className="ui-input-container">
  <input
    value={search}
    required=""
    placeholder="Type something..."
    className="ui-input"
    type="text"
    onChange={(e)=>{setSearch(e.target.value)}}
  />
  {/* <div className="ui-input-underline"></div>
  <div className="ui-input-highlight"></div> */}
  <div className="ui-input-icon">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2"
        stroke="currentColor"
        d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
      ></path>
    </svg>
  </div>
</div>

        </>
    )
}

export default SearchInput
