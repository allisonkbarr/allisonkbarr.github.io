"use strict";

var Header = React.createClass({
  displayName: "Header",

  render: function render() {
    return React.createElement(
      "div",
      { className: "container-fluid" },
      React.createElement(
        "header",
        null,
        React.createElement(
          "div",
          { id: "flex-header" },
          React.createElement(
            "h1",
            null,
            "Simple Image Server"
          ),
          this.props.hasUser && React.createElement(
            "nav",
            null,
            React.createElement(
              "a",
              { href: "#", className: "active" },
              "Dashboard"
            ),
            React.createElement(
              "a",
              { href: "#" },
              "Documentation"
            )
          )
        ),
        this.props.hasUser ? React.createElement(
          "a",
          { className: "btn btn-sm", href: "javascript:;", onClick: actions.logOut },
          "Log out"
        ) : React.createElement(
          "a",
          { className: "btn btn-sm", href: "javascript:;", onClick: actions.logIn },
          "Log in"
        )
      )
    );
  }
});

var KeysHeader = React.createClass({
  displayName: "KeysHeader",

  render: function render() {
    return React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "div",
        { className: "col-xs-12" },
        React.createElement(
          "h3",
          null,
          "API Keys"
        ),
        React.createElement(
          "button",
          { className: "btn", id: "plus-btn" },
          React.createElement("i", { className: "fa fa-plus fa-sm" })
        )
      )
    );
  }
});

var KeysForm = React.createClass({
  displayName: "KeysForm",

  getInitialState: function getInitialState() {
    return { pendingName: "" };
  },

  updatePendingName: function updatePendingName(e) {
    this.setState({ pendingName: e.target.value });
  },

  createKey: function createKey(name) {
    var newKey = {
      name: name,
      code: "00000000000000"
    };
    actions.addKey(newKey);
  },

  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    this.createKey(this.state.pendingName);
    this.setState({ pendingName: "" });
  },

  render: function render() {
    return React.createElement(
      "form",
      { className: "highlight", onSubmit: this.handleSubmit },
      React.createElement(
        "label",
        { "for": "key-name" },
        "Key Name"
      ),
      React.createElement("input", { value: this.state.pendingName, onChange: this.updatePendingName, type: "text", id: "key-name", placeholder: "Name" }),
      React.createElement(
        "button",
        { className: "btn" },
        "Generate Key"
      )
    );
  }
});

var Key = React.createClass({
  displayName: "Key",

  getInitialState: function getInitialState() {
    return { isCodeVisible: false };
  },

  toggleCodeVisibility: function toggleCodeVisibility(e) {
    e.preventDefault();
    this.setState({ isCodeVisible: !this.state.isCodeVisible });
  },

  renderCode: function renderCode(code) {
    return this.state.isCodeVisible ? code : code.replace(/./g, "*");
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "row table-row" },
      React.createElement(
        "div",
        { className: "col-sm-2 col-xs-3 table-cols name-col" },
        this.props.data.name
      ),
      React.createElement(
        "div",
        { className: "col-sm-6 col-xs-9" },
        React.createElement(
          "div",
          { className: "key highlight" },
          React.createElement(
            "p",
            null,
            this.renderCode(this.props.data.code)
          ),
          React.createElement(
            "a",
            { onClick: this.toggleCodeVisibility, href: "#" },
            React.createElement("i", { className: "fa " + (this.state.isCodeVisible ? "fa-eye-slash" : "fa-eye") + " fa-md pull-right" })
          )
        )
      ),
      React.createElement(
        "div",
        { className: "col-sm-2 reqs table-cols" },
        React.createElement(
          "p",
          null,
          "20"
        )
      ),
      React.createElement(
        "div",
        { className: "col-sm-2 reqs table-cols" },
        React.createElement(
          "p",
          null,
          "539"
        )
      )
    );
  }
});

