var models = require('../mysql/sqlConfig');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../mysql/sqlMap');
var fs = require('fs');
var common = require('../../public/javascript/commonFn');
var multer = require('multer');
// 设置文件缓存的目录
var upload = multer({ dest: '../../uploadFiles/tmp/'});
var globalObj = require('../../config')


var conn = mysql.createConnection(models.mysql);

conn.connect();

var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.send('err:'+ret);
    } else {
        console.log(ret);
        res.send({code:0,msg:'请求成功'});
    }
}

var dateStr = function(str) {
    return new Date(str.slice(0,7));
}

var verificationCode = '';

// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(req.body);
    if(params.password !== params.password2) {
        res.send({code:-1,msg:'两次输入的密码不一致'});
        return false;
    } else if (params.sms !== verificationCode){
        res.send({code:-1,msg:'验证码有误'});
        return false;
    }
    conn.query("select * from user where username ='" + params.username+"'", params.username,function (err2,result2) {
        if (err2) {
            console.log(err2);
        }
        if (result2[0] !== undefined) {
            res.send({code:-1,msg: '此用户名已存在'})
        } else {
            conn.query("select * from user where userphone ='" + params.userphone+"'", params.userphone,function (err3,result3) {
                if (err3) {
                    console.log(err3);
                }
                if (result3[0] !== undefined) {
                    res.send({code:-1,msg: '此手机号已被占用'})
                } else {
                    conn.query(sql, [params.username, params.password, params.userphoto,
                        params.userphone, params.sex,params.userphotoid], function(err, result) {
                        if (err) {
                            console.log(err);
                        }
                        if (result) {
                            res.send({code:0,msg: '登录成功',token: common.str_add(common.randomString(32,'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'),8,'-')})
                        }
                    })
                }
            })
        }
    })
});

//登录接口
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
                res.send({code:0,msg: '登录成功',token: common.str_add(common.randomString(32,'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'),8,'-')})
            } else {
                res.send({code:1,msg:'密码错误'})   //username
            }
        }
    })
});

//获取用户信息
router.get('/getUser', (req, res) => {
    var sql_name = $sql.user.select_name;
    var params = req.query;
    if (params.username) {
        sql_name += " where username ='"+ params.username +"'";
    }
    conn.query(sql_name, params.username, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result[0] === undefined) {
            res.send({code: -1})   //查询不出username，data 返回-1
        } else {
            res.send({code: 0,data: result[0] })
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
            res.send({code:0,msg:'ok'});
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
            res.send({code:-1,msg:'修改密码失败，请联系管理员'})   //查询不出username，data 返回-1
        } else {
            res.send({code:0,msg:'ok'});
        }
    })
});

//发送验证码
router.get('/verificationCode', (req, res) => {
    var params = req.query;
    if (params.userphone == '') {
        res.send({code:-1,msg:'手机号不能为空'});
        return false
    } else {
        conn.query("select * from user where userphone ='" + params.userphone+"'", params.userphone,function (err2,result2) {
            if (err2) {
                console.log(err2);
            }
            if (result2[0] !== undefined) {
                res.send({code:-1,msg: '此手机号已被占用'})
            } else {
                verificationCode = common.randomString(6,'1234567890');
                res.send({code:0,verificationCode:verificationCode});
            }
        })
    }
});

