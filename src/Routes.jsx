import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import VendorManagementConsole from './pages/vendor-management-console';
import RFPStatusTrackingHub from './pages/rfp-status-tracking-hub';
import EmailProcessingCenter from './pages/email-processing-center';
import RFPCreationWorkspace from './pages/rfp-creation-workspace';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<RFPStatusTrackingHub />} />
        <Route path="/vendor-management-console" element={<VendorManagementConsole />} />
        <Route path="/rfp-status-tracking-hub" element={<RFPStatusTrackingHub />} />
        <Route path="/email-processing-center" element={<EmailProcessingCenter />} />
        <Route path="/rfp-creation-workspace" element={<RFPCreationWorkspace />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
