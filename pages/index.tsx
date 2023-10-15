import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import { data } from '@/__mocks__/dashboard/data';
import { DashboardItem } from '@/__mocks__/dashboard/types';
import Dashboard from '@/modules/Dashboard';

export const getStaticProps = (async () => {
  const dashboardData = data.items;
  return { props: { data: dashboardData } };
}) satisfies GetStaticProps<{
  data: DashboardItem[];
}>;

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <Dashboard {...props} />;
}
