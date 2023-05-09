import { Pagination } from "antd";

import "./paging.scss";

const Paging = ({ page, limit, totalPosts, changePage }) => {
 
  const onChangePage = (current) => {
    changePage(current);
  };

  return (
    <div className="paging text-center">
      <Pagination
        showSizeChanger={false}
        current={page}
        pageSize={limit}
        total={totalPosts}
        onChange={onChangePage}
      />
    </div>
  );
};

export default Paging;
