import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import NavBar from './NavBar'
class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.match.params.id,
            EmployeeName: '',
            Designation: '',
            email: '',
            salary: ''
        };
        // this.changeEmployeeNameHandle = this.changeEmployeeNameHandle.bind(this);
        // this.changeDesignationHandler = this.changeDesignationHandler.bind(this);
        // this.changeEmailHandler = this.changeEmailHandler.bind(this);
        // this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
        // this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    userid = localStorage.getItem('userid')
    componentDidMount() {

        if (this.state._id === '_id') {
            return
        } else {
            EmployeeService.getEmployeeById(this.state._id).then((res) => {
                let employee = res.data;
                this.setState({
                    EmployeeName: employee.EmployeeName,
                    Designation: employee.Designation,
                    email: employee.email,
                    salary: employee.salary
                });
            });
        }
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {
            EmployeeName: this.state.EmployeeName,
            Designation: this.state.Designation,
            email: this.state.email,
            salary: this.state.salary,
            addOrEditBy: this.userid
        };
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        if (this.state._id === '_id') {
            console.log("here")
            EmployeeService.createEmployee(employee).then(res => {
                this.props.history.push('/employees');
            });
        } else {
            EmployeeService.updateEmployee(employee, this.state._id).then(res => {
                this.props.history.push('/employees');
            });
            this.props.history.push('/employees');
        }
    }

    changeEmployeeNameHandler = (event) => {
        this.setState({ EmployeeName: event.target.value });
        event.preventDefault();
    }

    changeDesignationHandler = (event) => {
        this.setState({ Designation: event.target.value });
        event.preventDefault();
    }

    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value });
        event.preventDefault();
    }
    changeSalaryHandler = (event) => {
        this.setState({ salary: event.target.value });
        event.preventDefault();
    }

    cancel() {
        this.props.history.push('/employees');
    }

    getTitle() {
        if (this.state._id === '_id') {
            return <h2 className="text-center">Add Employee</h2>
        } else {
            return <h2 className="text-center">Update Employee</h2>
        }
    }

    render() {
        if (localStorage.getItem('userid') === null || localStorage.getItem('userid') === '' || localStorage.getItem('userid') === undefined) {
            this.props.history.push('/')
        }
        return (
            <div className="text-center">
                <NavBar />
                <br></br>
                <div className="container">
                    <div className="row">
                        <div id='div' className="col-md-6 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Employee Name: </label>
                                        <input placeholder="Employee Name" name="EmployeeName" className="form-control"
                                            value={this.state.EmployeeName} onChange={this.changeEmployeeNameHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> Designation: </label>
                                        <input placeholder="Designation" name="Designation" className="form-control"
                                            value={this.state.Designation} onChange={this.changeDesignationHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> Salary </label>
                                        <input placeholder="salary" name="salary" className="form-control"
                                            value={this.state.salary} onChange={this.changeSalaryHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> Email Id: </label>
                                        <input placeholder="Email Address" name="email" className="form-control"
                                            value={this.state.email} onChange={this.changeEmailHandler} />
                                    </div>
                                    <br />
                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
