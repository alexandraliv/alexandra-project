import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../client";
import { useUserProvider } from "../../store/Context";

const getUrl = (source) => {
  const builder = imageUrlBuilder(client);
  return builder.image(source);
};

export default function ProductCard({ product }) {
  const { onAdd } = useUserProvider();
  return (
    <Card className="product-content" sx={{ maxWidth: 300, maxHeight: 300 }}>
      <img src={getUrl(product.image).width(200).url()} key={product.id} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Quantity: {product.quantity}
        </Typography>
        <button
          className="add-to-cart"
          onClick={() => onAdd(product)}
          disabled={product.quantity === 0}
        >
          Add to Cart
        </button>
      </CardContent>
    </Card>
  );
}
