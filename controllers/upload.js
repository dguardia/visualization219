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
    console.log(collegeDocuments);
    }
    res.redirect('/colleges');
};

exports.genderInformation = function(req, res){
    var data = req.parseData;
    var numbRows = data.length;

    for(var row = 1; row < numbRows; row++){
        var unitID = data[row][0];
        genderInformationQuery(unitID, data, row);
    }
    res.redirect('/colleges');

};

var genderInformationQuery = function(unitID, data, row){

    College.findOne({UNITID: unitID}, function(err, genderInfo){
        genderInfo.GENDER = {
            'male': [data[row][8]],
            'female': [data[row][10]]
        };
        console.log(genderInfo);
        genderInfo.save();
    })
};

exports.totalEnrollments = function(req, res){
    var data = req.parseData;
    var numbRows = data.length;

    for(var row = 1; row < numbRows; row++){
        var unitID = data[row][0];

        totalEnrrollmentQuery(unitID, data, row);
    }
    res.redirect('/colleges');

};

var totalEnrrollmentQuery = function(unitID, data, row){

    College.findOne({UNITID: unitID}, function(err, total){
        total.TOTAL = data[row][6];
        console.log(total);
        total.save();
    })
};

exports.tuitionByYear = function(req, res){
    var data = req.parseData;
    var numbRows = data.length;
    var fileName = req.files.fileToUpload.originalname;
    var year;

    if(fileName.indexOf('2013') != -1){
        year = 2013;
    } else if(fileName.indexOf('2012') != -1){
        year = 2012;
    } else if(fileName.indexOf('2011') != -1){
        year = 2011;
    }
    console.log(year);

    for(var row = 1; row < numbRows; row++){
        var unitId = data[row][0];
        processTuition(unitId, data, row, year)
    }
    res.redirect('/colleges');

};
var processTuition = function(unitId, data, row, year){
    College.findOne({UNITID: unitId}, function(err, myDoc){
        if(err){
            console.log(err)
        }
        if(myDoc){
            if(isNaN(data[row][1]))
            if(!myDoc.TUITION){
                myDoc.TUITION = []
            }
            myDoc.TUITION.push(Number(data[row][1]));
            myDoc.save()

        } else {
            console.log('unitID: ', unitId, "does not exits")
        }

    });
};































