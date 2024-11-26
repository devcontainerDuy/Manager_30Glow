import ProTypes from "prop-types";
import "./Pagination.css"

const Pagination = ({
  currentPage,
  totalPage,
  onPageChange,
  // limit,
  // onChangeLimit,
}) => {
  console.log("data page: ", currentPage, totalPage);
  
  const handleClick = () => {
    onPageChange(currentPage + 1);
  };

  const renderPageNumber = () => {
    return Array.from({ lenght: totalPage }, (_, index) => (
      <button
        key={index}
        onClick={() => handleClick(index + 1)}
        disabled={currentPage === index + 1}
        className={currentPage === index + 1 ? "active" : ""}
      >
        1
      </button>
    ));
  };

  return (
    <div>
      {/* <div>
        <label htmlFor="limit-select">Limit:</label>
        <select
          id="limit-select"
          value={limit}
          onChange={(e) => onChangeLimit(Number(e.target.value))}
        >
          <option value="1" default>
            1
          </option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div> */}

      <div className="pagination-container">
        <button onClick={()=>handleClick(currentPage-1)} disabled={currentPage===1}>Previous</button>
        {renderPageNumber()}
        <button onClick={()=>handleClick(currentPage+1)} disabled={currentPage===totalPage}>Next</button>
      </div>
    </div>
  );
};

Pagination.proTypes = {
  currentPage: ProTypes.number.isRequired,
  totalPage: ProTypes.number.isRequired,
  // limitPage: ProTypes.number.isRequired,
  // onChangeLimit: ProTypes.func.isRequired,
  // onChangePage: ProTypes.func.isRequired,
};

export default Pagination;
