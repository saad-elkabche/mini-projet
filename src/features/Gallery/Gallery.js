import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Gallery.css";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
} from "react-bootstrap";

const API_KEY = "50084187-1439022054e79117f5695034c";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");

  const fetchImages = async (searchTerm = "") => {
    try {
      const res = await axios.get("https://pixabay.com/api/", {
        params: {
          key: API_KEY,
          q: searchTerm || "",
          image_type: "photo",
          per_page: 12,
        },
      });
      setImages(res.data.hits);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages(); // Load initial images
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchImages(query);
  };

  return (
    <Container className="py-5">
      <Form onSubmit={handleSearch} className="mb-5">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="🔍 Search high-quality images..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-start"
          />
          <Button variant="dark" type="submit" className="rounded-end">
            Search
          </Button>
        </InputGroup>
      </Form>

      <Row>
        {images.map((image) => (
          <Col sm={6} md={4} lg={3} className="mb-4" key={image.id}>
            <Card className="image-card h-100 shadow-sm border-0">
              <div className="image-container">
                <Card.Img
                  variant="top"
                  src={image.webformatURL}
                  alt={image.tags}
                  className="img-hover"
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Text className="text-muted small mb-2">
                  <span className="d-block text-truncate">{image.tags}</span>
                  <small>
                    {image.imageWidth} × {image.imageHeight}
                  </small>
                </Card.Text>
                <Button
                  variant="outline-primary"
                  href={image.pageURL}
                  target="_blank"
                  className="mt-auto"
                >
                  More Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Gallery;
