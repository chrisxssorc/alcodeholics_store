import axios from 'axios';

export async function getAllAlcohols() {
    try {
        const { data } = await axios.get('/api/alcohols');
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllUsers() {
    try {
        const { data } = await axios.get('/api/users');
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function registerUser(username, password) {
    try {
        const { data } = await axios.post('/api/users/register', {username, password});
        localStorage.setItem("data", JSON.stringify(data));
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function loginUser(username, password) {
    try {
        const { data } = await axios.post('/api/users/login', {username, password});
        localStorage.setItem("data", JSON.stringify(data));
        return data;
    } catch (error) {
        console.log(error);
    }
}

export function logoutUser() {
    localStorage.removeItem("data");
}

export async function addToCart(userId, alcoholId) {
    try {
        const { data } = await axios.post('/api/cart/add', {userId, alcoholId});
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function removeFromCart(userId, alcoholId) {
    try {
        const { data } = await axios.delete(`/api/cart/remove/${userId}/${alcoholId}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getPendingItemsByUser(userId) {
    try {
        const { data } = await axios.get(`/api/cart/pending/${userId}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getCompletedItemsByUser(userId) {
    try {
        const { data } = await axios.get(`/api/cart/completed/${userId}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function checkout(userId) {
    try {
        const { data } = axios.patch(`/api/cart/checkout/${userId}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function changeQuantity(cartId, quantity) {
    try {
        const { data } = axios.patch(`/api/cart/quantity/${cartId}/${quantity}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}