import React, { Component } from 'react'
//import { useState } from 'react'
import { Card, CardBody, CardImg, CardTitle, CardText, Row, Media, Col, Breadcrumb, BreadcrumbItem, Button, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { baseUrl } from '../Model/baseUrl';
 
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);



function RenderDish({ dish }) {
    return (
        <div className="col-12 col-md-5 m-1">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card >
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody >
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    )
}

function RenderComments({ comments }) {
    return (
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
    )
}




const DishDetail = (props) => {
    /* const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal); */
    var dish = props.dish;
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

    else if (dish != null) {
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
                <div className="row" >
                    <RenderDish dish={dish} />
                    <div className="col-12 col-md-5 m-1">
                        <h1>Comments</h1>
                        <Media list>
                            <RenderComments comments={props.comments} />

                        </Media>
                        <CommentForm dishId={props.dish.id} addComment={props.addComment} postComment={props.postComment} />
                    </div>
                </div>


            </div>
        )
    }
    else {
        return (<div></div>)
    }


}



export default DishDetail;




class CommentForm extends Component {


    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false
        };
        this.toggle = this.toggle.bind(this);
    }
    handleSubmit = (values) => {
        this.toggle();
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        // event.preventDefault();
    }

    toggle() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return (<div>
            <Button outline color="secondary" onClick={this.toggle} >
                <span className="fa fa-pencil "></span> Submit Comments</Button>
            <Modal isOpen={this.state.isModalOpen} >
                <ModalHeader toggle={this.toggle}>Submit Comments</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={2} >Rating</Label>
                            <Col md={11}>
                                <Control.text type="number" min="0" max="5" model=".rating" name="contactType"
                                    className="form-control">

                                </Control.text >
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author" md={4} >Your Name</Label>
                            <Col md={11}>
                                <Control.text model=".author" name="author"
                                    className="form-control"
                                    placeholder="Your Name"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={2}>Comment</Label>
                            <Col md={11}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="12"
                                    className="form-control" />
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Col md={11}>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>

                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
        );
    }

}
