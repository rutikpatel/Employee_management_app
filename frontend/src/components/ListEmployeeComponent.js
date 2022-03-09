import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import NavBar from './NavBar'

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(_id) {
        EmployeeService.deleteEmployee(_id).then(res => {
            // let input = prompt(`${this.state.employees.FirstName} Will be removed permanantly..(Yes or No)`);
            this.setState({ employees: this.state.employees.filter(employee => employee._id !== _id) });
        });
    }
    viewEmployee(_id) {
        this.props.history.push(`/view/${_id}`);
    }
    editEmployee(_id) {
        this.props.history.push(`/add/${_id}`);
    }

    componentDidMount() {
        const userid = localStorage.getItem('userid')
        EmployeeService.getEmployees(userid).then((res) => {
            console.log(userid)
            console.log(res.data)
            this.setState({ employees: res.data });
        });
    }


    addEmployee() {
        this.props.history.push('/add/_id');
    }

    render() {
        if (localStorage.getItem('userid') === null || localStorage.getItem('userid') === '' || localStorage.getItem('userid') === undefined) {
            this.props.history.push('/')
        }
        return (
            <>
                <div>
                    <NavBar />
                </div>
                <div>

                    <h2 className="text-center">Employees List</h2>
                    <div>
                        <button id="button" className="btn-primary " onClick={this.addEmployee}> Add Employee</button>
                    </div>
                    <br></br>
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Employee Name</th>
                                    <th> Employee Designation</th>
                                    <th> Employee Email Id</th>
                                    <th> Employee salary</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee =>
                                            <tr key={employee._id} >
                                                <td> {employee.EmployeeName} </td>
                                                <td> {employee.Designation}</td>
                                                <td> {employee.email}</td>
                                                <td> $ {employee.salary}</td>
                                                <td>
                                                    <button onClick={() => this.editEmployee(employee._id)} className="btn btn-warning">Update </button>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(employee._id)} className="btn btn-danger">Delete </button>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.viewEmployee(employee._id)} className="btn btn-info">View </button>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>

                    </div>

                </div>
            </>
        )
    }
}

export default ListEmployeeComponent
