import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllAlcohols, addToCart } from '../api/index';
import { 
    Card, 
    CardActions, 
    CardContent, 
    CardMedia, 
    Typography, 
    Button 
} from '@mui/material';

const Alcohols = ({alcohols, setAlcohols, user}) => {
    const history = useHistory();

    useEffect(() => {
        getAllAlcohols()
        .then((alcohols) => {
            setAlcohols(alcohols);
        })
        .catch(console.error);
    }, []);

    return (
        <div className="Alcohols">
            {alcohols.map((alcohol, index) => {
                return (
                    <div className="alcoholCard" key={index}>
                        <Card variant="outlined" sx={{margin: "10px", padding: "5px", width: "350px", height: "450px"}}>
                            <CardMedia
                                component="img"
                                src={alcohol.image}
                                alt="Product Image"
                                sx={{margin: "auto", width: "220px", height: "220px"}}
                            />
                            <CardContent>
                                <Typography variant="h5">
                                    {alcohol.name}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Type: {alcohol.type} / Price: ${alcohol.price}
                                </Typography>
                                <Typography variant="body1">
                                    {alcohol.description}
                                    {alcohol.inStock}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={async () => {
                                    await addToCart(user.user.id, alcohol.id);
                                    history.push("/cart");
                                }}>
                                    Add to Cart
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
}

export default Alcohols;