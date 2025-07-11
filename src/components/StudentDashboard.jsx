import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../redux/slices/studentsSlice';
import styles from '../styles/StudentDashboard.module.css';
import Chart from 'chart.js/auto';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const GridExample = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);
  const [selectedField, setSelectedField] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const rowData = useMemo(() => {
    if (!Array.isArray(students)) return [];
    return students.flat();
  }, [students]);

  const columnDefs = [
    { field: "id", headerName: "ID", sortable: true, filter: true },
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

  const onColumnHeaderClicked = (event) => {
    const field = event.column.getColDef().field;
    if (!field) return;

    // Count occurrences
    const counts = {};
    rowData.forEach((row) => {
      const value = row[field] || 'Unknown';
      counts[value] = (counts[value] || 0) + 1;
    });

    const labels = Object.keys(counts);
    const data = Object.values(counts);

    setSelectedField(field);
    setChartData({ labels, data });
    setShowChart(true);
  };

  useEffect(() => {
    if (showChart && chartData.labels?.length) {
      const ctx = document.getElementById("pieChart").getContext("2d");
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: chartData.labels,
          datasets: [
            {
              data: chartData.data,
              backgroundColor: [
                "#ff6384", "#36a2eb", "#cc65fe", "#ffce56", "#2ecc71", "#e67e22"
              ],
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: `Distribution of "${selectedField}"`,
              font: { size: 16 }
            },
          },
        },
      });
    }
  }, [showChart, chartData, selectedField]);

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
          onColumnHeaderClicked={onColumnHeaderClicked}
        />
      </div>

      {/* Modal for Pie Chart */}
      {showChart && (
        <div className={styles.modalOverlay} onClick={() => setShowChart(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <canvas id="pieChart" width="400" height="400"></canvas>
            <button className={styles.closeButton} onClick={() => setShowChart(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GridExample;
