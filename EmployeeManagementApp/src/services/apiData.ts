import { Employee } from "../types/Employee";

const BASE_URL = "https://6ab91fd2f84897980b7269b9.mockapi.io/users";

export async function fetchAllEmployees(): Promise<Employee[]> {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch employees');
    }
    return response.json();
}

export async function fetchEmployeeById(id: string): Promise<Employee> {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch employee");
    }
    return response.json();
}

export async function fetchDepartments(): Promise<string[]> {
    const response = await fetch(BASE_URL);
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

export async function createEmployee(data: Omit<Employee, "id">): Promise<Employee> {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error("Failed to create employee");
    }
    return response.json();
}

export async function updateEmployee(id: string, data: Omit<Employee, "id">): Promise<Employee> {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error("Failed to update employee");
    }
    return response.json();
}

export async function deleteEmployee(id: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete employee");
    }
}