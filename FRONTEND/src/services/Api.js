import axios from "axios";

export const postAdmin = async (a) => {
    return await axios.post('http://localhost:5500/login/create', a)
    .then(response => response)
};

export const registAdmin = async (a) => {
    return await axios.post('http://localhost:5500/register/create', a)
    .then(response => response)
};

export const refreshTokens = async (a) => {
    return await axios.get('http://localhost:5500/token', a)
    .then(response => response)
};

export const getAdmins = async () => {
    return await axios.get('http://localhost:5500/admin')
    .then(response => response)
};

export const logoutAdmin = async () => {
    return await axios.delete('http://localhost:5500/logout')
    .then(response => response)
};

export const updateAdmin = async (data, id) => {
    return await axios.put(`http://localhost:5500/admin/update/` + id, data)
    .then(res => res.data)
}

export const deleteAdmin = async (id) => {
    return await axios.delete(`http://localhost:5500/admin/delete/${id}`)
    .then(res => res.data)
}

// USERS
export const postUsers = async (a) => {
    return await axios.post('http://localhost:5500/userlogin/create', a)
    .then(response => response)
};

export const registUsers = async (a) => {
    return await axios.post('http://localhost:5500/userregist/create', a)
    .then(response => response)
};

export const usersToken = async (a) => {
    return await axios.get('http://localhost:5500/tokenuser', a)
    .then(response => response)
};

export const getUsers = async () => {
    return await axios.get('http://localhost:5500/users')
    .then(response => response)
};

export const logoutUsers = async () => {
    return await axios.delete('http://localhost:5500/logoutuser')
    .then(response => response)
};

export const updateUsers = async (data, id) => {
    return await axios.put(`http://localhost:5500/users/update/` + id, data)
    .then(res => res.data)
}

export const deleteUsers = async (id) => {
    return await axios.delete(`http://localhost:5500/admin/delete/${id}`)
    .then(res => res.data)
}

// PRODUCTS
export const getProduct = async () => {
    return await axios.get('http://localhost:5500/products')
    .then(res => res)
}

export const getProductById = async (id) => {
    return await axios.get(`http://localhost:5500/products/find/${id}`)
    .then(res => res)
}

export const createProduct = async (a) => {
    return await axios.post(`http://localhost:5500/products/create`, a)
    .then(res => res)
}

export const updateProduct = async (id, data) => {
    return await axios.put(`http://localhost:5500/products/update/` + id, data)
    .then(res => res.data)
}

export const deleteProduct = async (id) => {
    return await axios.delete(`http://localhost:5500/products/delete/${id}`)
    .then(res => res.data)
}

// CART
export const getCart = async () => {
    return await axios.get('http://localhost:5500/order')
    .then(res => res)
}

export const getOrderById = async (id) => {
    return await axios.get(`http://localhost:5500/order/find/${id}`)
    .then(res => res)
}

export const createOrder = async (a) => {
    return await axios.post(`http://localhost:5500/order/create`, a)
    .then(res => res)
}

export const updateOrder = async (id, data) => {
    return await axios.put(`http://localhost:5500/order/update/` + id, data)
    .then(res => res.data)
}

export const deleteOrder = async (id) => {
    return await axios.delete(`http://localhost:5500/order/delete/${id}`)
    .then(res => res.data)
}

// payment
export const getPayment = async () => {
    return await axios.get('http://localhost:5500/transaksi')
    .then(res => res)
}

export const getPaymentById = async (id) => {
    return await axios.get(`http://localhost:5500/transaksi/find/${id}`)
    .then(res => res)
}

export const createPayment = async (a) => {
    return await axios.post(`http://localhost:5500/transaksi/create`, a)
    .then(res => res)
}

export const updatePayment = async (id, data) => {
    return await axios.put(`http://localhost:5500/transaksi/update/${id}`, data)
    .then(res => res.data)
}

export const deletePayment = async (id) => {
    return await axios.delete(`http://localhost:5500/transaksi/delete/${id}`)
    .then(res => res.data)
}