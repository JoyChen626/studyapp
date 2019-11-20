var sqlMap = {
    user: {
        add: 'insert into user (username, password, userphoto, userphone, sex, fileId) values (?,?,?,?,?,?)',
        select_name: 'select * from user',
        update_user: 'update user set',
        upload:'INSERT INTO uploadfiles(fieldname, originalName, tmpName, encoding, mimetype, size, path, tmpPath, addTime) VALUES(?,?,?,?,?,?,?,?,?)'
    },
    home: {
        banner: 'select * from banner',
        boutiqueClass: 'select * from boutiqueclass order By Rand() Limit 4',
        NBAClass: 'select * from nbaclass order By Rand() Limit 4',
        harvests: 'select * from harvests order By Rand() Limit 4'
    },
    my: {
        order: 'select * from orderList',
        delete: 'delete from orderList',
        score: 'select * from score'
    },
    class: {
        get: 'select * from homework',
        sbumit: 'update homework set'
    }
}

module.exports = sqlMap;
