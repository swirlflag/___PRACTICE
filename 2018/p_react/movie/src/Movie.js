// eslint-disable-next-line
import React, { Component } from 'react';
// import LinesEllipsis {Component} from 'react';
import './Movie.css';

// class Movie extends Component{
//   render(){
//     return(
//       <div>
//         <MoviePoster poster={this.props.poster} alt={`movie '${this.props.title}' Poster`}/>
//         <h1>{this.props.title}</h1>
//       </div>
//     )
//   }
// }

// class MoviePoster extends Component{
//   render(){
//     return (
//       <img src={this.props.poster} alt={this.props.alt}/>
//     )
//   }
// }


function Movie({title,poster,genres,synopsis}){
  return (
    <div className="Movie">
      <div className="Movie__Columns">
        <MoviePoster poster={poster} alt={`movie '${title}' Poster`} />
      </div>
      <div className="Movie__Columns">
        <h1>{title}</h1>
        <div className="Movie__Genres">
          {genres.map((genre,index)=>{
            return <MovieGenre genre={genre} key={index} />
          })}
        </div>
        <p className="Movie__Synopsis">
          {/* <LinesEllipsis
            text='long long text'
            maxLine='3'
            ellipsis='...'
            trimRight
            basedOn='letters'
          />      */}
          {synopsis}
        </p>
      </div>
    </div>
  )
};
function MoviePoster({poster,alt}) {
  return (
    <img className="Movie__Poster" alt={alt} title={alt} src={poster}/>
  )
};

function MovieGenre({genre}){
  return (
    <span className="Movie__Genre">{genre}</span>
  )
};
// Movie.propTypes = {
//   title: PropTypes.string.isRequired,
//   poster: PropTypes.string.isRequired,
//   genres: PropTypes.array.isRequired,
//   synopsis: PropTypes.string.isRequired
// };

// MoviePoster.propTypes = {
//   poster : PropTypes.string.isRequired,
//   alt : PropTypes.string.isRequied
// };

// MovieGenre.propTypes = {
  // 
// }

export default Movie;
