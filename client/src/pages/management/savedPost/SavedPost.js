import { useContext, useEffect, useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { AuthContext } from "../../../contexts/AuthContext";
import { PostContext } from "../../../contexts/PostContext";
import PostsList from "../../../components/postsList/PostsList";
import Paging from "../../../components/paging/Paging";

import "./savedPost.scss";
const limit = 5;
const SavedPost = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const { getSavedPosts } = useContext(PostContext);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(limit);
  const [savedPosts, setSavedPost] = useState([]);
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    if (user) {
      const getAllSavedPosts = async () => {
        const response = await getSavedPosts(user._id);

        setTotal(response.savedPosts.length);
        setSavedPost(response.savedPosts.slice(0, limit));
        setPosts(response.savedPosts);
      };

      getAllSavedPosts();
    }
  }, [user]);

  useEffect(() => {
    if (user && posts.length !== 0) {
      setSavedPost(posts.slice((page - 1) * limit, page * limit));
    }
  }, [user, page]);

  return (
    <div className="my-saved-post">
      <div className="my-saved-post__header">
        <h2>Tin đã lưu</h2>
      </div>
      <div className="my-saved-post__body">
        <Row>
          <Col md={2} />
          <Col md={8}>
            {savedPosts && (
              <>
                <PostsList posts={savedPosts} />
                <Paging
                  page={page}
                  limit={limit}
                  totalPosts={total}
                  changePage={setPage}
                />
              </>
            )}
          </Col>
          <Col md={2} />
        </Row>
      </div>
    </div>
  );
};

export default SavedPost;
