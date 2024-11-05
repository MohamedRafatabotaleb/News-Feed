import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StyledCard from "./StyledCard";

function NewsArticle(props) {
  const { image, title, description, author, publishedAt } = props;
  return (
    <StyledCard>
      <CardActionArea>
        {image && (
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt="Sample article"
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box p={2}>
        <Typography variant="caption" color="textSecondary" display="block">
          {author}
        </Typography>
        {publishedAt && (
          <Typography variant="caption" color="textSecondary">
            {new Date(publishedAt).toDateString()}
          </Typography>
        )}
      </Box>
    </StyledCard>
  );
}

export default NewsArticle;
