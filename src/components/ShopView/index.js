import React from "react";
import { useQuery, gql } from "@apollo/client";
import ProductContainer from "./components/ProductContainer";
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

export default function ShopView(props) {
  const { loading, error, data } = useQuery(GET_PUBLIC_SHOP, {
    variables: { nick: props.match.params.id },
    pollInterval: 500,
  });

  if (loading) {
    return "Cargando...";
  }
  if (error) {
    return `Error: ${error.message}`;
  }

  return (
    <Container className='mt-5'>
      <Swiper spaceBetween={50} slidesPerView={3}>
        {data.getPublicShop
          ? data.getPublicShop.products.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductContainer product={product} />
              </SwiperSlide>
            ))
          : "Tienda no encontrada"}
      </Swiper>
    </Container>
  );
}
