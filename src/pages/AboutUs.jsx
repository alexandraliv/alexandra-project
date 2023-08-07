import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Photo17 from "../assets/Photo17.jpg";
import Photo4 from "../assets/Photo4.jpg";
import Photo7 from "../assets/Photo7.jpg";
import Photo8 from "../assets/Photo8.jpg";
import Photo9 from "../assets/Photo9.jpg";
import Photo10 from "../assets/Photo10.jpg";

export default function AboutUs() {
  return (
    <Paper 
      sx={{
        boxShadow: "none",
        p: 2,
        margin: "auto",
        maxWidth: 1200,
        flexGrow: 1,
        marginTop: "110px",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}  className="aboutus" >
        <ImageList
          sx={{ width: 600, height: 650 }}
          variant="woven"
          cols={3}
          gap={8}
        >
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=161&fit=crop&auto=format`}
                srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div" className="about-text">
                O florarie e ca o casa – are locuitorii ei si o poveste proprie.
                Floraria noastra recreeaza atmosfera britanica a gradinilor
                multicolore, viu colorate, puse in evidenta de patina stilului
                boho-chic. Indiferent de anotimp, la mica noastra florarie veti
                gasi flori specifice, flori traditionale sau exotice, dar si
                soiuri deosebite importate din Olanda. Selectia de flori este
                atent realizata si coordonata de oamenii nostri, iar buchetele
                sunt personalizate pentru fiecare client in parte.
                <br />
                <br />
                Florile depasesc barierele emotionale pentru a exprima o
                varietate de stari, prin formele si culorile lor. Rolul lor este
                de a ne aminti celebrarea continua a vietii, prin imbogatirea
                oricarui spatiu prin culoarea si parfumul lor delicat. Sunt un
                semn al recunostintei.
                <br />
                <br />
                Suntem o florarie care realizeaza in atelierul propriu buchete
                de mireasa, buchete de nasa sau buchete pentru domnisoarele de
                onoare.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

const itemData = [
  {
    img: Photo17,
  },
  {
    img: Photo4,
  },
  {
    img: Photo7,
  },
  {
    img: Photo8,
  },
  {
    img: Photo9,
  },
  {
    img: Photo10,
  },
];
