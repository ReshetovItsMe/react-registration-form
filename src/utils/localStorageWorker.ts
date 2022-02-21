const setToLS = (key: string, value: any) => {
    window.localStorage.setItem(key, JSON.stringify(value));
};

const deleteFromLS = (key: string) => {
    window.localStorage.removeItem(key);
};

const getFromLS = (key: string) => {
    const value = window.localStorage.getItem(key);

    if (value) {
        return JSON.parse(value);
    }
};

export default { setToLS, getFromLS, deleteFromLS };
