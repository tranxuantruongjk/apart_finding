import React, { useEffect, useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import FileBase64 from "react-file-base64";
import InputGroup from "react-bootstrap/InputGroup";
import { AuthContext } from "../../contexts/AuthContext";
import districtsList from "hanhchinhvn/dist/quan-huyen/01.json";
import axios from "axios";
import { apiUrl } from "../../contexts/constants";
import Button from "react-bootstrap/Button";
import AlertMessage from "../alertMessage/AlertMessage";
import { compare } from "../../utils/compare";

const Post = () => {
  const districts = Object.values(districtsList).sort(compare("code"));
  const [wards, setWards] = useState([]);
  const [rentTypes, setRentTypes] = useState([]);
  const [alert, setAlert] = useState(null);

  const {
    authState: { user },
  } = useContext(AuthContext);

  const onChangeDistrict = (e) => {
    // console.log(districtsList);
    console.log(e.target.value);
    const wardsList = require(`hanhchinhvn/dist/xa-phuong/${e.target.value}.json`);
    setWards(Object.values(wardsList));
  };

  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    rentType: "",
    address: "",
    wardId: "",
    area: "",
    price: "",
    image: "",
  });

  const { title, content, rentType, address, area, price, image } = postForm;

  const onChangePostForm = (e) => {
    setPostForm({
      ...postForm,
      [e.target.name]: e.target.value,
    });
    // console.log(postForm);
  };

  const onChangeWardId = (e) => {
    setPostForm({
      ...postForm,
      wardId: e.target.value,
    });
    // console.log(postForm);
  };

  useEffect(() => {
    const getRentTypes = async () => {
      const response = await axios.get(`${apiUrl}/post/rentTypes`);
      // console.log(response.data.rentTypes);
      setRentTypes(response.data.rentTypes);
    };

    getRentTypes();
  }, []);

  const create = async (e) => {
    e.preventDefault();
    // console.log(postForm);
    const createPost = async (postForm) => {
      try {
        const response = await axios.post(`${apiUrl}/post`, postForm);
        return response.data;
      } catch (error) {
        if (error.response.data) return error.response.data;
        else return { success: false, message: error.message };
      }
    };

    try {
      const postRes = await createPost(postForm);
      console.log(postRes);
      console.log(postRes.success);
      if (postRes.success) {
        // alert(postRes.message);
      } else {
        setAlert({ type: "danger", message: postRes.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="post__header mt-3 pb-2 mx-2 border-bottom">
        <h2>Đăng tin mới</h2>
      </div>
      <AlertMessage info={alert} />
      <Form className="my-3 mx-2" onSubmit={create}>
        <Row>
          <Col md={8}>
            <Card border="primary" className="shadow mb-3">
              <Card.Header className="text-bg-primary">
                <Row>
                  <h3>Địa chỉ cho thuê</h3>
                </Row>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Tỉnh/Thành phố</Form.Label>
                      <Form.Control disabled placeholder="Hà Nội" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Quận/Huyện</Form.Label>
                      <Form.Select onChange={onChangeDistrict}>
                        <option>--Quận/Huyện--</option>
                        {districts.map((district) => (
                          <option key={district.code} value={district.code}>
                            {district["name_with_type"]}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Phường/Xã</Form.Label>
                      <Form.Select name="wardId" onChange={onChangeWardId}>
                        <option>--Phường/Xã--</option>
                        {wards.map((ward) => (
                          <option key={ward.code} value={ward.code}>
                            {ward["name_with_type"]}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Form.Group>
                    <Form.Label>Số nhà, đường/phố</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={address}
                      onChange={onChangePostForm}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group>
                    <Form.Label>Địa chỉ chính xác</Form.Label>
                    <Form.Control disabled />
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>
            <Card border="primary" className="shadow mb-3">
              <Card.Header className="text-bg-primary">
                <Row>
                  <h3>Thông tin mô tả</h3>
                </Row>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Loại chuyên mục</Form.Label>
                      <Form.Select name="rentType" onChange={onChangePostForm}>
                        <option>--Chọn loại chuyên mục--</option>
                        {rentTypes.map((type) => (
                          <option key={type._id} value={type._id}>{type["name"]}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Form.Group>
                    <Form.Label>Tiêu đề</Form.Label>
                    <Form.Control
                      name="title"
                      value={title}
                      onChange={onChangePostForm}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group>
                    <Form.Label>Nội dung mô tả</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="content"
                      rows={3}
                      value={content}
                      onChange={onChangePostForm}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Thông tin liên hệ</Form.Label>
                      <Form.Control disabled placeholder={user.username} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Số điện thoại</Form.Label>
                      <Form.Control disabled placeholder={user.phone} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Giá cho thuê</Form.Label>
                    <InputGroup>
                      <Form.Control
                        name="price"
                        value={price}
                        onChange={onChangePostForm}
                      />
                      <InputGroup.Text>VND</InputGroup.Text>
                    </InputGroup>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Diện tích</Form.Label>
                      <InputGroup>
                        <Form.Control
                          name="area"
                          value={area}
                          onChange={onChangePostForm}
                        />
                        <InputGroup.Text>m2</InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Row>
              <h3>Hình ảnh</h3>
            </Row>
            <Row className="mb-2">
              <FileBase64
                accept="image/*"
                mutiple={false}
                type="file"
                name="image"
                value={image}
                onDone={({ base64 }) =>
                  setPostForm({ ...postForm, image: base64 })
                }
              />
            </Row>
            <Row>
              <Button variant="primary" type="submit" className="mx-2">
                Đăng bài
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Post;
