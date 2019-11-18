var models = require('../mysql/sqlConfig');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../mysql/sqlMap');

var conn = mysql.createConnection(models.mysql);

conn.connect();

var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.send('err:'+ret);
    } else {
        console.log(ret);
        res.send({code:0,mag:'请求成功'});
    }
}

var dateStr = function(str) {
    return new Date(str.slice(0,7));
}

// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    conn.query(sql, [params.username, params.password, params.userphoto,
        params.userphone, params.sex], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//查找用户接口
router.post('/userLogin', (req, res) => {
    var sql_name = $sql.user.select_name;
    var params = req.body;
    if (params.username) {
        sql_name += " where username ='"+ params.username +"'";
    }
    conn.query(sql_name, params.username, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result[0] === undefined) {
            res.send({code:-1,msg: '无效用户名'})   //查询不出username，data 返回-1
        } else {
            var resultObj = result[0];
            if(resultObj.password === params.password) {
                jsonWrite(res, result);
            } else {
                res.send({code:1,msg:'密码错误'})   //username
            }
        }
    })
});

//获取用户信息
router.get('/getUser', (req, res) => {
    var sql_name = $sql.user.select_name;
    var params = req.body;
    if (params.name) {
        sql_name += "where username ='"+ params.name +"'";
    }
    conn.query(sql_name, params.name, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result[0] === undefined) {
            res.send({code: -1})   //查询不出username，data 返回-1
        } else {
            jsonWrite(res, result);
        }
    })
});

//更新用户信息
router.post('/updateUser', (req, res) => {
    var sql_update = $sql.user.update_user;
    var params = req.body;
    if (params.logid) {
        sql_update  += " username = '" + params.username +
            "',userphoto = '" + params.userphoto +
            "',sex = '" + params.sex +
            "' where logid ='"+ params.logid + "'";
    }
    conn.query(sql_update, params.logid, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result.affectedRows === undefined) {
            res.send({code:-1,msg:'更新失败，请联系管理员'})   //查询不出username，data 返回-1
        } else {
            res.send({code:0,mag:'ok'});
        }
    })
});

//更改密码
router.post('/modifyPassword', (req, res) => {
    var sql_modify = $sql.user.update_user;
    var params = req.body;
    if (params.logid) {
        sql_modify +=  " password = '" + params.password +
            "' where logid ='"+ params.logid + "'";
    }
    conn.query(sql_modify, params.logid, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result.affectedRows === undefined) {
            res.send({code:-1,mag:'修改密码失败，请联系管理员'})   //查询不出username，data 返回-1
        } else {
            res.send({code:0,msg:'ok'});
        }
    })
});


module.exports = router;
