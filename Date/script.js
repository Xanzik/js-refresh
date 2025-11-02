const user = {
    name: 'Vasia',
    birthday: '10/21/2021'
}

const isBirthday = user => {
    const todayDate = new Date();
    const userBirthdayDate = new Date(user.birthday);
    return todayDate.getMonth() === userBirthdayDate.getMonth() && todayDate.getDate() === userBirthdayDate.getDate();
};
