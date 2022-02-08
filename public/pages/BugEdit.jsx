import { bugService } from '../js/services/bug.service.js';

export class BugEdit extends React.Component {
  state = {
    bug: {},
    nickname: '',
  };

  componentDidMount = () => {
    this.loadBug();
  };

  loadBug = () => {
    console.log('in load bug');
    console.log(this.props.match.params.bugId);
    const { bugId } = this.props.match.params;
    bugService.getById(bugId).then((bug) => {
      console.log(bug);
      this.setState({ bug, nickname: bug.creator.nickname });
    });
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    console.log(field, value);
    this.setState((prevState) => ({
      bug: { ...prevState.bug, [field]: value },
    }));
  };

  update = () => {
    const { bug } = this.state;
    bugService
      .addBug(bug)
      .then(() => {
        alert('you updated a bug ');
      })
      .catch((err) => {
        alert('you are not logged in or trying');
        console.log('you are not logged in', err);
      });
  };
  render() {
    const { bug, nickname } = this.state;

    return (
      <div>
        <form action=''>
          <input
            onChange={this.handleChange}
            value={bug.title}
            name='title'
            type='text'
          />
          <br />
          <input
            onChange={this.handleChange}
            value={bug.description}
            name='description'
            type='text'
          />
          <br />
          <input
            name='severity'
            value={bug.severity}
            onChange={this.handleChange}
            type='number'
          />
        </form>
        <br />
        <button onClick={this.update}>submit</button>
        <h1>bugDetails</h1>
        <h2>Title:{bug.title}</h2>
        <h2>Description:{bug.description}</h2>
        <h2>Severity:{bug.severity}</h2>
        <h2>NickName:{nickname}</h2>
        <h2>Id:{bug._id}</h2>
      </div>
    );
  }
}
