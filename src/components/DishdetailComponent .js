import React, { Component } from 'react';
import {
    Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalBody, ModalHeader, Label, Row, Col
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
function RenderComments({ comments, postComment, dishId }) {
    if (comments != null) {
        return (
            <div className="col-md-5 col-12 m-1">
                <h4>Comments</h4>
                <p>
                    <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                    <li key={comment.id}>
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                                    </li>
                                </Fade>
                            );
                        })}
                    </Stagger>
                </p>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );
    }
    else return (<div></div>);
}
function RenderDish({ dish }) {
    if (dish != null) {
        return (

            <div className="col-md-5 col-12 m-1">
                <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        );
    }
    else return (<div></div>);
}

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.toggleComment = this.toggleComment.bind(this);
        this.submitComment = this.submitComment.bind(this);

        this.state = {
            isModalOpen: false,
        };
    }

    toggleComment() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    submitComment(values) {
        this.toggleComment();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);

    }
    render() {
        return (
            <div className="container">
                <Button outline onClick={this.toggleComment} >
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleComment}>
                    <ModalHeader toggle={this.toggleComment}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => { this.submitComment(values) }}>
                            <div className="container">
                                <Row className="form-group">
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" name="rating" id="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author" name="author" id="author"
                                        className="form-control" validators={{
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={
                                            {
                                                minLength: "Minimum length should be 3",
                                                maxLength: "Maximum length should be 15"
                                            }
                                        }
                                    />

                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" name="comment" id="comment"
                                        className="form-control" />

                                </Row>
                                <Button type="submit" value="submit" color="primary">Add Comment</Button>
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id}
                    />
                </div>
            </div>
        );
    }




}
export default DishDetail;