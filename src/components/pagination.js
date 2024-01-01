export const Pagination = ({}) => {
  <div className="perPage mt-3">
    <div className="abs">
      <div className="ms-2 me-2">
        <p>Items per page</p>
      </div>
      <div className="bord ms-2 me-2 flexDiv">
        <p className="me-2">8</p>
        <img src={Down} alt="" />
      </div>
      <div className="LeftRight ms-2 me-2">
        <div className="bord ms-2 me-2">
          <img src={Left} alt="" />
        </div>
        <div className="bord ms-2 me-2">
          <img src={Right} alt="" />
        </div>
      </div>
    </div>
  </div>;
};
