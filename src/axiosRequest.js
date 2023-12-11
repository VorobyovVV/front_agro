import axios from 'axios'
import { userStore } from './usage';
import router from './router';

function parseerror(data) {
    let errorMsg = "";
    data.detail.forEach((det) => {
        let tmp = "";
        tmp += det.loc[0] + " - ";
        tmp += det.loc[1] + ". ";
        tmp += det.type + ". ";
        tmp += det.msg + " \n";
        errorMsg += tmp;
    })
    return errorMsg
}

function parseCodeError(error) {
    let msg = '';
    if (error.status === 401) {
        // clean the store; go to logout page
        userStore.clearAll();
        router.push('/login');
        return;
    }
    if (Array.isArray(error.data.detail)) {
        msg = parseerror(error.data);
    } else {
        msg = error.data.detail;
    }
    return msg;
}

export function postreg({ email, text_password, role }) {
    return new Promise((resolve, reject) => {
        const myrequest = {
            "email": email,
            "text_password": text_password,
            "role": role
        }
        axios
            .post('http://localhost:8080/api/auth/register', myrequest)
            .then((response) => {
                console.log(response);
                const code = response.status;
                if (code === 201) {
                    resolve(response.data);
                } else {
                    reject(parseCodeError(response));
                }
            }

            )
            .catch((error) => {
                reject(error);
            })
    }

    )
}

export function postlog({ username, password }) {
    return new Promise((resolve, reject) => {
        const myrequest = {
            "username": username,
            "password": password,
        }

        axios
            .post('http://localhost:8080/api/auth/token', myrequest, {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            })
            .then((response) => {
                console.log(response);
                const code = response.status;
                if (code === 200) {
                    resolve(response.data);
                } else {
                    reject(parseCodeError(response));
                }
            })
            .catch((error) => {
                reject(error);
            })
    })
}



// export function postinter() {
//     return new Promise((resolve, reject) => {
//         console.log(userStore.getState());
//         const { access_token } = userStore.getState();
//         if (!access_token) {
//             console.log('no token found');

//             reject('no token');
//             return
//         }

//         axios
//             .post('http://localhost:8080/api/auth/introspect', null, {
//                 headers: {
//                     'Authorization': `Bearer ${'access_token'}`,
//                     'Content-Type': 'application/json'
//                 }
//             })
//             .then((myresponse) => {
//                 console.log(myresponse);
//                 const code = myresponse.status;
//                 if (code === 200) {
//                     resolve(myresponse);
//                 } else {
//                     reject(parseCodeError(myresponse));
//                 }
//             })
//             .catch((error) => {
//                 reject(error);
//             })
//     })
// }


// export function postworkers({ name, surname, patronymic, date_of_birth, phone_number }) {
//     return new Promise((resolve, reject) => {
//         const myrequest = {
//             "name": name,
//             "surname": surname,
//             "patronymic": patronymic,
//             "date_of_birth": date_of_birth,
//             "phone_number": phone_number,
//         }

//         axios
//             .post('http://localhost:8080/api/profiles/workers', myrequest)
//             .then((response) => {
//                 console.log(response);
//                 const code = response.status;

//             })
//     })
// }




export function postToServer(object, responseType = "json") {
    console.log("POST TO SERVER: ", object); // что передаем

    return new Promise((resolve, reject) => { //ассинхронное 
        const { access_token } = userStore.getState();
        //     const tokenId = window.localStorage.getItem("pwa-tokenId");

        if (!access_tokentoken) { //хранить в локальном хранилище
            console.log("No tokens found");
            reject('no token');
            return;
        }

        // const config = {
        //     headers: {
        //         Authorization: { "token": ["${token}", "${tokenId}"] },
        //     },
        //     responseType,
        // };
        // console.log('SEND: ', object);
        axios
            .post(url, object, config)
            .then((response) => {
                const result = checkResponse(response);
                console.log("OBJECT: ", object);
                console.log("RESPONSE: ", response);
                console.log("RESULT: ", result);
                if (result.code === 0) resolve(result.payload);
                else {
                    if (result.message) reject(result.message);
                    reject(result);
                }
            })
            .catch((error) => {
                console.log("ERR", error);
                storeArray.setError(error);
                reject(error);
            });
    });
}