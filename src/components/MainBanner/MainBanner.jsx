import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import Photo12 from "../../assets/Photo12.jpg";
import Photo13 from "../../assets/Photo13.jpg";
import Photo14 from "../../assets/Photo14.jpg";




function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}
export default function MainBanner() {
  return (
    <ImageList
      sx={{
        width: "auto",
        transform: "translateZ(0)",
      }}
    //   rowHeight={350}
      gap={1}
    >
      {itemData.map((item) => {
        const rows = item.featured ? 2 : 1;
        return (
          <ImageListItem
            key={item.img}
            cols={1}
            rows={rows}
            sx={{ overflow: "hidden", gridTemplateColumns: "2fr 1fr" }}
          >
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              style={{ objectFit: "cover" }}
            />
            <ImageListItemBar
              sx={{
                background: "transparent",
              }}
              title={item.title}
              position="bottom"
              actionIcon={
                <IconButton
                  sx={{ color: "red" }}
                  aria-label={`cart ${item.title}`}
                  size="large"
                >
                </IconButton>
              }
              actionPosition="right"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}

const itemData = [
  {
    img: Photo12,
    featured: true,
  },
  {
    img: Photo13,
  },
  {
    img: Photo14,
  },
];
