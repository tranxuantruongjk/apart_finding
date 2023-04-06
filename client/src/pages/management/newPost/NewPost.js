import React, { useEffect, useState, useContext, useRef } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import { AuthContext } from "../../../contexts/AuthContext";
import districtsList from "hanhchinhvn/dist/quan-huyen/01.json";
import axios from "axios";
import { apiUrl } from "../../../contexts/constants";
import Button from "react-bootstrap/Button";
import AlertMessage from "../../../components/alertMessage/AlertMessage";
import { compare } from "../../../utils/compare";
import "./newPost.scss";
import { PostContext } from "../../../contexts/PostContext";
import FileUpload from "../../../components/fileUpload/FileUpload";
import FileList from "../../../components/fileUpload/fileList/FileList";

const province = "Hà Nội";
const NewPost = () => {
  const districts = Object.values(districtsList).sort(compare("code"));
  const [wards, setWards] = useState([]);
  const [rentTypes, setRentTypes] = useState([]);
  const [alert, setAlert] = useState(null);

  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [districtId, setDistrictId] = useState("");

  const [files, setFiles] = useState([]);
  const fullAddressRef = useRef(null);

  const {
    authState: { user },
  } = useContext(AuthContext);

  const { createPost } = useContext(PostContext);

  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    rentType: "",
    address: "",
    wardId: "",
    area: "",
    price: "",
  });

  const { title, content, rentType, address, wardId, area, price } =
    postForm;

  const onChangePostForm = (e) => {
    setPostForm({
      ...postForm,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeDistrict = (e) => {
    const districtName = districtsList[e.target.value]["name_with_type"];
    setDistrict(districtName);
    setDistrictId(e.target.value);
    // setFullAddress(`${districtName}, ${province}`);
    fullAddressRef.current.value = `${districtName}, ${province}`;
    const wardsList = require(`hanhchinhvn/dist/xa-phuong/${e.target.value}.json`);
    setWards(Object.values(wardsList));
  };

  const onChangeWardId = (e) => {
    const wardFind = wards.find((ward) => ward.code === e.target.value);
    const wardName = wardFind.name_with_type;
    setWard(wardName);
    // setFullAddress(`${wardName}, ${district}, ${province}`);
    fullAddressRef.current.value = `${wardName}, ${district}, ${province}`;
    setPostForm({
      ...postForm,
      wardId: e.target.value,
    });
  };

  const onChangeAddress = (e) => {
    setPostForm({
      ...postForm,
      address: e.target.value,
    });
    fullAddressRef.current.value = `${e.target.value}, ${ward}, ${district}, ${province}`;
  };

  useEffect(() => {
    const getRentTypes = async () => {
      const response = await axios.get(`${apiUrl}/post/rentTypes`);
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
    }
    else {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        
        if (files.find((f) => f.name === file.name)) return;
        file.preview = URL.createObjectURL(file);
      }
      setFiles([...files, ...Object.values(e.target.files)]);
    }
    e.target.value = null;
  };

  const create = async (e) => {
    
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("rentType", rentType);
      formData.append("address", address);
      formData.append("wardId", wardId);
      formData.append("area", area);
      formData.append("price", price);
      files.forEach(file => formData.append("image", file));

      const postRes = await createPost(formData);
      if (postRes.success) {
        window.scrollTo(0, 0);
        setPostForm({
          title: "",
          content: "",
          rentType: "",
          address: "",
          wardId: "",
          area: "",
          price: "",
        });
        setDistrictId("");
        fullAddressRef.current.value = "";
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
    <div>
      <div className="post__header mt-3 pb-2 mx-2 border-bottom">
        <h2>Đăng tin mới</h2>
      </div>
      <AlertMessage info={alert} />
      <Form
        className="my-3 mx-2"
        onSubmit={create}
        encType="multipart/form-data"
      >
        <Row>
          <Col md={8}>
            <Card border="primary" className="shadow mb-3">
              <Card.Header className="text-bg-primary">
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
                        onChange={onChangeWardId}
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
                  <Form.Group>
                    <Form.Label>
                      Số nhà, đường/phố <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={address}
                      onChange={onChangeAddress}
                      className="mt--5"
                    />
                  </Form.Group>
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
                      // value={fullAddress}
                      className="mt--5"
                    />
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
              <FileUpload uploadHandler={uploadHandler}/>
            </Row>
            <Row className="mb-2" md={4}>
              <FileList files={files} removeFile={removeFile} />
            </Row>
            <Row>
              <Button variant="primary" type="submit" className="mx-2">
                Đăng bài
              </Button>
            </Row>
          </Col>
          <Col md={4}>
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
