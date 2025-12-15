import React from "react";
import { Outlet, NavLink } from "react-router";
import { 
  MdHome, MdEvent, MdPayment, MdPersonAdd, MdAddCircle, 
  MdAssignment, MdTrendingUp, MdToday 
} from "react-icons/md";
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
            <MdAssignment className="w-6 h-6" />
          </label>

          <div className="px-4 font-bold flex items-center gap-2">
            <MdAssignment className="w-6 h-6" />
            Dashboard
          </div>
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
                <MdHome className="w-6 h-6" />
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
                <MdEvent className="w-6 h-6" />
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
                <MdPayment className="w-6 h-6" />
                <span className="is-drawer-close:hidden">Payment History</span>
              </NavLink>
            </li>

            {/* Admin Links */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/approve-decorator"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Approve Decorator"
                  >
                    <MdPersonAdd className="w-6 h-6" />
                    <span className="is-drawer-close:hidden">
                      Approve Decorator
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/add-services"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Services"
                  >
                    <MdAddCircle className="w-6 h-6" />
                    <span className="is-drawer-close:hidden">Add Services</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/assign-decorator"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assign Decorator"
                  >
                    <MdAssignment className="w-6 h-6" />
                    <span className="is-drawer-close:hidden">Assign Decorator</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/demand"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Demand"
                  >
                    <MdTrendingUp className="w-6 h-6" />
                    <span className="is-drawer-close:hidden">Demand</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/revenue"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Revenue"
                  >
                    <MdTrendingUp className="w-6 h-6" />
                    <span className="is-drawer-close:hidden">Revenue</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Decorator Links */}
            {role === "decorator" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/assigned-decorators"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assigned Decorator"
                  >
                    <MdAssignment className="w-6 h-6" />
                    <span className="is-drawer-close:hidden">Assigned Decorator</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/todays"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Todays Schedule"
                  >
                    <MdToday className="w-6 h-6" />
                    <span className="is-drawer-close:hidden">Todays Schedule</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
