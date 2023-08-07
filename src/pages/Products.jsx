import React, { useState, useEffect } from "react";
import { client } from "../client";
import imageUrlBuilder from "@sanity/image-url";
import ProductCard from "../components/ProductCard/ProductCard";
import { Box, Grid } from "@mui/material";;
import { useUserProvider } from "../store/Context";
import { Alert, Snackbar } from "@mui/material";

/**
 * @author
 * @function Products
 **/

async function getSanityData(id) {
  const productsQuery = '*[_type == "product"]';
  const products = await sanityClient.fetch(productsQuery);

  const productQuery = `*[_type == "product" && id.current == '${id}'][0]`;
  const product = await sanityClient.fetch(productQuery);

  return { products, product };
}

const getUrl = (source) => {
  const builder = imageUrlBuilder(client);
  return builder.image(source);
};

export const Products = (props) => {
  // const [products, setProducts] = useState([]);
  // const [index, setIndex] = useState(0);
  // const [loading, setLoading] = useState(false);
  // const { id } = useParams();
  const {
    decQty,
    incQty,
    qty,
    onAdd,
    products,
    isLoading,
    showAlert,
    setShowAlert,
  } = useUserProvider();
  const [isAlertOpened, setIsAlertOpened] = useState(false);

  if (isLoading) return <h3>Loading...</h3>;

  // const { name, image, description, price, quantity } = product;

  return (
    <Grid className="product-grid">
      <Box className="box-product" sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 1, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {products.map((product) => (
            <Grid item xs={4} sm={4} md={4} key={product.id}>
              <ProductCard
                product={product}
                // id={product.id}
                // name={product.name}
                // image={product.image}
                // description={product.description}
                // price={product.price}
                // quantity={product.quantity}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Snackbar
        open={showAlert}
        autoHideDuration={1000}
        onClose={() => setShowAlert(false)}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product has been added to cart
        </Alert>
      </Snackbar>
    </Grid>
  );
};
