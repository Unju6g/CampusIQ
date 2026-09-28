import React, { useState } from "react";
import "./Companies.css";

function Companies() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [industryFilter, setIndustryFilter] = useState("All Industries");

  const companies = [
    {
      name: "TechNova Solutions",
      industry: "Software / IT",
      drives: 3,
      package: "₹8.5 LPA",
      status: "Active",
    },
    {
      name: "DataSphere Technologies",
      industry: "Data / AI",
      drives: 2,
      package: "₹7.2 LPA",
      status: "Active",
    },
    {
      name: "CloudCore Systems",
      industry: "Cloud Computing",
      drives: 1,
      package: "₹6.8 LPA",
      status: "Upcoming",
    },
    {
      name: "Infosys",
      industry: "IT Services",
      drives: 4,
      package: "₹6.5 LPA",
      status: "Active",
    },
  ];

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" ||
      company.status === statusFilter;

    const matchesIndustry =
      industryFilter === "All Industries" ||
      company.industry === industryFilter;

    return matchesSearch && matchesStatus && matchesIndustry;
  });

  return (
    <div className="companies-page">

      {/* ================= HEADER ================= */}
      <div className="companies-header">

        <div className="companies-heading">
          <span className="page-label">TPO / ADMIN PORTAL</span>

          <h1>Companies</h1>

          <p>
            Manage recruiting companies and placement partners.
          </p>
        </div>

        <button className="add-company-btn">
          <span>+</span>
          Add Company
        </button>

      </div>


      {/* ================= MAIN CARD ================= */}
      <section className="companies-card">

        {/* CARD HEADER */}
        <div className="companies-card-header">

          <div>
            <h2>Registered Companies</h2>

            <p>
              Companies participating in campus placements.
            </p>
          </div>

        </div>


        {/* ================= FILTERS ================= */}
        <div className="company-filters">

          {/* SEARCH */}
          <div className="search-wrapper">

            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>


          {/* STATUS */}
          <div className="select-wrapper">

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Upcoming</option>
            </select>

          </div>


          {/* INDUSTRY */}
          <div className="select-wrapper">

            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
            >
              <option>All Industries</option>
              <option>Software / IT</option>
              <option>Data / AI</option>
              <option>Cloud Computing</option>
              <option>IT Services</option>
            </select>

          </div>

        </div>


        {/* ================= TABLE ================= */}
        <div className="companies-table-container">

          <table className="companies-table">

            <thead>
              <tr>
                <th className="company-column">COMPANY</th>
                <th>INDUSTRY</th>
                <th className="number-column">DRIVES</th>
                <th className="package-column">
                  HIGHEST PACKAGE
                </th>
                <th className="status-column">STATUS</th>
                <th className="action-column">ACTION</th>
              </tr>
            </thead>


            <tbody>

              {filteredCompanies.length > 0 ? (

                filteredCompanies.map((company, index) => (

                  <tr key={index}>

                    {/* COMPANY */}
                    <td className="company-column">

                      <div className="company-info">

                        <div className="company-avatar">
                          {company.name.charAt(0)}
                        </div>

                        <div className="company-name">
                          <strong>{company.name}</strong>
                        </div>

                      </div>

                    </td>


                    {/* INDUSTRY */}
                    <td className="industry-text">
                      {company.industry}
                    </td>


                    {/* DRIVES */}
                    <td className="number-column">
                      <strong>{company.drives}</strong>
                    </td>


                    {/* PACKAGE */}
                    <td className="package-column">

                      <strong>
                        {company.package}
                      </strong>

                    </td>


                    {/* STATUS */}
                    <td className="status-column">

                      <span
                        className={`status-pill ${
                          company.status === "Active"
                            ? "active"
                            : "upcoming"
                        }`}
                      >

                        <span className="status-dot"></span>

                        {company.status}

                      </span>

                    </td>


                    {/* ACTION */}
                    <td className="action-column">

                      <button className="manage-btn">
                        Manage
                        <span>→</span>
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="no-companies"
                  >
                    No companies found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* ================= FOOTER ================= */}
        <div className="companies-footer">

          <span>
            Showing {filteredCompanies.length} of{" "}
            {companies.length} companies
          </span>

        </div>

      </section>

    </div>
  );
}

export default Companies;