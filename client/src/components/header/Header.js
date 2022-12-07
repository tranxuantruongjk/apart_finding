import React from 'react'
import Container from 'react-bootstrap/Container';
import logo from '../../assets/images/apart_logo.svg';
import Button from 'react-bootstrap/Button';

const Header = () => {
  return (
    <Container className='d-flex justify-content-between'>
      <div className='header__logo'>
        <img src={logo} />
      </div>
      <div className='header__btn d-flex justify-content-between align-items-center'>
        <a href='/' className='me-4 btn__login'>
          Đăng nhập
        </a>
        <a href='/' className='me-4 btn__signup'>
          Đăng ký
        </a>
        <div className='btn__post'>
          <Button>Đăng tin mới</Button>
        </div>
      </div>
    </Container>
  )
}

export default Header;