import React, { useState, useContext, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../../../contexts/AuthContext";
import Button from "react-bootstrap/Button";
import AlertMessage from "../../../components/alertMessage/AlertMessage";
import "../newPost/newPost.scss";
import { PostContext } from "../../../contexts/PostContext";
import FileUpload from "../../../components/fileUpload/FileUpload";
import FileList from "../../../components/fileUpload/fileList/FileList";
import FileItem from "../../../components/fileUpload/fileList/FileItem";
import { utilities, fillDistrictCode, fillWardCode } from "../../../utils/post";

import districtsList from "hanhchinhvn/dist/quan-huyen/01.json";
import { compare } from "../../../utils/compare";
import { useLocation } from "react-router-dom";

const province = "Hà Nội";

const EditPost = () => {
  const { state } = useLocation();
  const [showLoading, setShowLoading] = useState(false);

  const {
    authState: { user },
    socket,
  } = useContext(AuthContext);

  const { rentTypes, updatePost, getAdminRole, sendNotification } =
    useContext(PostContext);

  const [postForm, setPostForm] = useState({
    title: state.title,
    content: state.content,
    rentType: state.rentType,
    districtId: fillDistrictCode(state.fullAddressObject.district.code),
    wardId: fillWardCode(state.fullAddressObject.ward.code),
    streetName: state.fullAddressObject.streetName,
    houseNumber: state.fullAddressObject.houseNumber
      ? state.fullAddressObject.houseNumber
      : state.fullAddressObject.houseName,
    gender: state.gender,
    area: state.area,
    price: state.price,
    capacity: state.capacity ? state.capacity : "",
  });

  const districts = Object.values(districtsList).sort(compare("code"));
  const wardsList = require(`hanhchinhvn/dist/xa-phuong/${fillDistrictCode(
    state.fullAddressObject.district.code
  )}.json`);
  const [wards, setWards] = useState(Object.values(wardsList));
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");
  const [streetName, setStreetName] = useState(
    state.fullAddressObject.streetName
  );
  const [houseNumber, setHouseNumber] = useState(
    state.fullAddressObject.houseNumber
      ? state.fullAddressObject.houseNumber
      : state.fullAddressObject.houseName
  );
  const fullAddressRef = useRef();

  useEffect(() => {
    const districtFind = districts.find(
      (district) =>
        district.code ===
        fillDistrictCode(state.fullAddressObject.district.code)
    );
    const wardFind = wards.find(
      (ward) => ward.code === fillWardCode(state.fullAddressObject.ward.code)
    );
    setDistrictName(districtFind.name);
    setWardName(wardFind.name);
  }, [state]);

  useEffect(() => {
    fullAddressRef.current.value = state.address;
  }, [state]);

  const [alert, setAlert] = useState(null);
  const [addressMap, setAddressMap] = useState(state.address);
  const [images, setImages] = useState(state.images);
  const [videos, setVideos] = useState(state.videos);
  const [files, setFiles] = useState([]);
  const [utils, setUtils] = useState(state.utils);
  useEffect(() => {
    const btnUtilsList = Object.values(
      document.getElementsByClassName("btn-util")
    );
    for (let btnUtil of btnUtilsList) {
      if (utils.find((util) => util === btnUtil.id)) {
        btnUtil.classList.add("actived");
      }
    }
  }, [state]);

  const {
    title,
    content,
    rentType,
    districtId,
    wardId,
    gender,
    area,
    price,
    capacity,
  } = postForm;

  const onChangePostForm = (e) => {
    setPostForm({
      ...postForm,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeDistrict = (e) => {
    const districtName = districtsList[e.target.value]["name"];
    const districtPath = districtsList[e.target.value]["path"];
    setDistrictName(districtName);
    setAddressMap(districtPath);
    fullAddressRef.current.value = districtPath;
    const wardsList = require(`hanhchinhvn/dist/xa-phuong/${e.target.value}.json`);
    setWards(Object.values(wardsList));
    setPostForm({
      ...postForm,
      districtId: e.target.value,
    });
  };

  const onChangeWard = (e) => {
    const wardFind = wards.find((ward) => ward.code === e.target.value);
    const wardName = wardFind.name;
    const wardPath = wardFind.path;
    setWardName(wardName);
    setAddressMap(wardPath);
    fullAddressRef.current.value = wardPath;
    setPostForm({
      ...postForm,
      wardId: e.target.value,
    });
  };

  const onChangeStreetName = (e) => {
    setPostForm({
      ...postForm,
      streetName: e.target.value,
    });
    setStreetName(e.target.value);
    fullAddressRef.current.value = `${e.target.value}, ${wardName}, ${districtName}, ${province}`;
  };

  const onChangeHouseNumber = (e) => {
    setPostForm({
      ...postForm,
      houseNumber: e.target.value,
    });
    setHouseNumber(e.target.value);
    fullAddressRef.current.value = `${e.target.value} ${streetName}, ${wardName}, ${districtName}, ${province}`;
  };

  const handleKeyUpStreetName = () => {
    setTimeout(
      () =>
        setAddressMap(
          `${streetName}, ${wardName}, ${districtName}, ${province}`
        ),
      5000
    );
  };

  const handleKeyUpHouseNumber = () => {
    setTimeout(
      () =>
        setAddressMap(
          `${houseNumber} ${streetName}, ${wardName}, ${districtName}, ${province}`
        ),
      5000
    );
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

  const removeFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  const removeImage = (filename) => {
    setImages(images.filter((image) => image !== filename));
  };

  const removeVideo = (filename) => {
    setVideos(videos.filter((video) => video !== filename));
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

  const hideShowLoading = () => {
    setShowLoading(false);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const update = async (e) => {
    e.preventDefault();
    setShowLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("rentType", rentType);
      formData.append("districtId", districtId);
      formData.append("wardId", wardId);
      formData.append("streetName", streetName);
      formData.append("houseNumber", houseNumber);
      formData.append("exactAddress", fullAddressRef.current.value);
      formData.append("gender", gender);
      formData.append("area", area);
      formData.append("price", price);
      formData.append("capacity", capacity);
      formData.append("utils", utils);
      formData.append("images", images);
      formData.append("videos", videos);
      files.forEach((file) => formData.append("files", file));

      const postRes = await updatePost(state._id, formData);
      if (postRes.success) {
        hideShowLoading();
        setAlert({ type: "success", message: postRes.message });
        setTimeout(() => setAlert(null), 5000);
        const admins = await getAdminRole();
        for (let admin of admins.admins) {
          try {
            const response = await sendNotification({
              receiverId: admin._id,
              postId: state._id,
              action: "update_post",
            });

            if (response.success) {
              socket.emit("sendNotification", {
                ...response.notification,
                user: user.username,
                title: title,
              });
            }
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        hideShowLoading();
        setAlert({ type: "danger", message: postRes.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    state && (
      <div className="container new-post">
        <div className="new-post__header mt-3 pb-2 mx-2 border-bottom">
          <h2>Chỉnh sửa tin đăng</h2>
        </div>
        <AlertMessage info={alert} />
        <Form
          className="new-post__body my-3 mx-2"
          onSubmit={update}
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
                    <Col>
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
                    <Col>
                      <Form.Group>
                        <Form.Label>
                          Quận/Huyện <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          name="districtId"
                          onChange={onChangeDistrict}
                          className="mt--5"
                          value={districtId}
                        >
                          <option value="">--Quận/Huyện--</option>
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
                        <Form.Label>
                          Phường/Xã <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          name="wardId"
                          onChange={onChangeWard}
                          className="mt--5"
                          value={wardId}
                        >
                          <option value="">--Phường/Xã--</option>
                          {wards.map((ward) => (
                            <option key={ward.code} value={ward.code}>
                              {ward["name_with_type"]}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Group>
                        <Form.Label>
                          Đường/Phố <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={streetName}
                          onChange={onChangeStreetName}
                          placeholder="Phố Lê Thanh Nghị hoặc Đường Giải Phóng"
                          className="mt--5"
                          onKeyUp={handleKeyUpStreetName}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>
                          Số nhà <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={houseNumber}
                          onChange={onChangeHouseNumber}
                          placeholder="42 hoặc Ngõ 12"
                          className="mt--5"
                          onKeyUp={handleKeyUpHouseNumber}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Form.Group>
                      <Form.Label>
                        Địa chỉ chính xác <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        ref={fullAddressRef}
                        disabled
                        type="text"
                        className="mt--5"
                      />
                    </Form.Group>
                  </Row>
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
                        placeholder="Tiêu đề đăng tin. Gợi ý: Loại phòng + Diện tích + Tên Đường/Phố"
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
                            id={util.id}
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
                        placeholder="Điền thêm các thông tin các cho bài đăng: nhà vệ sinh trong ngoài; giá điện, nước, wifi; trọ gần khu vực nào: trường học, chợ, bệnh viện,.. và một số thông tin khác..."
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Group>
                        <Form.Label>
                          Thông tin liên hệ{" "}
                          <span className="text-danger">*</span>
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
                    <Col>
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
                    <Col>
                      <Form.Label>
                        Sức chứa <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup className="mt--5">
                        <Form.Control
                          name="capacity"
                          value={capacity}
                          onChange={onChangePostForm}
                          placeholder="Điền số. VD: 2"
                        />
                        <InputGroup.Text>người/phòng</InputGroup.Text>
                      </InputGroup>
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
                          placeholder="Điền số. VD: 2000000"
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
                            placeholder="Điền số. VD: 20"
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
                {images &&
                  images.map((image) => (
                    <FileItem
                      type="image"
                      file={image}
                      removeFile={removeImage}
                    />
                  ))}
                <FileList type="image" files={files} removeFile={removeFile} />
              </Row>
              <Row className="mb-2">
                <h3>Video</h3>
              </Row>
              <Row className="mb-2">
                <FileUpload type="video" uploadHandler={uploadHandler} />
              </Row>
              <Row className="mb-2" md={4}>
                {videos &&
                  videos.map((video) => (
                    <FileItem
                      type="video"
                      file={video}
                      removeFile={removeVideo}
                    />
                  ))}
                <FileList type="video" files={files} removeFile={removeFile} />
              </Row>
              <Row className="me-1">
                <Button type="submit" className="mx-2 btn-create">
                  Cập nhật chỉnh sửa
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
                        Nội dung Tiếng Việt có dấu và không viết tắt, mô tả đầy
                        đủ về phòng trọ/nhà trọ cho thuê.
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
                        phòng trọ/nhà trọ, các tin vi phạm sẽ không được duyệt
                        lên website.
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
        <Modal
          show={showLoading}
          onHide={() => setShowLoading(false)}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Body className="d-flex justify-content-center">
            <Button
              variant="primary"
              disabled
              className="d-flex align-items-center"
            >
              <Spinner
                as="span"
                animation="border"
                role="status"
                aria-hidden="true"
              />
              <span className="ms-2">Đang xử lý...</span>
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    )
  );
};

export default EditPost;