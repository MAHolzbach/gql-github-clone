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
          <legend>
            Search for a repo using your token, an organization name, and a repo name.
          </legend>
          <input
            className="form-item"
            type="text"
            placeholder="Token"
            name="token"
            onChange={e => handleTextInput(e)}
          />
          <input
            className="form-item"
            type="text"
            placeholder="Organization Name"
            onChange={e => handleTextInput(e)}
            name="org"
          />
          <input
            className="form-item"
            type="text"
            placeholder="Repo Name"
            onChange={e => handleTextInput(e)}
            name="repo"
          />
          <button
            className="pure-button pure-button-primary form-item"
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
