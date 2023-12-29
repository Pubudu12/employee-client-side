import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

interface Employee {
    // Define the structure of your employee entity
    id: number,
    first_name: string,
    last_name: string,
    phone_number: string,
    email: string,
    gender: string,
    photo: string
}


interface EmployeesState {
    entities: Employee[];
}
  
// Fetch Employees
export const fetchEmployees = createAsyncThunk('employees/getAllEmployees', async (thunkAPI) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}employee`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
        }
    );

    // console.log('inside fetch employees : ',response.data.data)
    return response.data.data;
});


// Add new employee
export const addEmployee = createAsyncThunk('employees/addEmployee', async (employeeData: any) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}employee`,
        employeeData,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
        }
    );

    return response.data.data;
});


// update an existing employee
export const updateEmployee = createAsyncThunk('employees/updateEmployee', async (employeeData: any) => {
    const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}employee/${employeeData.id}`,
        employeeData,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
        }
    );

    return response.data.data;
});


// Delete an existing employee
export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (employeeId: number) => {
    await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}employee/${employeeId}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
        }
    );

    return employeeId;
});


// Get single employee
export const fetchEmployee = createAsyncThunk('employee/fetchEmployee', async (employeeId: number) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}employee/${employeeId}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
    });

    return response.data.data;
});

// const initialState = {
//     entities: []
// } as any

const initialState: EmployeesState = {
    entities: [],
};

const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // builder.addCase(fetchEmployees.fulfilled, (state, action) => {
        //     // state.entities.push(...action.payload)
        //     state.entities = action.payload;
        // }),
        // builder.addCase(addEmployee.fulfilled, (state, action) => {
        //     state.entities.push(action.payload);
        // });
        builder
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.entities = action.payload;
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.entities.push(action.payload);
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.entities = state.entities.filter(employee => employee.id !== action.payload);
            })
            .addCase(fetchEmployee.fulfilled, (state, action) => {
                // Update the state with the fetched employee data
                state.entities = [action.payload];
                // You might want to handle loading and error states here as well
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                const updatedEmployee = action.payload;
                const index = state.entities.findIndex(employee => employee.id === updatedEmployee.id);
    
                if (index !== -1) {
                    state.entities[index] = updatedEmployee;
                }
            });
    },
})


export default employeeSlice.reducer