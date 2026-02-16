import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
export default function MetricsCards({ metrics }) {
  return (
    // <div className="cards">
    //   <div>Avg Price: ${metrics.average_price}</div>
    //   <div>Volatility: {metrics.volatility}</div>
    // </div>
    <Card key={metrics.id} sx={{ maxWidth: 345, margin: "16px" }}>
      <CardActionArea>
        <CardContent sx={{ height: "100%" }}>
          <Typography variant="h5" component="div">
            Price: {metrics.average_price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Volatility:{metrics.volatility}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
