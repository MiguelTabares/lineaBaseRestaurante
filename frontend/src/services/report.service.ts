import type { DailyReport } from '../types/report';

const API_URL = 'http://localhost:4000/api/reports';

export const getDailyReport = async (): Promise<DailyReport> => {
    const response = await fetch(`${API_URL}/daily`);
    if (!response.ok) throw new Error('Error cargando reporte');
    return response.json();
};
