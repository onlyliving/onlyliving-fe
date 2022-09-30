import styled from 'styled-components';
import { IProduct } from '../utilities/apiFunc';
import { addComma } from "../utilities/index";

interface IProductItem {
  product: IProduct;
};

const ProductItem = ({ product: { id, name, thumbnail, price } }: IProductItem) => {
  return (
    <Container className="js-box">
      <Thumbnail data-lazy={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} alt="제품 이미지" />
      <Name>{name}</Name>
      <Price>{addComma(price.toString())}원</Price>
      <Link href={`/products/${id}`}>페이지 이동</Link>
    </Container>
  )
};

export default ProductItem;

const Container = styled.li`
  position:relative;
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
`;

const Thumbnail = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
`;

const Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.div`
  margin-top: 4px;
`;

const Link = styled.a`
  position:absolute;
  left:0;
  top: 0;
  right:0;
  bottom:0;
  text-indent: -9999px
`;
