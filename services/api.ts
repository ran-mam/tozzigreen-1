import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://220.249.121.186:10035/v1';

const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

const getToken = async () => {
    return await AsyncStorage.getItem('token');
};

const getHeaders = async () => {
    const token = await getToken();
    return {
        'Content-Type': 'application/json',
        'X-Request-ID': generateUUID(),
        ...(token && { Authorization: `Bearer ${token}` }),
    };
};

// LOGIN
export const loginAPI = async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Request-ID': generateUUID(),
        },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
};

// BILL CALCULATION
export const calculateBill = async (
    consumer_no: string,
    meter_no: string,
    recharge_type: string,
    charge_value: string
) => {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/consumers/bill_calculation`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ consumer_no, meter_no, recharge_type, charge_value }),
    });
    return response.json();
};

// TOKEN ISSUE
export const issueToken = async (
    consumer_no: string,
    meter_no: string,
    bill_session_id: string,
    token_send_flag: boolean
) => {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/consumers/token_issue`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ consumer_no, meter_no, bill_session_id, token_send_flag }),
    });
    return response.json();
};

// ORDER QUERY
export const getOrders = async (
    consumer_no: string,
    start_date: string,
    end_date: string
) => {
    const headers = await getHeaders();
    const url = `${BASE_URL}/consumers/order?consumer_no=${consumer_no}&start_date=${start_date}&end_date=${end_date}`;
    const response = await fetch(url, {
        method: 'GET',
        headers,
    });
    return response.json();
};