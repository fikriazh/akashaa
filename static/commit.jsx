class LatestCommitComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      error: null
    };
  }

  componentDidMount() {
    fetch(
      "https://api.github.com/repos/fikriazh/akashaa/branches/main"
    )
      .then(response => {
        response.json().then(json => {
          console.log(json);
          if (json.commit) {
            this.setState({
              date: json.commit.commit.author.date
            });
          } else {
            this.setState({
              error: json.message
            });
          }
        });
      })
      .catch(error => {
        this.setState({
          error: error
        });
        console.log(error);
      });
  }

  render() {
    const html = this.state.error ? (
      <div id="error">{this.state.error}</div>
    ) : (
      <div>
        <div id="date">{this.state.date}</div>
      </div>
    );

    return <div>{html}</div>;
  }
}

ReactDOM.render(<LatestCommitComponent />, document.getElementById("root"));