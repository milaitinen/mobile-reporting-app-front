

export const login = (username, password) => {
    return new Promise((resolve, reject) => {
        process.nextTick(
            () =>
                (username !== null && password !== null)
                    ? resolve(username)
                    : reject(undefined),
        );
    });
};