//首页
router.get('/homeData', (req, res) => {
    var data = {};
    var sql_banner = $sql.home.banner;
    var sql_b_class = $sql.home.boutiqueClass;
    var sql_nba_class = $sql.home.NBAClass;
    var sql_harvests = $sql.home.harvests;
    //var params = req.query;
    //获取banner
    conn.query(sql_banner,'',function (err,result) {
        if (err) {
            console.log(err);
        }
        if (result.length == 0) {
            data.banner = [];
        } else {
            data.banner = result;
            //获取b_class
            conn.query(sql_b_class,'',function (err1,result1) {
                if (err1) {
                    console.log(err1);
                }
                if (result.length == 0) {
                    data.b_class = [];
                } else {
                    data.b_class = result1;
                    //获取nba_class
                    conn.query(sql_nba_class,'',function (err2,result2) {
                        if (err2) {
                            console.log(err2);
                        }
                        if (result2.length == 0) {
                            data.nba_class = [];
                        } else {
                            data.nba_class = result2;
                            //获取harvests
                            conn.query(sql_harvests,'',function (err3,result3) {
                                if (err3) {
                                    console.log(err3);
                                }
                                if (result.length == 0) {
                                    data.harvests = [];
                                } else {
                                    data.harvests = result3;
                                    //获取characteristic
                                    conn.query(sql_banner,'',function (err4,result4) {
                                        if (err4) {
                                            console.log(err4);
                                        }
                                        if (result.length == 0) {
                                            data.characteristic = [];
                                        } else {
                                            data.characteristic = result4;
                                            //获取adsense
                                            conn.query(sql_banner,'',function (err5,result5) {
                                                if (err5) {
                                                    console.log(err5);
                                                }
                                                if (result.length == 0) {
                                                    data.adsense = '';
                                                } else {
                                                    data.adsense = result5[0].imgUrl;
                                                    res.send(data);
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
});

//获取订单信息
router.get('/getOrder', (req, res) => {
    var sql_order = $sql.my.order;
    var params = req.query;
    console.log(params)
    if (params.userid != '') {
        sql_order += " where userid = "+ params.userid + " and status = " + params.status;
    }
    conn.query(sql_order, [params.userid,params.status],function (err,result) {
        if (err) {
            console.log(err);
        }
        if (result.length== 0) {
            res.send({code:0,list:[]})
        } else {
            res.send({code:0,list:result})
        }
    })
});
//删除订单
router.get('/deleteOrder', (req, res) => {
    var sql_delete = $sql.my.delete;
    var params = req.query;
    console.log(params)
    if (params.userid != '') {
        sql_delete += " where goodid = "+ params.goodid;
    }
    conn.query(sql_delete, params.goodid,function (err,result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.send({code:0,msg:'删除成功！'})
        } else {
            res.send({code:-1,msg: '删除失败！'})
        }
    })
});
//获取积分
router.get('/score', (req, res) => {
    var sql_score = $sql.my.score;
    var params = req.query;
    if (params.userid != '') {
        sql_score += " where userid = "+ params.userid;
    }
    conn.query(sql_score, params.goodid,function (err,result) {
        if (err) {
            console.log(err);
        }
        if (result[0] == undefined) {
            res.send({code:0,list:[]})
        } else {
            res.send({code:0,list:result})
        }
    })
});
//homework
router.get('/getSubject', (req, res) => {
    var $sql_subject = $sql.class.get;
    var params = req.query;
    conn.query($sql_subject+' where type =' + params.type, params.type,function (err,result) {
        if (err) {
            console.log(err);
        }
        if (result[0] == undefined) {
            res.send({code:0,list:[]})
        } else {
            for(var i in result){
                result[i].num = Number(i)+1;
                result[i].list = [];
                result[i].list.push({id:'A',text:result[i].a_answer});
                result[i].list.push({id:'B',text:result[i].b_answer});
                result[i].list.push({id:'C',text:result[i].c_answer});
                result[i].list.push({id:'D',text:result[i].d_answer});
            }
            res.send({code:0,list:result})
        }
    })
});

//提交答案
router.post('/postAnswer', (req, res) => {
    var $sql_sbumit = $sql.class.sbumit;
    var params = req.body;

    if (params.answerList.length>0) {
        for(var i in params.answerList){
            $sql_sbumit +=  " my_answer = '" + params.answerList[i] +
                "' where id ='"+ params.id + "'";
            conn.query($sql_sbumit, params.my_answer,function (err,result) {
                if (err) {
                    console.log(err);
                }
                if (result.id == undefined) {
                    res.send({code:-1,msg:'提交失败'})
                } else {
                    res.send({code:0,msg:'ok'})
                }
            })
        }
    }
});

// 文件上传
router.post('/upload', upload.array('file'),function(req, res, next) {
    // 文件信息
    if (req.files[0]){
        console.log("----------接收文件----------\n");
        console.log(req.files);
    }
    let reqData = req.files[0]
    uploadFn(reqData, res, next);
});

function uploadFn (req, res) {
    var des_file =  "uploadFiles/file/" + req.originalname;
    fs.readFile(req.path, function (error, data) {
        if (error) {
            console.error(error);
        }
        fs.writeFile(des_file, data, function (err) {
            if (err) {
                console.log(err);// 接收失败
            }else {
                // 接收成功
                // 删除缓存文件
                fs.unlink(req.path, function(err){
                    if (err){
                        console.log('文件:'+req.path+'删除失败！');
                        return console.error(err);
                    }
                })
                // 将文件信息写入数据库
                var time = new Date().toJSON();
                // 前端传过来的参数
                var addSqlParams = [req.fieldname,req.originalname,req.filename,req.encoding,req.mimetype,req.size,des_file, __dirname + '/' + req.path,time]
                // 插入数据
                conn.query($sql.user.upload, addSqlParams, function (err, result) {
                    if (err) {
                        return console.error(err);
                    }else {
                        var response = {
                            status:200,
                            message: '上传成功!',
                            data:{
                                id:result.insertId,
                                //path:globalObj.rootDir+ '/' + des_file,
                                path:des_file,
                                fileName:req.filename,
                                time:time,
                                type:req.mimetype,
                                size:req.size,
                            }
                        };
                        res.json( response );
                    }
                })
            }
        })
    })
}

module.exports = router;
