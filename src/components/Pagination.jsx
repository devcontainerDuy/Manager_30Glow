import ProTypes from "prop-types";

const Pagination = ({
  currentPage,
  totalPage,
  onPageChange,
  // limit,
  // onChangeLimit,
}) => {
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
        {index + 1}
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

      <div>
        <button onClick={()=>handleClick(currentPage-1)} disabled={currentPage===1}>Previous</button>
        {renderPageNumber()}
        <button onClick={()=>handleClick(currentPage+1)} disabled={currentPage===totalPage}>Next</button>
      </div>

      <nav className="d-flex justify-content-center mx-auto">
        <ul className="pagination">
          <li className="page-item disabled">
            <span className="page-link">Page 1/4</span>
          </li>
          <li className="page-item disabled">
            <span className="page-link">First</span>
          </li>
          <li className="page-item active">
            <span className="page-link">1</span>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              4
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" rel="next">
              Next
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" rel="next">
              Last
            </a>
          </li>
        </ul>
      </nav>
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
