import { useState } from 'react';

import { DashboardItem } from '@/__mocks__/dashboard/types';

const Dashboard = ({ data }: { data: DashboardItem[] }) => {
  const [dashboardData] = useState(data);
  return JSON.stringify(dashboardData);
};

export default Dashboard;
