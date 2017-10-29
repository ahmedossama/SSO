function getApp(app_name) {
    return App.findOne({
        name: app_name
    });
}