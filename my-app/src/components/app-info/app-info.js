import './app-info.css';

const AppInfo = ({ employees, increased }) => {
  return (
    <div className="app-info">
      <h1>Облік працівників в компанії N </h1>
      <h2>Загальна кількість працівників: {employees}</h2>
      <h2>Премію отримують: {increased}</h2>
    </div>
  );
};

export default AppInfo;
