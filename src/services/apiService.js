const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class APIService {
  // RFP endpoints
  static async createRFPFromNaturalLanguage(input) {
    const response = await fetch(`${API_URL}/rfps/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        naturalLanguageInput: input,
        createdBy: 'user',
      }),
    });
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }

  static async getAllRFPs() {
    const response = await fetch(`${API_URL}/rfps`);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }

  static async getRFPById(id) {
    const response = await fetch(`${API_URL}/rfps/${id}`);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }

  static async updateRFP(id, data) {
    const response = await fetch(`${API_URL}/rfps/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }

  static async sendRFPToVendors(rfpId, vendorIds) {
    const response = await fetch(`${API_URL}/rfps/${rfpId}/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rfpId, vendorIds }),
    });
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }

  static async getRFPProposals(rfpId) {
    const response = await fetch(`${API_URL}/rfps/${rfpId}/proposals`);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }

  static async compareProposals(rfpId) {
    const response = await fetch(`${API_URL}/rfps/${rfpId}/compare`);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }

  // Vendor endpoints
  static async getAllVendors() {
    const response = await fetch(`${API_URL}/vendors`);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }

  static async getVendorById(id) {
    const response = await fetch(`${API_URL}/vendors/${id}`);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }

  static async createVendor(data) {
    const response = await fetch(`${API_URL}/vendors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }

  static async updateVendor(id, data) {
    const response = await fetch(`${API_URL}/vendors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }

  static async deleteVendor(id) {
    const response = await fetch(`${API_URL}/vendors/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }

  // Email endpoints
  static async fetchNewEmails() {
    const response = await fetch(`${API_URL}/emails/fetch`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }

  static async getEmailById(id) {
    const response = await fetch(`${API_URL}/emails/${id}`);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }

  static async getRFPEmails(rfpId) {
    const response = await fetch(`${API_URL}/emails/rfp/${rfpId}`);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }

  static async getInboundEmails() {
    const response = await fetch(`${API_URL}/emails/inbound/all`);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }
}

export default APIService;
