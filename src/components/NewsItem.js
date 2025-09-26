import React, { Component } from 'react'

export class NewsItem extends Component {
    constructor(){
        super();
        console.log("Hello I'm a constructor.")
    }
  render() {
    let {title,description,imageUrl, newsUrl, author, date,name} = this.props;
    return (
      <div className="container my-3">
        <div className="card" style={{width: "18rem"}}>
        <img src={imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <h6><span className="badge text-bg-success">New</span></h6> 
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"  style={{left: '90%'}}>
             {name}
             </span>
           
            
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-secondary">By {author} on {date}</small></p>
            <a href={newsUrl} target= "_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
