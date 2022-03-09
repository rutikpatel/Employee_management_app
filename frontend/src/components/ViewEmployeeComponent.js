import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import NavBar from './NavBar'
class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    return() {
        this.props.history.push('/employees');
    }
    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then(res => {
            this.setState({ employee: res.data });
        })
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

                    <br></br>
                    <div className="card col-md-6 offset-md-3">
                        <h3 className="text-center"> {this.state.employee.EmployeeName}'s details</h3>
                        <div className="card-body">
                            <div className="row">
                                <label> Employee Employee Name: </label>
                                <div> &nbsp;<b>{this.state.employee.EmployeeName}</b></div>
                            </div>
                            <div className="row">
                                <label> Employee Designation: </label>
                                <div> &nbsp;<b>{this.state.employee.Designation}</b></div>
                            </div>
                            <div className="row">
                                <label> Employee Email ID: </label>
                                <div> &nbsp;<b> {this.state.employee.email}</b></div>
                            </div>
                            <div className="row">
                                <label> Employee salary: $</label>
                                <div> &nbsp;<b> {this.state.employee.salary}</b></div>
                            </div>
                        </div>

                        <div className="card-body text-center">
                            <button className='btn btn-dark' onClick={this.return.bind(this)}>Return</button>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}

export default ViewEmployeeComponent
