
function getRoleByUser(uidd) {
    return Role.findOne({
        uuid: uidd
    });
}