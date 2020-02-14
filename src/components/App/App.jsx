import React, { Component } from "react";
import axios from "axios";
require("purecss");
import Menu from "../Menu/Menu";
import Form from "../Form/Form";
import ListItems from "../ListItems/ListItems";
import DataContext from "../../DataContext";
import Spinner from "../Spinner/Spinner";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: {
        token: process.env.GITHUB_TOKEN,
        org: "sveltejs",
        repo: "template"
      },
      displayedData: "sveltejs/template",
      openIssues: [],
      closedIssues: [],
      pullRequests: [],
      currentView: "openIssues",
      commentsToRender: [],
      renderSpinner: null,
      fetchError: false,
      handleTextInput: this.handleTextInput,
      fetchData: this.fetchData,
      handleNavClick: this.handleNavClick,
      handleItemClick: this.handleItemClick,
      clearCommentsToRender: this.clearCommentsToRender
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = e => {
    if (e !== undefined) {
      e.preventDefault();
    }

    this.setState({ renderSpinner: true, fetchError: false });

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
                comments(first: 50) {
                  nodes {
                    author {
                      login
                    }
                    bodyText
                  }
                }
                state
                number
                createdAt
                id
              }
            }
            pullRequests(first: 100, orderBy: {field: CREATED_AT, direction: DESC}, states: OPEN) {
              nodes {
                author {
                  login
                }
                createdAt
                bodyText
                number
                title
                id
                comments(first: 20) {
                  nodes {
                    author {
                      login
                    }
                    bodyText
                  }
                }
              }
            }
          }
        }
      }
    `;

    api
      .post("", { query: fetchRepoData(org, repo) })
      .then(res => {
        if (res.hasOwnProperty("errors")) {
          this.setState({ fetchError: true });
        }
        let allItems = res.data.data.organization.repository.issues.nodes.concat(
          res.data.data.organization.repository.pullRequests.nodes
        );
        this.sortIssues(res.data.data.organization.repository.issues.nodes);
        this.setState({
          allItems,
          pullRequests: res.data.data.organization.repository.pullRequests.nodes,
          displayedData: `${org}/${repo}`,
          renderSpinner: false
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({ fetchError: true, renderSpinner: false });
      });
  };

  sortIssues = issues => {
    const openIssues = [];
    const closedIssues = [];

    issues.forEach(issue => {
      issue.state === "OPEN" ? openIssues.push(issue) : closedIssues.push(issue);
    });

    this.setState({ openIssues, closedIssues });
  };

  handleTextInput = e => {
    const { inputValue } = { ...this.state };
    const inputValueCopy = inputValue;
    const { name, value } = e.target;
    inputValueCopy[name] = value;

    this.setState({ inputValue: inputValueCopy });
  };

  handleNavClick = e => {
    this.setState({ currentView: e.target.id, commentsToRender: [] });
  };

  handleItemClick = id => {
    const { allItems } = this.state;
    const commentsToRender = allItems.filter(item => item.id === id);
    this.setState({ commentsToRender });
  };

  clearCommentsToRender = () => {
    this.setState({ commentsToRender: [] });
  };

  renderContent = () => {
    if (this.state.fetchError) {
      return (
        <h3 className="error">
          Error. Possible solutions: Perhaps your token has a typo, or has the wrong permissions. Or
          that organization or repo does not exist.
        </h3>
      );
    }
    if (this.state.renderSpinner) {
      return <Spinner />;
    }
    return <ListItems />;
  };

  render() {
    return (
      <DataContext.Provider value={this.state}>
        <div className="app-wrapper">
          <h1>GRAPHQL GITHUB TRACKER</h1>
          <div>
            <Form />
            <Menu />
            {this.renderContent()}
          </div>
        </div>
      </DataContext.Provider>
    );
  }
}
