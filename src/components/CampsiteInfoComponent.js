import React, { Component } from "react";
import {Card, CardImg, CardBody, CardText, Breadcrumb, BreadcrumbItem, 
    Button, Modal,  Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import { Control, LocalForm, Errors } from "react-redux-form";

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >=len);

class CommentForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
      
    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
    }

    render() {
        return(
            <div>
                <Button color="primary"outline onClick={this.toggleModal} type="submit" value="submit">
                <i className="fa fa-pencil" aria-hidden="true"/>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>

                                <div className="formgroup">
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating"
                                    className="form-control">
                                        <option vaule="1">1</option>
                                        <option vaule="2">2</option>
                                        <option vaule="3">3</option>
                                        <option vaule="4">4</option>
                                        <option vaule="5">5</option>
                                    </Control.select>
                                    </div>
                        
                        <div className="formgroup">
                        <Label htmlFor="author">Name</Label>
                        
                        <Control.text model=".author" id="author" name="author"
                                    placeholder="Name"
                                    className="form-control"
                                    validators={{
                                         
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                        
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                    </div>
                                    
                                    <div className="formgroup">
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".text" id="text" name="text"
                                    rows="6"
                                    className="form-control"
                                    /> 
                                    </div>
                                <Button type="submit" color="primary">Submit</Button>
                             </LocalForm>        
                    </ModalBody>
                </Modal>
            </div>
                
        );
    }
}

function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({comments}) {
        if(comments) {  
            return(
                <div className="col-5-md m-1">
                    <h4> Comments </h4>
                    {comments.map(comment => {
                        return(
                            <div key={comment.id}>
                                <p>{comment.text}<br/><br />
                                --{comment.author}, {new Intl.DateTimeFormat('en-US', 
                                { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                </p>
                            </div>
                        )
                    })}
                    <CommentForm />
                </div>
            )
        }
        return <div />
    }



function CampsiteInfo(props) {
        if (props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                  <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                  <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            );
        }
        return <div />;
    }


export default CampsiteInfo ;