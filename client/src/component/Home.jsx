import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Form,
  Navbar,
  FormControl,
} from "react-bootstrap";

import homebg from "../images/homebg.jpg";
import Cart from "./Cart";

const Home = () => {
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [productData, setProductData] = useState(null);
  const [showcart, setShowcart] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [content, setContent] = useState(false);

  // console.log(category + " " + sortBy);

  useEffect(() => {
    setContent(false);
    const url = `/api/gettingproducts?category=${category}`;

    const getProducts = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        if (response.status === 200) {
          setProductData(data.message);
          setContent(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [category]);

  const alphabeticalSort = (a, b) => {
    if (a.productName < b.productName) return -1;
    if (a.productName > b.productName) return 1;
    return 0;
  };
  const priceSort = (a, b) => {
    if (a.productPrice < b.productPrice) return -1;
    if (a.productPrice > b.productPrice) return 1;
    return 0;
  };
  const ratingSort = (a, b) => {
    if (a.rating < b.rating) return -1;
    if (a.rating > b.rating) return 1;
    return 0;
  };

  // const sortProduct = (value) => {
  //   console.log(value);
  //   if (value === "Price") {
  //     let newdata = productData.sort(priceSort);
  //     console.log(newdata);
  //     setProductData([...newdata]);
  //   } else if (value === "Rating") {
  //     let newdata = productData.sort(ratingSort);
  //     setProductData([...newdata]);
  //   } else if (value === "Alphabate") {
  //     let newdata = productData.sort(alphabeticalSort);
  //     setProductData([...newdata]);
  //   } else {
  //     return;
  //   }
  // };

  // console.log(sortBy);

  // console.log(productData);

  const saveToCart = (product) => {
    // console.log(product);

    let cartData = localStorage.getItem("cart");
    if (cartData) {
      cartData = JSON.parse(cartData);
      cartData.push({ ...product, quantity: product.quantity });
      localStorage.setItem("cart", JSON.stringify(cartData));
    } else {
      localStorage.setItem("cart", JSON.stringify([product]));
    }
    console.log(cartData);
  };

  useEffect(() => {
    if (searchTerm === null) {
      return;
    }
    if (searchTerm !== null || searchTerm !== "") {
      console.log(searchTerm);
      const url = `/api/search?searchterm=${searchTerm}`;
      const getProducts = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          // console.log(data);

          setProductData(data.message);
        } catch (error) {
          console.log(error);
        }
      };
      getProducts();
    }
  }, [searchTerm]);

  useEffect(() => {
    // console.log(sortBy);
    if (productData !== null) {
      if (sortBy === "Price") {
        let newdata = productData.sort(priceSort);

        // console.log(productData);
        setProductData([...newdata]);
      } else if (sortBy === "Rating") {
        let newdata = productData.sort(ratingSort); //rating
        setProductData([...newdata]);
      } else if (sortBy === "Alphabate") {
        let newdata = productData.sort(alphabeticalSort);
        setProductData([...newdata]);
      }
    }
    // eslint-disable-next-line
  }, [sortBy, category, content]);

  return (
    <>
      <Navbar bg="primary" expand="lg" className="px-5">
        <Container fluid>
          <Navbar.Brand href="/" className="text-light">
            Fruit Bazar
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex w-100 mx-5">
              <FormControl
                type="search"
                placeholder="Search fruit,cookies,etc..."
                className="me-2 w-100"
                aria-label="Search"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
              <Button variant="outline-light">Search</Button>
            </Form>
          </Navbar.Collapse>
          <div
            className="fs-5 text-light mx-5"
            style={{ cursor: "pointer" }}
            onClick={() => {
              showcart ? setShowcart(false) : setShowcart(true);
            }}
          >
            🛒Cart
          </div>
        </Container>
      </Navbar>
      {showcart ? <Cart /> : ""}

      <div
        style={{
          minHeight: "50vh",
          backgroundImage: `url(${homebg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="d-flex justify-content-center align-items-center flex-column"
      >
        <h1
          className="text-light  "
          style={{ fontSize: "100px", textShadow: "2px 2px 4px #ce3a18" }}
        >
          Are you hungry?
        </h1>
        <p
          className="text-dark fs-1"
          style={{ textShadow: "2px 2px 4px #ce3a18" }}
        >
          Buy some fresh and best product from us.
        </p>
      </div>
      <section>
        <Container>
          <div className="d-flex justify-content-between">
            <h1 className="text-primary d-flex align-items-center">
              Our Products
            </h1>
            <span className="d-flex align-items-center">
              <span className="m-2">
                <p>Category</p>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value="All">All</option>
                  <option value="Fruit">Fruit</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Cookies">Cookies</option>
                </Form.Select>
              </span>
              <span className="m-2">
                <p>Sort By</p>
                <Form.Select
                  size="sm"
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    // sortProduct(e.target.value);
                  }}
                >
                  <option value="">None</option>
                  <option value="Price">Price</option>
                  <option value="Alphabate">Alphabate</option>
                  <option value="Rating">Rating</option>
                </Form.Select>
              </span>
            </span>
          </div>
          <hr />
          <div className="d-flex flex-row flex-wrap justify-content-center">
            {productData && productData.length > 0
              ? productData.map((product) => {
                  return (
                    <Card
                      style={{ width: "18rem" }}
                      className="m-1"
                      key={product._id}
                    >
                      <Card.Img
                        variant="top"
                        src={product.productImage}
                        style={{
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                      <Card.Body className="d-flex flex-column justify-content-between ">
                        <Card.Title>{product.productName}</Card.Title>
                        <Card.Title className="fs-6">
                          Price :{product.productPrice}💲
                        </Card.Title>
                        <Card.Title className="fs-6">
                          Category : {product.catagory}
                        </Card.Title>
                        <Card.Text>{product.productDescription}</Card.Text>

                        <div className="popularity">
                          <div className="star">
                            <div
                              className="rating"
                              style={{ width: `${product.rating * 10}%` }}
                            >
                              <span>
                                &#x2605;&#x2605;&#x2605;&#x2605;&#x2605;
                              </span>
                            </div>
                          </div>
                        </div>

                        <Button
                          variant="primary"
                          onClick={() => {
                            saveToCart(product);
                          }}
                        >
                          Add to Cart
                        </Button>
                      </Card.Body>
                    </Card>
                  );
                })
              : "No Products Found"}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Home;