var Keys = React.createClass({
  displayName: "Keys",

  render: function render() {
    return React.createElement(
      "div",
      { className: "container", id: "keys-component" },
      React.createElement(
        "div",
        { className: "table" },
        React.createElement(KeysHeader, null),
        React.createElement(KeysForm, null),
        React.createElement(
          "div",
          { className: "row table-header" },
          React.createElement(
            "div",
            { className: "col-sm-2 col-xs-3 name-col name" },
            "Name"
          ),
          React.createElement(
            "div",
            { className: "col-sm-6 col-xs-9" },
            React.createElement(
              "p",
              null,
              "Key"
            )
          ),
          React.createElement(
            "div",
            { className: "col-sm-2 reqs" },
            React.createElement(
              "p",
              null,
              "Req's today"
            )
          ),
          React.createElement(
            "div",
            { className: "col-sm-2 reqs" },
            React.createElement(
              "p",
              null,
              "Req's this month"
            )
          )
        ),
        this.props.keys.map(function (key) {
          return React.createElement(Key, { key: key.code, data: key });
        })
      )
    );
  }
});

var Dashboard = React.createClass({
  displayName: "Dashboard",

  render: function render() {
    return React.createElement(
      "div",
      { id: "dashboard" },
      React.createElement(Keys, { keys: this.props.keys })
    );
  }
});

var Landing = React.createClass({
  displayName: "Landing",

  render: function render() {
    return React.createElement(
      "div",
      { id: "landing" },
      React.createElement(
        "div",
        { className: "jumbotron masthead" },
        React.createElement(
          "div",
          { className: "container" },
          React.createElement("i", { className: "fa fa-picture-o fa-xl", "aria-hidden": "true" }),
          React.createElement(
            "p",
            null,
            "An image server description blah blah blah"
          ),
          React.createElement(
            "button",
            { className: "btn btn-lg" },
            "Sign up with Google"
          )
        )
      ),
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "h3",
          null,
          "Features"
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-xs-4" },
            React.createElement("i", { className: "fa fa-picture-o fa-lg" }),
            " ",
            React.createElement("i", { className: "fa fa-picture-o fa-md" }),
            " ",
            React.createElement("i", { className: "fa fa-picture-o fa-sm" }),
            React.createElement(
              "h4",
              null,
              "Image Resizing"
            ),
            React.createElement(
              "p",
              null,
              "More info blah blah blah blah blah blah"
            )
          ),
          React.createElement(
            "div",
            { className: "col-xs-4" },
            React.createElement("i", { className: "fa fa-fighter-jet fa-lg" }),
            React.createElement(
              "h4",
              null,
              "Something else"
            ),
            React.createElement(
              "p",
              null,
              "More info blah blah blah blah blah blah"
            )
          ),
          React.createElement(
            "div",
            { className: "col-xs-4" },
            React.createElement("i", { className: "fa fa-simplybuilt fa-lg" }),
            React.createElement(
              "h4",
              null,
              "Another thing"
            ),
            React.createElement(
              "p",
              null,
              "More info blah blah blah blah blah blah"
            )
          )
        ),
        React.createElement(
          "h3",
          null,
          "Subscription Plans"
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-xs-6" },
            React.createElement(
              "h4",
              null,
              "Tier 1: Free"
            ),
            React.createElement(
              "p",
              null,
              "More info blah blah blah blah blah blah"
            )
          ),
          React.createElement(
            "div",
            { className: "col-xs-6" },
            React.createElement(
              "h4",
              null,
              "Coming Soon! Tier 2: Blah"
            ),
            React.createElement(
              "p",
              null,
              "More info blah blah blah blah blah blah"
            )
          )
        )
      )
    );
  }
});

// APP

var App = React.createClass({
  displayName: "App",

  render: function render() {
    return React.createElement(
      "div",
      { id: "app-component" },
      React.createElement(Header, { hasUser: this.props.user, page: this.props.view.loggedInPage }),
      this.props.user ? React.createElement(Dashboard, { keys: this.props.keys }) : React.createElement(Landing, null)
    );
  }
});

// IMPLEMENTATION

var actions = {
  logIn: function logIn() {
    var newState = Object.assign(state, { user: "dummy" });
    render(newState);
  },
  logOut: function logOut() {
    var newState = Object.assign(state, { user: "" });
    render(newState);
  },
  addKey: function addKey(newKey) {
    var newState = Object.assign(state, {
      keys: state.keys.concat([newKey])
    });
    render(newState);
  }
};

var state = {
  user: "ib",
  keys: [{ name: "Site1", code: "n29fn402nhlwpa" }, { name: "Site2", code: "2k4n6lwni3sl02" }],
  view: {
    loggedInPage: "dashboard"
  }
};

var render = function render(state) {
  React.render(React.createElement(App, state), document.getElementById("app"));
};

render(state);
//# sourceMappingURL=app.js.map