
var Header = React.createClass({

  render() {
    return (
      <div className="container-fluid">
        <header>
          <div id="flex-header">
            <h3>Simple Image Server</h3>
            { this.props.hasUser && <nav>
              <a href="#" className="active">Dashboard</a>
              <a href="#">Documentation</a>
            </nav> }
          </div>
          { this.props.hasUser ?
            <a className="btn btn-sm" href="javascript:;" onClick={actions.logOut}>Log out</a> :
            <a className="btn btn-sm" href="javascript:;" onClick={actions.logIn}>Log in</a>
          }
        </header>
      </div>
    )
  }
})

var KeysHeader = React.createClass({

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <h3>API Keys</h3>
          <button className="btn" id="plus-btn"><i className="fa fa-plus fa-sm"></i></button>
        </div>
      </div>
    )
  }
})

var KeysForm = React.createClass({

  getInitialState() {
    return { pendingName: '' }
  },

  updatePendingName(e) {
    this.setState({ pendingName: e.target.value })
  },

  createKey(name) {
    var newKey = {
      name: name,
      code: 'xxx'
    }
    actions.addKey(newKey)
  },

  handleSubmit(e) {
    e.preventDefault()
    this.createKey(this.state.pendingName)
    this.setState({ pendingName: '' })
  },

  render() {
    return (
      <form className="highlight" onSubmit={this.handleSubmit}>
        <label for="key-name">Key Name</label>
        <input value={this.state.pendingName} onChange={this.updatePendingName} type="text" id="key-name" placeholder="Name" />
        <button className="btn">Generate Key</button>
      </form>
    )
  }
})

var Key = React.createClass({

  getInitialState() {
    return { isCodeVisible: false }
  },

  toggleCodeVisibility(e) {
    e.preventDefault()
    this.setState({ isCodeVisible: !this.state.isCodeVisible })
  },

  renderCode(code) {
    return this.state.isCodeVisible ? code : code.replace(/./g, '*')
  },

  render() {
    return (
      <div className="row table-row">
        <div className="col-xs-2 table-cols">
          <p>{this.props.data.name}</p>
        </div>
        <div className="col-xs-6">
          <div className="key highlight">
            <p>{this.renderCode(this.props.data.code)}</p>
            <a onClick={this.toggleCodeVisibility} href="#">
              <i className={`fa ${this.state.isCodeVisible ? 'fa-eye-slash' : 'fa-eye'} fa-md pull-right`}></i>
            </a>
          </div>
        </div>
        <div className="col-xs-2 align-right table-cols">
          <p>20</p>
        </div>
        <div className="col-xs-2 align-right table-cols">
          <p>539</p>
        </div>
      </div>
    )
  }
})

var Keys = React.createClass({

  render() {
    return (
      <div className="container" id="keys-component">
        <div className="table">
          <KeysHeader />
          <KeysForm />
          <div className="row table-header">
            <div className="col-xs-2">
              <p>Name</p>
            </div>
            <div className="col-xs-6">
              <p>Key</p>
            </div>
            <div className="col-xs-2 align-right">
              <p>Req's today</p>
            </div>
            <div className="col-xs-2 align-right">
              <p>Req's this month</p>
            </div>
          </div>
          {this.props.keys.map(key => <Key key={key.code} data={key} />)}
        </div>
      </div>
    )
  }
})

var Dashboard = React.createClass({

  render() {
    return (
      <div id="dashboard">
        <Keys keys={this.props.keys}/>
      </div>
    )
  }
})

var Landing = React.createClass({

  render() {
    return (
      <div id="landing">
        <div className="jumbotron masthead">
          <div className="container">
            <i className="fa fa-picture-o fa-xl" aria-hidden="true"></i>
            <p>An image server description blah blah blah</p>
            <button className="btn btn-lg">Sign up with Google</button>
          </div>
        </div>
        <div className="container">
          <h3>Features</h3>
          <div className="row">
            <div className="col-xs-4">
              <i className="fa fa-picture-o fa-lg"></i> <i className="fa fa-picture-o fa-md"></i> <i className="fa fa-picture-o fa-sm"></i>
              <h4>Image Resizing</h4>
              <p>More info blah blah blah blah blah blah</p>
            </div>
            <div className="col-xs-4">
              <i className="fa fa-fighter-jet fa-lg"></i>
              <h4>Something else</h4>
              <p>More info blah blah blah blah blah blah</p>
            </div>
            <div className="col-xs-4">
              <i className="fa fa-simplybuilt fa-lg"></i>
              <h4>Another thing</h4>
              <p>More info blah blah blah blah blah blah</p>
            </div>
          </div>
          <h3>Subscription Plans</h3>
          <div className="row">
            <div className="col-xs-6">
              <h4>Tier 1: Free</h4>
              <p>More info blah blah blah blah blah blah</p>
            </div>
            <div className="col-xs-6">
              <h4>Coming Soon! Tier 2: Blah</h4>
              <p>More info blah blah blah blah blah blah</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
})



// APP


var App = React.createClass({

  render() {
    return (
      <div id="app-component">
        <Header hasUser={this.props.user} page={this.props.view.loggedInPage} />
        { this.props.user ? <Dashboard keys={this.props.keys}/> : <Landing /> }
      </div>
    )
  }
})




// IMPLEMENTATION


var actions = {
  logIn() {
    var newState = Object.assign(state, { user: 'dummy' })
    render(newState)
  },
  logOut() {
    var newState = Object.assign(state, { user: '' })
    render(newState)
  },
  addKey(newKey) {
    var newState = Object.assign(state, {
      keys: state.keys.concat([ newKey ])
    })
    render(newState)
  }
}

var state = {
  user: 'ib',
  keys: [{ name: 'blah', code: '01:0f:f4:3b:ca:85:d6:17' }, { name: 'blahblah', code: '0f:f4:3b:ca:85:d6:17' }],
  view: {
    loggedInPage: 'dashboard'
  }
}

var render = (state) => {
  React.render(<App {...state} />, document.getElementById('app'))
}

render(state)
