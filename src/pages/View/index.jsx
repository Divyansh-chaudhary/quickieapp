import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { deleteSavedData } from "../../store/appSlice";

const itemsPerPage = 5;

const View = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedData = useSelector((state) => state.app.savedData);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(savedData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(savedData.length / itemsPerPage));
  }, [itemOffset, savedData]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % savedData.length;
    setItemOffset(newOffset);
  };

  const deleteData = (item) => {
    dispatch(deleteSavedData(item.symbol));
  };

  return (
    <Layout>
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
            {currentItems.map((item, i) => (
              <tr key={i}>
                <th>
                  <img src={item.icon_url} alt={item.symbol} className="w-8" />
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
                  <button onClick={() => deleteData(item)} className="btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <button className="btn" onClick={() => navigate("/")}>
          Back
        </button>
      </div>
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
    </Layout>
  );
};

export default View;
