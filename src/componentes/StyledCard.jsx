import Card from "@mui/material/Card";

import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

export default StyledCard;
