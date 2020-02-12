import React, { Component } from "react";
import axios from "axios";
require("purecss");

const api = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer ${process.env.GITHUB_TOKEN}`
  }
});

const QUERY = `
{
  organization(login: "sveltejs") {
    name
    url
    repository(name: "template") {
      name
      url
      issues(first: 100, orderBy: {direction: DESC, field: CREATED_AT}, states: [OPEN, CLOSED]) {
        nodes {
          title
          author {
            login
          }
          bodyText
          comments(first: 20) {
            nodes {
              author {
                login
              }
              bodyText
            }
          }
          state
        }
      }
      pullRequests(first: 10, orderBy: {field: CREATED_AT, direction: DESC}, states: OPEN) {
        nodes {
          author {
            login
          }
          createdAt
          bodyText
          number
        }
      }
    }
  }
}
`;

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      openIssues: [],
      closedIssues: [],
      pullRequests: []
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    api.post("", { query: QUERY }).then(res => {
      this.setState({
        openIssues: res.data.data.organization.repository.issues,
        pullRequests: res.data.data.organization.repository.pullRequests
      });
      console.log(res.data.data);
    });
  };

  render() {
    return (
      <div className="App">
        GRAPHQL GITHUB TRACKER
        <div className="pure-menu pure-menu-horizontal">
          <ul className="pure-menu-list">
            <li className="pure-menu-item">
              <a href="" className="pure-menu-link">
                OPEN ISSUES
              </a>
            </li>
            <li className="pure-menu-item">
              <a href="" className="pure-menu-link">
                CLOSED ISSUES
              </a>
            </li>
            <li className="pure-menu-item">
              <a href="" className="pure-menu-link">
                PULL REQUESTS
              </a>
            </li>
          </ul>
        </div>
        <form action="submit" className="pure-form search-form">
          <fieldset>
            <legend>Search for a repo using your token and a repo name.</legend>
            <input type="text" placeholder="Token" />
            <input type="text" placeholder="Repo path" />
            <button className="pure-button pure-button-primary" onClick={this.fetchData}>
              SUBMIT
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}
