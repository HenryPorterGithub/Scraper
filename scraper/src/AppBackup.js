import React, { Component } from 'react';


export default class App extends Component {

    static displayName = App.name;

    handleChange(event) {
        //Name of HTML input must exactly match corresponding SetState property name
        this.setState({ [event.target.name]: event.target.value });
        console.log("handleChange");
    }

    handleSubmit() {
        console.log("handleSubmit");
    }

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true, SearchQuery: 'Digital Conveyancing', KeyWord: 'InfoTrack', Engine: 'google', ResultCount: 100 };
        this.handleChange = this.handleChange.bind(this);
        this.scrape = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderForecastsTable(forecasts) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
            : App.renderForecastsTable(this.state.forecasts);

        return (
            <div>

                <h1 id="tabelLabel">Search Engine Scraper</h1>
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
                    Search Engine:
                    <select name="SearchEngine" value={this.state.Engine} onChange={this.handleChange}>
                        <option value="google">Google</option>
                        <option value="bing">Bing</option>
                    </select>
                </label>
                <br />
                <label>
                    Number of Search Results to Consider:
                    <input min="1" max="100" type="number" name="ResultCount" value={this.state.ResultCount} onChange={this.handleChange} />
                </label>
                <br />
                <input type="button" onClick={this.handleSubmit()} />

                <h1 id="tabelLabel">Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}


            </div>

        );
    }

    async populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }

    async populateScrapeData(Engine, SearchQuery, KeyWord, ResultCount) {
        const response = await fetch("ScrapeSearchEngine", {
            method: "get"
        })
        return response;
    }
}
