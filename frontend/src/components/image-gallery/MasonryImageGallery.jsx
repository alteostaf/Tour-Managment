import React from 'react'
import galleryImages from './galleryImages'
import Masonry ,{ResponsiveMasonry} from 'react-responsive-masonry'
import { Container,Row , Col } from 'reactstrap'
const MasonryImageGallery = () => {
  return (
    <>
 
    <section>
      <Container>
        <Row>
          <Col sm="12" md="12" lg="12" xl="12">
            <h1>Gallery from our costumers</h1>
          </Col>
        </Row>
      </Container>
    <ResponsiveMasonry columnsCountBreakPoints={{350:1, 768:3, 992:4}}>
      <Masonry gutter='1rem'>
        {galleryImages.map((image, index) => (
          <img 
          className='masonry__img'
          src={image}
          key={index}
          alt=''
          style={{width: "100%", display: "block", borderRadius: "10px"}} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
    </section>

   </>
  )
}

export default MasonryImageGallery;