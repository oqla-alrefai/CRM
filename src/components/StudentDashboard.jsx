import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../redux/slices/studentsSlice';
import ChartModal from './ChartModal';
import styles from '../styles/StudentDashboard.module.css';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

// 🧠 Modal for selecting chart column and type
const ChartSelectorModal = ({ columns, onSelect, onClose }) => {
  const [selectedCol, setSelectedCol] = useState('');
  const [selectedChart, setSelectedChart] = useState('');

  const chartTypes = ['bar', 'pie', 'line'];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Select Column & Chart Type</h3>

        <div className={styles.selector}>
          <label>Column:</label>
          <select onChange={(e) => setSelectedCol(e.target.value)} value={selectedCol}>
            <option value="">-- Choose Column --</option>
            {columns.map((col) => (
              <option key={col.field} value={col.field}>
                {col.headerName || col.field}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.selector}>
          <label>Chart Type:</label>
          <select onChange={(e) => setSelectedChart(e.target.value)} value={selectedChart}>
            <option value="">-- Choose Chart Type --</option>
            {chartTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.modalButtons}>
          <button
            onClick={() => {
              if (selectedCol && selectedChart) {
                onSelect(selectedCol, selectedChart);
                onClose();
              }
            }}
          >
            Generate Chart
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const GridExample = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);

  const [selectedColumn, setSelectedColumn] = useState(null);
  const [chartType, setChartType] = useState(null);
  const [showChartSelector, setShowChartSelector] = useState(false);

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

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toLowerCase() === 'p') {
        setShowChartSelector(true);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

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

      {showChartSelector && (
        <ChartSelectorModal
          columns={columnDefs}
          onSelect={(col, type) => {
            setSelectedColumn(col);
            setChartType(type);
          }}
          onClose={() => setShowChartSelector(false)}
        />
      )}

      {selectedColumn && (
        <ChartModal
          field={selectedColumn}
          data={rowData}
          chartType={chartType}
          setChartType={setChartType}
          onClose={() => setSelectedColumn(null)}
        />
      )}
    </div>
  );
};

export default GridExample;
