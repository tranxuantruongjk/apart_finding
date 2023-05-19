import React, { useEffect, useState, useContext, useRef } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import { apiUrl } from "../../../contexts/constants";
import Button from "react-bootstrap/Button";
import AlertMessage from "../../../components/alertMessage/AlertMessage";
import "./newPost.scss";
import { PostContext } from "../../../contexts/PostContext";
import FileUpload from "../../../components/fileUpload/FileUpload";
import FileList from "../../../components/fileUpload/fileList/FileList";
import { utilities } from "../../../utils/post";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

const province = "Hà Nội";

const NewPost = () => {
  const [rentTypes, setRentTypes] = useState([]);
  const [alert, setAlert] = useState(null);

  const [addressMap, setAddressMap] = useState(province);

  const [files, setFiles] = useState([]);
  const [utils, setUtils] = useState([]);
  const [location, setLocation] = useState([]);

  const [libraries] = useState(["places"]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: libraries,
  });

  const originRef = useRef();

  const {
    authState: { user },
  } = useContext(AuthContext);

  const { createPost } = useContext(PostContext);

  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    rentType: "",
    address: "",
    gender: "any",
    area: "",
    price: "",
  });

  const { title, content, rentType, address, gender, area, price } = postForm;

  const onChangePostForm = (e) => {
    setPostForm({
      ...postForm,
      [e.target.name]: e.target.value,
    });
  };

  const onClickUtil = (e, utilId) => {
    if (e.target.classList.value.includes("actived")) {
      e.target.classList.remove("actived");
      const newUtils = utils.filter((util) => util !== utilId);
      setUtils(newUtils);
    } else {
      e.target.classList.add("actived");
      setUtils((prev) => [...prev, utilId]);
    }
  };

  useEffect(() => {
    const getRentTypes = async () => {
      const response = await axios.get(`${apiUrl}/posts/rentTypes`);
      setRentTypes(response.data.rentTypes);
    };

    getRentTypes();
  }, []);

  const removeFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  const uploadHandler = (e) => {
    if (e.target.files.length === 0) return;
    else if (e.target.files.length === 1) {
      const file = e.target.files[0];
      if (files.find((f) => f.name === file.name)) return;
      file.preview = URL.createObjectURL(file);
      setFiles([...files, file]);
    } else {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];

        if (files.find((f) => f.name === file.name)) return;
        file.preview = URL.createObjectURL(file);
      }
      setFiles([...files, ...Object.values(e.target.files)]);
    }
    e.target.value = null;
  };

  const fn = () => {
    const place = originRef.current.value;
    if (place) {
      const getLatLngFromAddress = async () => {
        const result = await geocodeByAddress(place);
        const coords = await getLatLng(result[0]);

        setLocation([coords.lat, coords.lng]);
      };

      getLatLngFromAddress();
      setAddressMap(place);
      setPostForm({
        ...postForm,
        address: place,
      });
    }
  };

  const create = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("rentType", rentType);
      formData.append("address", address);
      formData.append("location", location);
      formData.append("gender", gender);
      formData.append("area", area);
      formData.append("price", price);
      formData.append("utils", utils);
      files.forEach((file) => formData.append("files", file));

      const postRes = await createPost(formData);
      if (postRes.success) {
        window.scrollTo(0, 0);
        setPostForm({
          title: "",
          content: "",
          rentType: "",
          address: "",
          gender: "any",
          area: "",
          price: "",
        });
        setFiles([]);
        setAlert({ type: "success", message: postRes.message });
        setTimeout(() => setAlert(null), 5000);
      } else {
        window.scrollTo(0, 0);
        setAlert({ type: "danger", message: postRes.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new-post">
      <div className="new-post__header mt-3 pb-2 mx-2 border-bottom">
        <h2>Đăng tin mới</h2>
      </div>
      <AlertMessage info={alert} />
      <Form
        className="new-post__body my-3 mx-2"
        onSubmit={create}
        encType="multipart/form-data"
      >
        <Row>
          <Col md={8} className="new-post__info">
            <Card className="shadow mb-3">
              <Card.Header>
                <Row>
                  <h3>Địa chỉ cho thuê</h3>
                </Row>
              </Card.Header>
              <Card.Body>
                <Row className="mb-2">
                  <Col md={6} lg={6}>
                    <Form.Group>
                      <Form.Label>
                        Tỉnh/Thành phố <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        disabled
                        placeholder="Hà Nội"
                        className="mt--5"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label>
                    Địa chỉ <span className="text-danger">*</span>
                  </Form.Label>
                  <Row className="mb-2 mt--5">
                    <Col md={9}>
                      {isLoaded && (
                        <Autocomplete>
                          <Form.Control
                            type="text"
                            name="address"
                            // value={address}
                            // onChange={onChangeAddress}
                            ref={originRef}
                          />
                        </Autocomplete>
                      )}
                    </Col>
                    <Col md={3}>
                      <Button onClick={fn} className="btn-submit-address">
                        Xác nhận
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Card.Body>
            </Card>
            <Card className="shadow mb-3">
              <Card.Header>
                <Row>
                  <h3>Thông tin mô tả</h3>
                </Row>
              </Card.Header>
              <Card.Body>
                <Row className="mb-2">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        Loại chuyên mục <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        name="rentType"
                        onChange={onChangePostForm}
                        className="mt--5"
                        value={rentType}
                      >
                        <option value="">--Chọn loại chuyên mục--</option>
                        {rentTypes.map((type) => (
                          <option key={type._id} value={type._id}>
                            {type["name"]}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Form.Group>
                    <Form.Label>
                      Tiêu đề <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="title"
                      value={title}
                      onChange={onChangePostForm}
                      className="mt--5"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-2">
                  <div>
                    Tiện ích <span className="text-danger">*</span>
                  </div>
                  <Row xs={2} md={2} lg={3}>
                    {utilities.map((util) => (
                      <Col key={util.title}>
                        <Button
                          variant="light"
                          className="btn-util"
                          onClick={(e) => onClickUtil(e, util.id)}
                        >
                          {util.icon}
                          <span className="title">{util.title}</span>
                        </Button>
                      </Col>
                    ))}
                  </Row>
                </Row>
                <Row className="mb-2">
                  <Form.Group>
                    <Form.Label>
                      Nội dung mô tả <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="content"
                      rows={3}
                      value={content}
                      onChange={onChangePostForm}
                      className="mt--5"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Form.Group>
                      <Form.Label>
                        Thông tin liên hệ <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        disabled
                        placeholder={user.username}
                        className="mt--5"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>
                        Số điện thoại <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        disabled
                        placeholder={user.phone}
                        className="mt--5"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        Đối tượng cho thuê{" "}
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        name="gender"
                        onChange={onChangePostForm}
                        className="mt--5"
                        value={gender}
                      >
                        <option value="any">-- Tất cả --</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Form.Label>
                      Giá cho thuê <span className="text-danger">*</span>
                    </Form.Label>
                    <InputGroup className="mt--5">
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
                      <Form.Label>
                        Diện tích <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup className="mt--5">
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
            <Row className="mb-2">
              <h3>Hình ảnh</h3>
            </Row>
            <Row className="mb-2">
              <FileUpload type="image" uploadHandler={uploadHandler} />
            </Row>
            <Row className="mb-2" md={4}>
              <FileList type="image" files={files} removeFile={removeFile} />
            </Row>
            <Row className="mb-2">
              <h3>Video</h3>
            </Row>
            <Row className="mb-2">
              <FileUpload type="video" uploadHandler={uploadHandler} />
            </Row>
            <Row className="mb-2" md={4}>
              <FileList type="video" files={files} removeFile={removeFile} />
            </Row>
            <Row className="me-1">
              <Button type="submit" className="mx-2 btn-create">
                Đăng bài
              </Button>
            </Row>
          </Col>
          <Col md={4}>
            <Row className="mb-3">
              <div id="maps" style={{ height: "300px", width: "100%" }}>
                <iframe
                  title="frame-new-post-address"
                  width="100%"
                  height="100%"
                  style={{ border: "0" }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY}&q=${addressMap}`}
                ></iframe>
              </div>
            </Row>
            <Card className="post-note">
              <Card.Header as="h5">Lưu ý khi đăng tin</Card.Header>
              <Card.Body>
                <ul className="post-note-list">
                  <li>
                    <Card.Text>
                      Thông tin có dấu sao{" "}
                      <span className="text-danger">*</span> là bắt buộc.
                    </Card.Text>
                  </li>
                  <li>
                    <Card.Text>
                      Đăng tin bằng tài khoản đăng ký để dễ dàng quản lý bài
                      đăng và được xét duyệt nhanh hơn.
                    </Card.Text>
                  </li>
                  <li>
                    <Card.Text>
                      Điền đầy đủ thông tin một cách chính xác để người xem dễ
                      tiếp cận và đưa ra quyết định giao dịch.
                    </Card.Text>
                  </li>
                  <li>
                    <Card.Text>
                      Nội dung Tiếng Việt có dấu và không viết tắt, mô tả đầy đủ
                      về phòng trọ/nhà trọ cho thuê.
                    </Card.Text>
                  </li>
                  <li>
                    <Card.Text>
                      Số điện thoại liên hệ phải ở tình trạng liên lạc được.
                    </Card.Text>
                  </li>
                  <li>
                    <Card.Text>
                      Các ảnh đại diện và ảnh chi tiết phải đúng là ảnh của
                      phòng trọ/nhà trọ, các tin vi phạm sẽ không được duyệt lên
                      website.
                    </Card.Text>
                  </li>
                  <li>
                    <Card.Text>
                      Không đăng tin trùng lặp dưới bất kỳ hình thức tin đăng
                      nào. Các tin trùng sẽ bị từ chối.
                    </Card.Text>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default NewPost;
