import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Analytics() {

    const breadcrumbLinks = [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Analytics", path: "/dashboard/analytics" },
      ];
    

  // Dummy Data for Chart
  const data = [
    { date: "2024-11-20", opens: 20 },
    { date: "2024-11-21", opens: 45 },
    { date: "2024-11-22", opens: 35 },
    { date: "2024-11-23", opens: 50 },
    { date: "2024-11-24", opens: 75 },
    { date: "2024-11-25", opens: 60 },
    { date: "2024-11-26", opens: 90 },
  ];

  // Dummy Data for Recipients Table
  const recipients = [
    { email: "john.doe@example.com", status: "Opened", opens: 3 },
    { email: "jane.smith@example.com", status: "Clicked", opens: 5 },
    { email: "sam.wilson@example.com", status: "Not Opened", opens: 0 },
    { email: "lisa.adams@example.com", status: "Opened", opens: 2 },
  ];

  return (
    <div>
      <Navbar />
      <Breadcrumb links={breadcrumbLinks} />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Analytics</h1>

        {/* Summary Cards */}
        <div className="row gy-4 mb-5">
          <div className="col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <h5>Total Opens</h5>
                <p className="display-6">375</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <h5>Unique Opens</h5>
                <p className="display-6">250</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <h5>Click-Through Rate (CTR)</h5>
                <p className="display-6">18%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-5">
          <h3 className="text-center mb-4">Opens Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="opens" stroke="#57cc99" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recipient Insights Table */}
        <div className="mb-5">
          <h3 className="text-center mb-4">Recipient Insights</h3>
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>Email</th>
                <th>Status</th>
                <th>Opens</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map((recipient, index) => (
                <tr key={index}>
                  <td>{recipient.email}</td>
                  <td>{recipient.status}</td>
                  <td>{recipient.opens}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Analytics;
