import React from "react";
import { Outlet, NavLink } from "react-router";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { role } = useRole();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>

          <div className="px-4 font-bold">Dashboard</div>
        </nav>

        {/* Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu w-full grow">
            {/* Home */}
            <li>
              <NavLink
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Home"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Home</span>
              </NavLink>
            </li>

            {/* My Bookings */}
            <li>
              <NavLink
                to="/dashboard/my-bookings"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Bookings"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7H6"></path>
                  <path d="M14 17H4"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="9" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">My Bookings</span>
              </NavLink>
            </li>

            {/* Payment History */}
            <li>
              <NavLink
                to="/dashboard/payment-history"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Payment History"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M3 6h18v4H3z"></path>
                  <path d="M3 14h18v4H3z"></path>
                  <circle cx="8" cy="16" r="1"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Payment History</span>
              </NavLink>
            </li>

            {/* Admin Links */}
            {role === 'admin' && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/approve-decorator"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Approve Decorator"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      className="my-1.5 inline-block size-4"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                    <span className="is-drawer-close:hidden">Approve Decorator</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/add-services"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Services"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      className="my-1.5 inline-block size-4"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                    <span className="is-drawer-close:hidden">Add Services</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Decorator Links */}
            {role === 'admin' && (
              <li>
                <NavLink
                  to="/dashboard/assign-decorator"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Assign Decorator"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M12 5v14"></path>
                    <path d="M5 12h14"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">Assign Decorator</span>
                </NavLink>
              </li>
            )}
            {role === 'decorator' && (
              <li>
                <NavLink
                  to="/dashboard/assigned-decorators"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Assigned Decorator"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M12 5v14"></path>
                    <path d="M5 12h14"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">Assigned Decorator</span>
                </NavLink>
              </li>
  )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
