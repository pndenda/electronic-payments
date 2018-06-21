import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      value: ""
    };
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
      if (students.includes(value)) {
        alert("User already exists");
      } else {
        students.push(value);
        this.setState({students: students});
      }

    }
  }

  removeStudent(student) {
    if (window.confirm("Are you sure you want to delete " + student)) {
      console.log("current student is " + student);
      let students = this.state.students;
      let index = students.indexOf(student);
      students.splice(index, 1);
      this.setState({students: students});
    }

  }

  render() {

    let students = this.state.students.map((student, index) => {
      return (<tr key={index}>
        <td>{student}</td>
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
