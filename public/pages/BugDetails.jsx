import { bugService } from '../js/services/bug.service.js';

export class BugDetails extends React.Component {
  state = {
    bug: null,
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
      this.setState({ bug });
    });
  };

  render() {
    const { bug } = this.state;
    if (!bug) return <div>loading..</div>;
    console.log(this.state);
    console.log(bug);
    console.log(bug.creator);
    return (
      <div>
        <h1>bugDetails</h1>
        <h2>Title:{bug.title}</h2>
        <h2>Description:{bug.description}</h2>
        <h2>Severity:{bug.severity}</h2>
        <h2>NickName:{bug.creator.nickname}</h2>
        <h2>Id:{bug._id}</h2>
      </div>
    );
  }
}
