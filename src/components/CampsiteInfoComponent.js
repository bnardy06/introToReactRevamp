import React, { Component } from "react";
import {Card, CardImg, CardBody, CardText, CardTitle} from 'reactstrap';

class CampsiteInfo extends Component {

    renderComments(comments) {
        if(comments) {  
            return(
                <div className="col-5-md m-1">
                    <h4> Comments </h4>
                    {this.props.campsite.comments.map(comment => {
                        return(
                            <div key={comment.id}>
                                <p>{comment.text}<br/><br />
                                --{comment.author}, {new Intl.DateTimeFormat('en-US', 
                                { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                </p>
                            </div>
                        )
                    })}
                </div>
            )
        }
        return <div />
    }

    renderCampsite(campsite) {
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
            
        )
    }

    render() {
        if (this.props.campsite) {
            return <div className="row">
                {this.state.renderCampsite(this.props.campsite)}
                {this.state.renderComments(this.props.campsite.comments)}
            </div>
        }
        return <div />
    }
}

export default CampsiteInfo ;