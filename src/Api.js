const BASE_URL = "https://simplus-api.herokuapp.com/api";

export default {
  checkToken: async (token) => {
    const req = await fetch(`${BASE_URL}/me`, {
      method: "GET",
      headers: {
        withCredentials: true,
        credentials: "include",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(req.status);
    const json = await req.json();
    return json;
  },
  login: async (email, password) => {
    const req = await fetch(`${BASE_URL}/auth`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    console.log(req);
    const json = await req.json();
    return json;
  },
  register: async (name, email, password) => {
    const req = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    console.log(req);
    const json = await req.json();
    console.log(json);
    return json;
  },
  getCustomers: async (token) => {
    const req = await fetch(`${BASE_URL}/customers`, {
      method: "GET",
      headers: {
        withCredentials: true,
        credentials: "include",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(req);
    const json = await req.json();
    return json;
  },
  registerCustomer: async (data, token) => {
    const req = await fetch(`${BASE_URL}/customers`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    console.log(req);
    const json = await req.json();
    return json;
  },
  updateCustomer: async (data, id, token) => {
    const req = await fetch(`${BASE_URL}/customers/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    console.log(req);
    const json = await req.json();
    return json;
  },
  removeCustomer: async (id, token) => {
    const req = await fetch(`${BASE_URL}/customers/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(req);
    const json = await req.json();
    return json;
  },
  getPayments: async (token) => {
    const req = await fetch(`${BASE_URL}/payments`, {
      method: "GET",
      headers: {
        withCredentials: true,
        credentials: "include",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(req);
    const json = await req.json();
    return json;
  },
  registerPayment: async (data, token) => {
    const req = await fetch(`${BASE_URL}/payments`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const json = await req.json();
    return json;
  },
  updatePayment: async (data, id, token) => {
    const req = await fetch(`${BASE_URL}/payments/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    console.log(req);
    const json = await req.json();
    return json;
  },
  removePayment: async (id, token) => {
    const req = await fetch(`${BASE_URL}/payments/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(req);
    const json = await req.json();
    return json;
  },
  getReceivements: async (token) => {
    const req = await fetch(`${BASE_URL}/receivements`, {
      method: "GET",
      headers: {
        withCredentials: true,
        credentials: "include",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(req);
    const json = await req.json();
    return json;
  },
  registerReceivements: async (data, token) => {
    const req = await fetch(`${BASE_URL}/receivements`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    console.log(req);
    const json = await req.json();
    return json;
  },
  updateReceivements: async (data, id, token) => {
    const req = await fetch(`${BASE_URL}/receivements/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    console.log(req);
    const json = await req.json();
    return json;
  },
  removeReceivements: async (id, token) => {
    const req = await fetch(`${BASE_URL}/receivements/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(req);
    const json = await req.json();
    return json;
  },
};
