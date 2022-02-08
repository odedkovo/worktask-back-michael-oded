import { bugService } from '../js/services/bug.service.js';
import { userService } from '../js/services/user.service.js';
import { BugDetails } from '../pages/BugDetails.jsx';
import { LoginPage } from '../pages/loginPage.jsx';
const { Link, Route, Switch } = ReactRouterDOM;

export class BugList extends React.Component {
  state = {
    bugs: [],
    user: null,
    add: {
      description: '',
      title: '',
      severity: 1,
    },
  };

  componentDidMount() {
    this.loadBugs();
  }
  loadBugs = () => {
    bugService.query().then((bugs) => {
    const user = userService.getLoggedinUser()
    this.setState({ bugs,user });
    });
  };

  verifyUser=()=> {
      const {nickname} = this.state.user;
      const currUser = userService.getLoggedinUser();
      return (currUser.nickname === nickname || currUser.isAdmin);
  }

  deleteBug = (bugId) => {
    bugService
      .removeBug(bugId)
      .then(() => {
        let { bugs } = this.state;
        bugs = bugs.filter((bug) => bug._id !== bugId);
        this.setState({ bugs });
      })
      .catch((err) => {
        console.log('User cannot delete bug that not his own bug', err);
      });
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = (!isNaN(+target.value)) ? parseInt(target.value) : target.value
    this.setState((prevState) => ({
      add: { ...prevState.add, [field]: value },
    }));
  };

  addBug = () => {
    const { add } = this.state;
    bugService
      .addBug(add)
      .then((savedBugId) => {
        add._id = savedBugId
        this.setState({
          bugs: [add, ...this.state.bugs],
          add: { description: '', title: '', severity: 1 },
        });
      })
      .catch((err) => {
        console.log('User must login to add Bug ', err);
      });
  };

  changeSeverity = (bug) => {
    let bugToUpdate = bug;
    if (bugToUpdate.severity === 3) bugToUpdate = { ...bug, severity: 0 };
    else bugToUpdate = { ...bug, severity: bug.severity + 1 };
    bugService
      .addBug(bugToUpdate)
      .then((updatedBug) => {
        this.setState({
          bugs: this.state.bugs.map((bug) =>
            updatedBug._id === bug._id ? updatedBug : bug
          ),
        });
      })
      .catch((err) => {
        console.log('user cannot update bug that is not his own', err);
      });
  };

  onLogOut = () => {
    userService.logOut().then(() => {
        this.setState({user : null});
        });
      };
    

  render() {
    const { bugs,user } = this.state;
    const { description, title, severity } = this.state.add;
    if (!bugs) return;
    return (
      <div>
         {(user) ? 
         <React.Fragment><h1>HELLO {user.username}</h1> <button onClick={this.onLogOut}>Log Out</button>
         </React.Fragment>
       : <Link to='/loginPage'> link to Login page</Link>}
        <table border='1'>
          <thead>
            <tr>
              <td>ID</td>
              <td>Title</td>
              <td>Severity</td>
              <td>Description</td>
              <td>Creator</td>
            </tr>
          </thead>
          <tbody>
            {bugs.map((bug, idx) => {
              return (
                <tr key={idx}>
                  <td>{bug._id} </td>
                  <td>{bug.title}</td>
                  <td>
                    <button
                      onClick={() => {
                        this.changeSeverity(bug);
                      }}
                    >
                      +
                    </button>
                    {bug.severity}
                  </td>
                  <td>{bug.description}</td>
                {(user && user.creator) && <td>{bug.creator.nickname}</td>}
                  <td>
                    <button
                      onClick={() => {
                        this.deleteBug(bug._id);
                      }}
                    >
                      X
                    </button>
                  </td>
                  <td>
                    <Link to={`/bug/details/${bug._id}`}>
                      <button>to bug details</button>
                    </Link>
                  </td>
                  <td>
               {user && this.verifyUser()  &&   <Link to={`/bug/edit/${bug._id}`}>
                      <button>Edit</button>
                    </Link>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <div>
          <form action=''>
            <label>
              Description:
              <input
                onChange={this.handleChange}
                value={description}
                name='description'
                type='text'
              />
            </label>
            <br />

            <label>
              Title:
              <input
                onChange={this.handleChange}
                value={title}
                name='title'
                type='text'
              />
            </label>
            <br />
            <label>
              Severity:
              <select type='number' onChange={this.handleChange} name='severity'>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
              </select>
            </label>
          </form>
          <br />
          <button onClick={this.addBug}>Add Bug</button>
        </div>
      </div>
    );
  }
}
