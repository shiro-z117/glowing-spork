import { Employee } from "../types/Employee";

export async function fetchAllEmployees(): Promise<Employee[]> {
    const response = await fetch('https://6ab91fd2f84897980b7269b9.mockapi.io/users');
    if (!response.ok) {
        throw new Error('Failed to fetch employees');
    }
    return response.json();
}

export async function fetchEmployeeById(id: string): Promise<Employee> {
    const response = await fetch(`https://6ab91fd2f84897980b7269b9.mockapi.io/users/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch employee");
    }
    return response.json();
}

export async function fetchDepartments(): Promise<string[]> {
    const response = await fetch('https://6ab91fd2f84897980b7269b9.mockapi.io/users');
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    // there is no direct endpoint for listing "departments" so we instead have to create a list by picking out unique "department" values
    const employees: Employee[] = await response.json();
    const departments = new Set<string>();
    employees.forEach((employee) => {
        if (employee.department) {
            departments.add(employee.department);
        }
    });
    return Array.from(departments).sort();
}