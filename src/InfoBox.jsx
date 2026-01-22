import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function InfoBox({ title, val, img, city }) {
  return (
    <div>
      <Card className="info-box-card" sx={{ maxWidth: "100%" }}>
        <CardMedia
          component="img"
          alt={title}
          height="140"
          image={img}
          className="info-box-media"
          sx={{ borderRadius: "16px 16px 0 0" }}
        />
        <CardContent className="info-box-content">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="info-box-title"
          >
            {title}
          </Typography>
          <Typography variant="body2" className="info-box-value">
            {val}
          </Typography>
          <Typography variant="caption" className="info-box-description">
            Current weather
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
 
