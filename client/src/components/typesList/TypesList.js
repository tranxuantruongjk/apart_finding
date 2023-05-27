import React, { useEffect, useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

import { PostContext } from "../../contexts/PostContext";

import "./typesList.scss";

const TypesList = () => {
  const { rentTypes } = useContext(PostContext);
  const [posts, setPosts] = useState([]);

  const { getTotalPosts } = useContext(PostContext)

  useEffect(() => {
    const getPosts = async () => {
      const response = await getTotalPosts();
      setPosts(response.posts);
    }

    getPosts();
  }, [])


  return (
    <div className="types-list">
      <Card>
        <Card.Body>
          <Card.Title>Danh mục cho thuê</Card.Title>
          <ListGroup variant="flush">
            {rentTypes.map((rentType) => (
              <ListGroup.Item key={rentType._id}>
                <div className="list-item"> 
                  <IoIosArrowForward className="list-item__icon" />
                  <Link
                    to={`/${rentType._id}`}
                    className="list-item__text"
                  >
                    {rentType.name}
                  </Link>
                </div>
                <div className="opacity-50">
                  ({posts.filter((post) => post.rentType === rentType._id ).length})
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          
        </Card.Body>
      </Card>
    </div>
  )
}

export default TypesList;