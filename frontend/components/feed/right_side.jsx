import React from 'react';
import { ScaleLoader } from 'react-spinners';
import _ from 'lodash';

const SOURCES = {
   "new-york-magazine": "New York Magazine",
   "espn": "ESPN",
   "usa-today": "USA Today",
   "buzzfeed": "Buzzfeed"
}

const style = {
  "New York Magazine": { right : '-87px' },
  "ESPN": { right : '18px' },
  "USA Today": { right : '30px' },
  "Buzzfeed": { right : '15px'} ,
  null: {},
}

class RightSide extends React.Component {
  constructor(props){
    super(props)
    this.state = {  source: 'usa-today',
                    loading: true,
                    openLabel: null };
    this.handleClick = this.handleClick.bind(this);
    this._showLabel = this._showLabel.bind(this);
    this._closeLabel = this._closeLabel.bind(this);
  }


  componentDidMount(){
    this.props.fetchTrends(this.state.source);
  }

  componentWillReceiveProps(newProps){
    this.setState( { loading: newProps.loading } )
  }

  handleClick(source){
    return () => {
      this.setState( { source, loading: true })
      this.props.fetchTrends(source);
    }
  }

  _showLabel(title){
    return () => this.setState( { openLabel: title })
  }

  _closeLabel(){
    this.setState( {openLabel: null })
  }

  render(){
    const { source } = this.state;
    const trendsList = this.props.trends.map( (trend,idx) => {
      return (
        <article key={idx}>
          <a href={trend.url} target="_blank">
            <i className="fa fa-bolt" aria-hidden="true"></i>
            <h3>{trend.title}</h3>
          </a>
        </article>
      )
    })
    return (
      <div className='main-right'>
        <div>
          To be implemented...
        </div>
        {this.state.loading ?
          <div className='loading'>
            <ScaleLoader color='#93949b'  />
          </div>
          :
          <div className='pos-rel'>
            <span>
              <h2>Trending</h2>
              <ul>
                <i onClick={this.handleClick("usa-today")}
                   className="fa fa-newspaper-o"
                   style={source === "usa-today" ? {color: "#5086fb"} : {}}
                   aria-hidden="true"
                   onMouseEnter={this._showLabel('USA Today')}
                   onMouseLeave={this._closeLabel}></i>
                <i onClick={this.handleClick("buzzfeed")}
                   className="fa fa-level-up"
                   style={source === "buzzfeed" ? {color: "#5086fb"} : {}}
                   aria-hidden="true"
                   onMouseEnter={this._showLabel('Buzzfeed')}
                   onMouseLeave={this._closeLabel}></i>
                <i onClick={this.handleClick("espn")}
                   className="fa fa-futbol-o"
                   style={source === "espn" ? {color: "#5086fb"} : {}}
                   aria-hidden="true"
                   onMouseEnter={this._showLabel('ESPN')}
                   onMouseLeave={this._closeLabel}></i>
                <i onClick={this.handleClick("new-york-magazine")}
                   className="fa fa-home"
                   style={source === "new-york-magazine" ? {color: "#5086fb"} : {}}
                   aria-hidden="true"
                   onMouseEnter={this._showLabel('New York Magazine')}
                   onMouseLeave={this._closeLabel}></i>
              </ul>
            </span>

            <h3>Powered by <a href='https://newsapi.org/'>NewsAPI.org</a></h3>
            <h2>{SOURCES[this.state.source]}</h2>
            {trendsList}
            {this.state.openLabel &&
              <aside style={style[this.state.openLabel]}>
                <h3>{this.state.openLabel}</h3>
              </aside>
            }
          </div>
        }
      </div>
    )
  }
}

export default RightSide;
