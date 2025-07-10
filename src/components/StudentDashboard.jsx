import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../redux/slices/studentsSlice';
import styles from '../styles/StudentDashboard.module.css';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);


const GridExample = () => {
    // Row Data: The data to be displayed.
    const dispatch = useDispatch();
    const { students } = useSelector((state) => state.students);

    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);

    const rowData = useMemo(() => {
        if (!Array.isArray(students)) return [];
        return students.flat();
    }, [students]);


    const columnDefs = [
        { field: "id", headerName: "ID", sortable: true, filter: true, },
        { field: "caller_name", headerName: "Caller Name", filter: true },
        { field: "student_name", headerName: "Student Name", filter: true },
        { field: "action_taken", headerName: "Action Taken", filter: true },
        { field: "contact_phone_number", headerName: "Phone", filter: true },
        { field: "residence_area", headerName: "Location", filter: true },
        { field: "gender", filter: true },
        { field: "student_class_level", headerName: "Class", filter: true },
        { field: "contact_type", headerName: "Call Type", filter: true },
        { field: "interests", filter: true },
        { field: "how_you_heard", headerName: "How You Heard", filter: true },
        { field: "notes", filter: true },
        { field: "program", filter: true },
        { field: "interview_date", headerName: "Visit Date", filter: true },
        { field: "interview_time", headerName: "Visit Time", filter: true },
        { field: "student_grade", headerName: "Grade", filter: true },
        { field: "previous_school", filter: true },
        { field: "contact_officer", headerName: "Interviewer", filter: true },
        { field: "interview_location", headerName: "Visit Location", filter: true },
    ];
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Student Dashboard</h2>
            <div className={`ag-theme-alpine ${styles.gridWrapper}`}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    defaultColDef={{ sortable: true, filter: true, resizable: true }}
                />
            </div>
        </div>
    )
}

export default GridExample;