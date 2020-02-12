import React, { Component } from "react";
import axios from "axios";
require("purecss");
import Menu from "../Menu/Menu";
import Form from "../Form/Form";
import DataContext from "../../DataContext";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: {
        token: process.env.GITHUB_TOKEN,
        org: "sveltejs",
        repo: "template"
      },
      openIssues: [],
      closedIssues: [],
      pullRequests: [],
      handleChange: this.handleChange,
      fetchData: this.fetchData
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = e => {
    if (e !== undefined) {
      e.preventDefault();
    }

    const { token, org, repo } = this.state.inputValue;

    const api = axios.create({
      baseURL: "https://api.github.com/graphql",
      headers: {
        Authorization: `bearer ${token}`
      }
    });

    const fetchRepoData = (org, repo) => `
      {
        organization(login: "${org}") {
          name
          url
          repository(name: "${repo}") {
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

    api.post("", { query: fetchRepoData(org, repo) }).then(res => {
      this.sortIssues(res.data.data.organization.repository.issues.nodes);
      this.setState({
        pullRequests: res.data.data.organization.repository.pullRequests.nodes
      });
      console.log("REPO DATA:", res.data.data);
    });
  };

  sortIssues = issues => {
    const openIssues = [];
    const closedIssues = [];

    issues.forEach(issue => {
      issue.state === "OPEN"
        ? openIssues.push(issue)
        : closedIssues.push(issue);
    });

    this.setState({ openIssues, closedIssues });
  };

  handleChange = e => {
    const { inputValue } = { ...this.state };
    const inputValueCopy = inputValue;
    const { name, value } = e.target;
    inputValueCopy[name] = value;

    this.setState({ inputValue: inputValueCopy });
  };

  render() {
    return (
      <DataContext.Provider value={this.state}>
        <div className="app-wrapper">
          GRAPHQL GITHUB TRACKER
          <Menu />
          <Form />
        </div>
      </DataContext.Provider>
    );
  }
}
