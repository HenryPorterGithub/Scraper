import React, { Component } from 'react';

export default class App extends Component {

    static displayName = App.name;

    async populateScrapeData(Engine, SearchQuery, KeyWord, ResultCount) {
        //Because we are using a proxy we don't have to deal with CORS issues
        //We can discuss CORS in more detail in person, if possible

        /*const url = 'https://localhost:7036/Scrape/ScrapeSearchEngine'*/
        /*const url = 'Scrape/ScrapeSearchEngine?Engine=' + Engine + '&SearchQuery=' + SearchQuery + '&KeyWord=' + KeyWord + '&ResultCount=' + ResultCount;*/
        const url = 'Scrape/ScrapeSearchEngine';
        const response = await fetch(url, {
            method: "get",
            accept: "application/json; charset=utf-8",
            /*mode: 'no-cors',*/
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Engine': Engine,
                'SearchQuery': SearchQuery,
                'KeyWord': KeyWord,
                'ResultCount': ResultCount,
            },

        })
        const data = await response.text();

        if (data == -1) {
            //This happened to me xD
            document.getElementById('results').innerHTML = 'You have been banned from scraping that site, hopefully temporarily';
        }
        else {
            document.getElementById('results').innerHTML = data;
        }
    }

    handleChange(event) {
        //Name of HTML input must exactly match corresponding SetState property name
        this.setState({ [event.target.name]: event.target.value });
        console.log("handleChange");
    }

    handleSelect(event) {
        this.setState({ Engine: event.target.value });
        console.log("handleSelect");
    }

    handleScrape() {
        this.populateScrapeData(this.state.Engine, this.state.SearchQuery, this.state.KeyWord, this.state.ResultCount)
        console.log("handleScrape");
    }

    constructor(props) {
        super(props);
        this.state = { Engine: 'google', SearchQuery: 'Digital Conveyancing', KeyWord: 'InfoTrack', ResultCount: 100 };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleScrape = this.handleScrape.bind(this);
        this.populateScrapeData = this.populateScrapeData.bind(this);
    }

    render() {
        return (
            <div>
                <h1>Search Engine Scraper</h1>
                <label>
                    Search Engine:
                    <select name="SearchEngine" value={this.state.Engine} onChange={this.handleSelect}>
                        <option value="google">google</option>
                        {/*<option value="bing">bing</option>*/}
                    </select>
                </label>
                <br />
                <label>
                    Search Query:
                    <input type="text" name="SearchQuery" value={this.state.SearchQuery} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Keyword:
                    <input type="text" name="KeyWord" value={this.state.KeyWord} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Number of Search Results to Consider:
                    <input min="1" max="100" type="number" name="ResultCount" value={this.state.ResultCount} onChange={this.handleChange} />
                </label>
                <br />
                <button type="button" onClick={this.handleScrape}>Scrape</button>
                <br />
                <label>Keyword Hits: </label><label id="results"></label>
            </div>
        );
    }


}
