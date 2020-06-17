import React from 'react';
import { Card, CardImg, CardImgOverlay, CardBody, CardText, CardTitle } from 'reactstrap';



function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <div className="row">
                <div className="col-md-5 col-12 m-1">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle >{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-md-5 col-12 m-1">
                    <h4>Comments</h4>
                    <p>
                        {dish.comments.map((comment) => {
                            return (
                                <div key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author}, {new Intl.DateTimeFormat(
                                        'en-US',
                                        {
                                            year: 'numeric',
                                            month: 'short',
                                            day: '2-digit'
                                        }).format(new Date(Date.parse(comment.date)))}</p>
                                </div>
                            );
                        })}
                    </p>


                </div>
            </div>

        );
    }
    else return (<div></div>);
}

const DishDetail = (props) => {


    return (
        <div className="container">
            <RenderDish dish={props.dish} />
        </div>
    );
}




export default DishDetail;