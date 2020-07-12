const word = 'Token ';
const token = word.concat(`${localStorage.getItem('Token')}`);
let formData = new FormData();
formData.append('Authorization', `${token}`);

export { formData };