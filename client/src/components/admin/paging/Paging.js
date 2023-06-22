import { Pagination } from "antd";

const Paging = ({ page, limit, totalPosts, changePage, changeLimit }) => {
 
  const onChangePage = (current, pageSize) => {
    changePage(current);
    changeLimit(pageSize);
  };

  return (
    <div className="admin-paging text-end">
      <Pagination
        showSizeChanger={true}
        current={page}
        pageSize={limit}
        total={totalPosts}
        onChange={onChangePage}
      />
    </div>
  );
};

export default Paging;
