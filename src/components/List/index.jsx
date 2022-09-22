import { current } from "daisyui/src/colors";
import React, { memo, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSavedData } from "../../store/appSlice";

const itemsPerPage = 5;

const List = ({ searchText }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.app.allData);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);

  const savedData = useSelector((state) => state.app.savedData);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  const saveData = (item) => {
    dispatch(setSavedData(item));
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full mb-5">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Name</th>
              <th>Max Supply</th>
              <th>Symbol</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, i) =>
              item.symbol.toLowerCase().includes(searchText.toLowerCase()) ? (
                <tr key={i}>
                  <th>
                    <img
                      src={item.icon_url}
                      alt={item.symbol}
                      className="w-8"
                    />
                  </th>
                  <td>
                    <p>{item.name_full}</p>
                  </td>
                  <td>
                    <p>{item.max_supply}</p>
                  </td>
                  <td>
                    <p>{item.symbol}</p>
                  </td>
                  <td>
                    {savedData.find((data) => data.symbol === item.symbol) ? (
                      <button onClick={() => navigate("/view")} className="btn">
                        View
                      </button>
                    ) : (
                      <button onClick={() => saveData(item)} className="btn">
                        Save Data
                      </button>
                    )}
                  </td>
                </tr>
              ) : undefined
            )}
          </tbody>
        </table>
      </div>
      {searchText === "" ? (
        <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          className="flex items-center pagination justify-center mb-5"
          previousLabel="< "
          renderOnZeroPageCount={null}
        />
      ) : undefined}
    </div>
  );
};

export default memo(List);
