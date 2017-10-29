function getCookieData(allCookies) {

    let cookies = [];
    console.log("allcookies", allCookies)
    cookies = (allCookies) ? allCookies.split('; ') : [''];
    console.log("cookie",cookies)
    var userCookie = cookies.filter((cookie) => cookie.startsWith('SSOC'))[0];
    console.log("userCookie", userCookie)
    return (userCookie) ? userCookie.split('=')[1] : null;
}

module.exports = {
    getCookieData: getCookieData
}