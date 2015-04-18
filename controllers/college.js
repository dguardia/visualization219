var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var College = require('../models/College');
var ifErr = function(err, callback){
    mongoose.connection.close();
    callback(err);
    console.log(err);
};

exports.index = function(req, res){

        College.find({ }).select('_id INSTNM').lean()
            .exec(function(err, colleges){
                if(err){
                    ifErr(err);
                    console.log('err', err);
                } else {
                    mongoose.connection.close();

                    res.render('collegelist', {
                        title: 'College List',
                        colleges: colleges
                    });
                }
            });
};

exports.getCollegeById = function(req, res){
  var id = req.params.id;
    College.findOne({_id: id}).lean().exec(function(err, college){
            if(err){
                console.log(err);
                ifErr(err);
            } else {
                delete college._id;
                delete college.__v;
                res.render('college', {
                    title: 'College Info',
                    college: college
                });
            }
        });
};