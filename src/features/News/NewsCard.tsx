import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import demoImage from "../../assets/react.svg";
import { MdContentCopy } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import dayjs from "dayjs";
import { useToast } from "../../hooks/useToast";
import CustomizedSnackbar from "../../ui/SnackBar";

interface IProps {
  image: string;
  title: string;
  text: string;
  date: string;
  link: string;
}

export const NewsCard = ({ news }: { news: IProps }) => {
  const {
    openSnackbar,
    snackbarMessage,
    snackbarSeverity,
    setToast,
    closeToast,
  } = useToast();
  const { image, title, text, date, link } = news;
  return (
    <Card
      sx={{
        maxWidth: 345,
        marginY: "1.2rem",
        borderRadius: "1.25rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image={image || demoImage}
          alt={title}
        />
        <CardContent>
          <span className="text-xs">{dayjs(date).format("MMMM DD, YYYY")}</span>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ paddingBottom: "15px", paddingLeft: "15px" }}>
        <CopyToClipboard text={link}>
          <MdContentCopy
            className="cursor-pointer w-6 h-6 fill-secondary"
            onClick={() =>
              setToast(true, "Link copied to clipboard", "success")
            }
          />
        </CopyToClipboard>

        <a href={link} target="_blank">
          <FaLink className="cursor-pointer w-6 h-6 fill-secondary" />
        </a>
      </CardActions>
      <CustomizedSnackbar
        open={openSnackbar}
        close={!openSnackbar}
        message={snackbarMessage}
        handleClose={closeToast}
        severity={snackbarSeverity}
      />
    </Card>
  );
};
