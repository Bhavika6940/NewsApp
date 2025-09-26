import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"

export class News extends Component {

  static defaulProps={
    country : 'us',
    pageSize : 5,
    category: "general"
  }
  static propTypes={
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string

  }

 capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
        super(props);
        console.log("Hello I'm a constructor from News component.")
        this.state = {
            articles: [],
            loading: false,
            page:1,
            totalResults : 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey` ;
    }
    async updateNews(){
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c10ed3ce279c4bdd80c02601d1d6cde5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading : true});
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({articles : parsedData.articles,
        totalResults : parsedData.totalResults,
        loading : false
      })
    }
    async componentDidMount(){ 
        this.updateNews();
    }
   handleNextClick =  async ()=>{
      this.setState({
        page : this.state.page+1
      })
      this.updateNews();


    }
    handlePrevClick = async () =>{
      this .setState({
        page : this.state.page-1
      })
      this.updateNews();

    }

    fetchMoreData = async () =>{
      this.setState({ page: this.state.page + 1 })
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c10ed3ce279c4bdd80c02601d1d6cde5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading : true});
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({articles : this.state.articles.concat(parsedData.articles),
        totalResults : parsedData.totalResults,
        loading : false
      })
    }

  render() {
    return (
      <>
        {/* {this.state.articles.map((element)=>{console.log(element)})} */}
         <h1 className="text-center" style={{margin : '35px 0px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>    
         {/* {this.state.loading && <Spinner/>}     */}
         {/* <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title:""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage ?element.urlToImage:"https://cdn.mos.cms.futurecdn.net/8gNBCQeAZuvimYgtALWNsA.jpg"} newsUrl={element.url} author={element.author? element.author: "Unknown"} date={new Date(element.publishedAt).toGMTString()} name={element.source.name}/>
            </div>
            })}
            </div> */}
            
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner/>}
              >
            <div className="container">
            <div className="row">
            {this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title:""} description={element.description?element.description.slice(0,88):""} 
                imageUrl={element.urlToImage ?element.urlToImage:"https://cdn.mos.cms.futurecdn.net/8gNBCQeAZuvimYgtALWNsA.jpg"} newsUrl={element.url} 
                author={element.author? element.author: "Unknown"} date={new Date(element.publishedAt).toGMTString()} name={element.source.name}/>
            </div>
            })}
            </div>
            </div>
            </InfiniteScroll>
            
           {/* <div className="d-flex justify-content-between">
                <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
             */}
                   
      </>
    )
  }
}

export default News
