import { Helmet } from 'react-helmet-async';

import { ReportView } from 'src/sections/report/view';

// ----------------------------------------------------------------------

export default function ReportPage() {
  return (
    <>
      <Helmet>
        <title> Quản lý báo cáo </title>
      </Helmet>

      <ReportView />
    </>
  );
}
