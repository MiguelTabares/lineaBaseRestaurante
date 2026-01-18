export interface DailyReport {
    date: string;
    totalSales: number;
    totalOrders: number;
    averageTicket: number;
    topProducts: { name: string; quantity: number }[];
}
