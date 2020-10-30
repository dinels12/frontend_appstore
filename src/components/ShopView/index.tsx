import React from "react";
import { useQuery, gql } from "@apollo/client";
import ProductContainer from "./components/ProductContainer";
import { useParams } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const GET_PUBLIC_SHOP = gql`
  query getPublic($nick: String!) {
    getPublicShop(nick: $nick) {
      products {
        _id
        title
        description
        price
        imageURL
      }
      company {
        name
        description
        location
      }
    }
  }
`;

const ShopView = () => {
  const { nick }: any = useParams();
  const { loading, error, data }: any = useQuery(GET_PUBLIC_SHOP, {
    variables: { nick: nick },
    pollInterval: 500,
  });

  if (loading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Container className='mt-5'>
        <Swiper spaceBetween={50} slidesPerView={3}>
          {data.getPublicShop
            ? data.getPublicShop.products.map((product: any) => (
                <SwiperSlide key={product._id}>
                  <ProductContainer product={product} />
                </SwiperSlide>
              ))
            : "Tienda no encontrada"}
        </Swiper>
      </Container>
    </>
  );
};
export default ShopView;
