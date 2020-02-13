import React, { useContext } from "react";
import DataContext from "../../DataContext";

const Form = () => {
  const context = useContext(DataContext);
  const fetchData = context.fetchData;
  const handleTextInput = context.handleTextInput;
  const token = context.inputValue.token;
  const org = context.inputValue.org;
  const repo = context.inputValue.repo;

  return (
    <div>
      <form action="" className="pure-form search-form">
        <fieldset>
          <legend>Search for a repo using your token and a repo name.</legend>
          <input type="text" placeholder="Token" name="token" onChange={e => handleTextInput(e)} />
          <input
            type="text"
            placeholder="Organization Name"
            onChange={e => handleTextInput(e)}
            name="org"
          />
          <input
            type="text"
            placeholder="Repo Name"
            onChange={e => handleTextInput(e)}
            name="repo"
          />
          <button
            className="pure-button pure-button-primary"
            onClick={e => fetchData(e)}
            disabled={!token || !org || !repo ? true : false}
          >
            SUBMIT
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Form;
