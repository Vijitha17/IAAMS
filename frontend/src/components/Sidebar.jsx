import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

const Sidebar = () => {
  const [isRequirementOpen, setIsRequirementOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [isVendorOpen, setIsVendorOpen] = useState(false);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);

  const toggleRequirementDropdown = () => {
    setIsRequirementOpen(!isRequirementOpen);
  };

  const toggleStockDropdown = () => {
    setIsStockOpen(!isStockOpen);
  };

  const toggleVendorDropdown = () => {
    setIsVendorOpen(!isVendorOpen);
  };
  
  const togglePurchaseDropdown = () => {
    setIsPurchaseOpen(!isPurchaseOpen);
  };
  
  const toggleRequestDropdown = () => {
    setIsRequestOpen(!isRequestOpen);
  };
  
  const toggleApprovalDropdown = () => {
    setIsApprovalOpen(!isApprovalOpen);
  };
  
  const toggleUserDropdown = () => {
    setIsUserOpen(!isUserOpen);
  };
  
  const toggleReportsDropdown = () => {
    setIsReportsOpen(!isReportsOpen);
  };

  return (
    <div className="bg-dark text-white p-3" style={{ height: '100vh', overflow: 'auto', width: '280px' }}>
      <h4>Menu</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-3">
          <Link to="/dashboard" className="nav-link text-white d-flex align-items-center">
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </Link>
        </li>

        {/* Requirement Dropdown */}
        <li className="nav-item mb-3">
          <button 
            className="nav-link text-white d-flex align-items-center bg-dark border-0 w-100 text-start" 
            onClick={toggleRequirementDropdown}
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-list-check me-2"></i> Requirement
            <i className={`bi ${isRequirementOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>

          {isRequirementOpen && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item mb-2">
                <Link to="/dashboard/requirement/add" className="nav-link text-white">
                  Add Requirement
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/dashboard/requirement/current" className="nav-link text-white">
                  Current Requirement
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/dashboard/requirement/history" className="nav-link text-white">
                  Requirement History
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Stock Management Dropdown */}
        <li className="nav-item mb-3">
          <button 
            className="nav-link text-white d-flex align-items-center bg-dark border-0 w-100 text-start" 
            onClick={toggleStockDropdown}
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-box-seam me-2"></i> Stock Management
            <i className={`bi ${isStockOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>

          {isStockOpen && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item mb-2">
                <Link to="/dashboard/stock/current" className="nav-link text-white">
                  Current Stock
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/dashboard/stock/allocated" className="nav-link text-white">
                  Allocated Stock
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Vendor Management Dropdown */}
        <li className="nav-item mb-3">
          <button 
            className="nav-link text-white d-flex align-items-center bg-dark border-0 w-100 text-start" 
            onClick={toggleVendorDropdown}
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-building me-2"></i> Vendor Management
            <i className={`bi ${isVendorOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>

          {isVendorOpen && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item mb-2">
                <Link to="/dashboard/vendor/service" className="nav-link text-white">
                  Service Vendor
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/dashboard/vendor/product" className="nav-link text-white">
                  Product Vendor
                </Link>
              </li>
            </ul>
          )}
        </li>
        
        {/* Purchase Dropdown */}
        <li className="nav-item mb-3">
          <button 
            className="nav-link text-white d-flex align-items-center bg-dark border-0 w-100 text-start" 
            onClick={togglePurchaseDropdown}
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-cart-check me-2"></i> Purchase
            <i className={`bi ${isPurchaseOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>

          {isPurchaseOpen && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item mb-2">
                <Link to="/dashboard/purchase/create" className="nav-link text-white">
                  Create Purchase
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/dashboard/purchase/view" className="nav-link text-white">
                  View Purchased List
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/dashboard/purchase/manage" className="nav-link text-white">
                  Manage Purchase
                </Link>
              </li>
            </ul>
          )}
        </li>
        
        {/* Request Dropdown */}
        <li className="nav-item mb-3">
          <button 
            className="nav-link text-white d-flex align-items-center bg-dark border-0 w-100 text-start" 
            onClick={toggleRequestDropdown}
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-file-earmark-text me-2"></i> Request
            <i className={`bi ${isRequestOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>

          {isRequestOpen && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item mb-2">
                <Link to="/dashboard/request/create" className="nav-link text-white">
                  Create Request
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/dashboard/request/history" className="nav-link text-white">
                  Request History
                </Link>
              </li>
            </ul>
          )}
        </li>
        
        {/* Approval Dropdown */}
        <li className="nav-item mb-3">
          <button 
            className="nav-link text-white d-flex align-items-center bg-dark border-0 w-100 text-start" 
            onClick={toggleApprovalDropdown}
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-check-circle me-2"></i> Approval
            <i className={`bi ${isApprovalOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>

          {isApprovalOpen && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item mb-2">
                <Link to="/dashboard/approval/approve" className="nav-link text-white">
                  Approve Request
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/dashboard/approval/list" className="nav-link text-white">
                  Approved Request List
                </Link>
              </li>
            </ul>
          )}
        </li>
        
        {/* User Management Dropdown */}
        <li className="nav-item mb-3">
          <button 
            className="nav-link text-white d-flex align-items-center bg-dark border-0 w-100 text-start" 
            onClick={toggleUserDropdown}
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-people me-2"></i> User Management
            <i className={`bi ${isUserOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>

          {isUserOpen && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item mb-2">
                <Link to="dashboard/user/create" className="nav-link text-white">
                  Create Users
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="dashboard/user/list" className="nav-link text-white">
                  User List
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="dashboard/user/manage" className="nav-link text-white">
                  Manage Users
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="dashboard/user/department" className="nav-link text-white">
                  Departments
                </Link>
              </li>
            </ul>
          )}
        </li>
        
        {/* Reports Dropdown */}
        <li className="nav-item mb-3">
          <button 
            className="nav-link text-white d-flex align-items-center bg-dark border-0 w-100 text-start" 
            onClick={toggleReportsDropdown}
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-file-earmark-bar-graph me-2"></i> Reports
            <i className={`bi ${isReportsOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>

          {isReportsOpen && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item mb-2">
                <Link to="/dashboard/reports/generate" className="nav-link text-white">
                  Generate Reports
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/dashboard/reports/view" className="nav-link text-white">
                  View Reports
                </Link>
              </li>
            </ul>
          )}
        </li>
        
        <li className="nav-item mb-3">
          <Link to="/dashboard/settings" className="nav-link text-white d-flex align-items-center">
            <i className="bi bi-gear me-2"></i> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;