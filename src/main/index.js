import React from "react";
import "./index.css";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime"
import {API_URL} from "../config/constants.js";
import { Carousel } from 'antd';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
dayjs.extend(relativeTime);//dayjs에서 확장된 기능 사용 

// 모바일슬라이드
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

function MainPage() {
  const [products, setProducts] = React.useState([]);// state형태
  const [banners, setBanners] = React.useState([]);
  React.useEffect(function () {
    axios
      // 상품관련
      .get(`${API_URL}/products`)
      .then(function (result) {
        const products = result.data.products;
        setProducts(products);
      })
      .catch(function (error) {
        console.error("에러 발생 : ", error);
      });
      // 배너관련
      axios.get(`${API_URL}/banners`).then((result)=>{
        const banners = result.data.banners;
        setBanners(banners);
      }).catch((error)=>{
        console.error("에러발생",error);
      })
  }, []);

  return (
    <div>
      {/* <div id="top_banner" >
        <img src="images/ji/1.jpg"/>
      </div> */}
    {/* 모바일배너 */}
    
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      navigation
      Autoplay
      pagination={{ clickable: false }}
      scrollbar={{ draggable: true }}
      loop={true} 
      autoplay={true}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {
        banners.map((banner,index) => {
          return(
            <SwiperSlide>
               <Link to={banner.href}>
                  <div id="banner">
                    <img src= {`${API_URL}/${banner.imageUrl}`} alt="" />
                  </div>
                </Link>
            </SwiperSlide>
          )
        })
      }
    </Swiper>
  
    {/*웹슬라이드배너*/}
    {/* <Carousel autoplay autoplaySpeed={2000}>
      {
        banners.map((banner,index) => {
          return(
            <Link to={banner.href}>
              <div id="banner">
                <img src= {`${API_URL}/${banner.imageUrl}`} alt="" />
              </div>
            </Link>
          )
        })
      }
    </Carousel> */}
      <h1 id="product-headline">NEW ARRIVALS</h1>
      <div id="product-list">
        {/* 상품리스트 */}
        {products.map(function (product, index) {
          return (
            <div className="product-card">
              {
                product.soldout === 1 && <div className="product-blur" />
              }
              <Link
                style={{ color: "inherit" }}
                className="product-link"
                to={`/products/${product.id}`}
              >
                <div>
                  <img className="product-img" src={`${API_URL}/${product.imageUrl}`} alt="" />
                </div>
                <div className="product-contents">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">{product.price}원</span>
                  <div className="product-footer">
                    <div className="product-seller">
                      <img
                        className="product-avatar"
                        src="images/icons/avatar.png" alt=""
                      />
                      <span>{product.seller}</span>
                    </div>
                    <span className="product-date">{dayjs(product.createdAt).fromNow()}</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;