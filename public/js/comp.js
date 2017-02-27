
class Component extends React.Component {
  constructor() {
    super();
    var intervalId = setInterval(this.time.bind(this), 1000);
    this.state = {time: this.time()};
  };
  componentWillUnmount() {
   clearInterval(this.state.intervalId);
}
  time() {
    this.setState({time: new Date().toLocaleTimeString()});
  };
  render() {
    return
    (<span>{this.state.time}</span>);
  };
};
ReactDOM.render(
  <Component />,
  document.getElementById('s')
);
