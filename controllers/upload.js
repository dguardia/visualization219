var fs = require('fs');
var csvParser = require('csv-parse');
var mongoose = require('mongoose');
var db = mongoose.connection;

var College = require('../models/College');

exports.index = function(req, res) {
    res.render('upload');
};

exports.parseCSV = function(req, res, next){
    console.log(req.files);
    if(!req.files.fileToUpload){
        res.send('No files were uploaded!');
    }

    fs.readFile(req.files.fileToUpload.path, {
        encoding: 'utf-8'
    }, function(err, csvData){
        if(err){
            console.log(err);
        }

        csvParser(csvData, {
            delimiter: ','
        }, function(err, data){
            if(err){
                console.log(err)
            } else {
                req.parseData = data;
                next()
            }
        });
    });
};

exports.infoCollege = function(req, res){
    var data = req.parseData;

    var numbRows = data.length;
    var numbCols = data[0].length;

    for (var row = 1; row < numbRows; row++) {
        var college = {};

        for (var col = 0; col < numbCols; col++) {
            college[data[0][col]] = data[row][col];
        }

        var collegeDocuments = new College(college);
        collegeDocuments.save();
        console.log(college);
    }
    mongoose.connection.close();
    res.redirect('/colleges');
};

exports.genderInformation = function(req, res){
    var data = req.parseData;
    var numbRows = data.length;

    for(var row = 1; row < numbRows; row++){
        var unitID = data[row][0];
        console.log(unitID);
        genderInformationQuery(unitID, data, row);
    }
    mongoose.connection.close();
    res.redirect('/colleges');

};

var genderInformationQuery = function(unitID, data, row){

    College.findOne({UNITID: unitID}, function(err, genderInfo){
        genderInfo.GENDER = {
            'male': [data[row][8]],
            'female': [data[row][10]]
        };
        genderInfo.save();
    })
};