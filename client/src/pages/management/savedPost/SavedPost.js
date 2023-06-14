import { useContext, useEffect, useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { AuthContext } from "../../../contexts/AuthContext";
import { PostContext } from "../../../contexts/PostContext";
import PostsList from "../../../components/postsList/PostsList";

import "./savedPost.scss";

const SavedPost = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const { getSavedPosts } = useContext(PostContext);
  const [savedPosts, setSavedPost] = useState([]);

  useEffect(() => {
    if (user) {
      const getAllSavedPosts = async () => {
        const response = await getSavedPosts(user._id);

        setSavedPost(response.savedPosts);
      };

      getAllSavedPosts();
    }
  }, [user]);

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
              <PostsList posts={savedPosts} total={savedPosts.length} />
            )}
          </Col>
          <Col md={2} />
        </Row>
      </div>
    </div>
  );
};

export default SavedPost;
