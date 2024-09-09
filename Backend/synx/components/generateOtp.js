 const generateOtp = () =>{
    const digit1 = Math.floor(Math.random()*9) + 1;
    const digit2 = Math.floor(Math.random()*9) + 1;
    const digit3 = Math.floor(Math.random()*9) + 1;
    const digit4 = Math.floor(Math.random()*9) + 1;
    const digit5 = Math.floor(Math.random()*9) + 1;
    const digit6 = Math.floor(Math.random()*9) + 1;

    const otp = parseInt(`${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`,10);
    const creationTime = new Date();
    return {otp, creationTime}
}

module.exports = generateOtp;