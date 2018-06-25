import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      value: "",
      response: {}
    };
  }
  componentDidMount() {
    fetch("http://localhost:8080/students").then((response) => response.json()).then((json) => {
      this.setState({students: json});
    });
  }

  onChange = (event) => {
    event.preventDefault();
    let target = event.target;
    let value = target.value;
    this.setState({value: value});
  }

  onClick = (event) => {
    event.preventDefault();
    console.log("here");
    let value = this.state.value;
    console.log({value});
    if (value && value.length > 0) {
      console.log("here");
      let students = this.state.students;
      let filtered = students.filter(student => student.name === value);
      if (filtered && filtered.length > 0) {
        alert("User already exists");
      } else {
        //add to database;
        let url = `http://localhost:8080/students?name=${value}`;
        fetch(url, {method: "POST"}).then((response) => response.json()).then((json) => {
          console.log({json});
          this.setState({
            response: json
          }, () => fetch("http://localhost:8080/students").then((response) => response.json()).then((json) => {
            this.setState({students: json});
          }));
        });
      }

    }
  }

  removeStudent(student) {
    if (window.confirm("Are you sure you want to delete " + student.name)) {
      console.log("current student is " + student.name);
      let id = student.id;
      let url = `http://localhost:8080/students?id=${id}`;
      fetch(url, {method: "DELETE"}).then(response => response.json()).then(json => {
        this.setState({students: json});
      });
    }

  }

  render() {

    let students = this.state.students.map((student, index) => {
      let name = student.name;

      return (<tr key={index}>
        <td>{name}</td>
        <td>
          <a href="#" onClick={this.removeStudent.bind(this, student)}>
            <i>&times;</i>
          </a>
        </td>
      </tr>);
    });

    return (<div>
      <form>
        <input type="text" value={this.state.value} onChange={this.onChange}/>
        <button type="submit" onClick={this.onClick}>Add Student</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {students}
        </tbody>
      </table>
    </div>);
  }
}

export default App;
