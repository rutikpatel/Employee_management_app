import axios from 'axios';

const API_URL = "/api/employees"; // added http://localhost:3000 to package.json as proxy to avoid cors errors

class EmployeeService {

    getEmployees(addOrEditBy) {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const result = axios.post(
            API_URL + '/list',
            {
                addOrEditBy
            },
            config
        )
        console.log(result)
        return result;
    }

    createEmployee(employee) {
        return axios.post(API_URL, employee);
    }

    getEmployeeById(employeeId) {
        return axios.get(API_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId) {
        return axios.put(API_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId) {
        return axios.delete(API_URL + '/' + employeeId);
    }
}

export default new EmployeeService()