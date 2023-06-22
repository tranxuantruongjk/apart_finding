import React, { useEffect, useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

import { PostContext } from "../../contexts/PostContext";

import "./typesList.scss";

const TypesList = () => {
  const [types, setTypes] = useState([]);

  const { getPostsCountByType } = useContext(PostContext);

  useEffect(() => {
    const getTypes = async () => {
      const response = await getPostsCountByType();
      setTypes(response.rentTypes);
    };

    getTypes();
  }, []);

  return (
    <div className="types-list">
      {types && (
        <Card>
          <Card.Body>
            <Card.Title>Danh mục cho thuê</Card.Title>
            <ListGroup variant="flush">
              {types.map((rentType) => (
                <ListGroup.Item key={rentType._id}>
                  <div className="list-item">
                    <IoIosArrowForward className="list-item__icon" />
                    <Link to={`/${rentType._id}`} className="list-item__text">
                      {rentType.name}
                    </Link>
                  </div>
                  <div className="opacity-50">({rentType.postsCount})</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default TypesList;
