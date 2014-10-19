module.exports = {

  componentDidMount: function() {
    window.addEventListener('popstate', this._onPopState);
  },

  componentWillUnmount: function() {
    window.removeEventListener('popstate', this._onPopState);
  },

  navigate: function(e) {
    if (e.target.tagName !== 'A' || !e.target.attributes.href) return;
    e.preventDefault();

    var path = e.target.attributes.href.value;
    window.history.pushState({}, '', path);
    this._navigateCallback(path);
  },

  _onPopState: function(e) {
    var path = window.location.pathname;

    if (this.state.path !== path) {
      this.setState({path: path});
      this._navigateCallback(path);
    }
  },

  _navigateCallback: function(path) {
    this.setProps({path: path});

    // Allow hooks after navigate
    if (typeof this.onNavigate === 'function')
      this.onNavigate(path);
  }

};