/**
 * Created by GunaySukru on 15.05.2017.
 */
var express = require('express');
app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var Schema = mongoose.Schema;

var surveysSchema = new Schema({
    surveyName: String,
    clientPhone: Number,
    answers: {
        answer1:{
            answerCount: Number,
            answerText: String
        },
        answer2:{
            answerCount: Number,
            answerText: String
        }
    },
    comments:[]
});

var survey = mongoose.model('surveys', surveysSchema);
mongoose.Promise = bluebird;
mongoose.connect('mongodb://surveysDb:surveysPass@ds137441.mlab.com:37441/surveys');

app.use(express.static(__dirname));
app.use(bodyparser.json());

app.get('/api/surveys', function (request, response) {
    survey.find({}).then(function (result) {response.send(result)});
});

app.get('/api/survey/:id', function (request, response) {
    console.log(request.params.id);
    survey.find({"_id":request.params.id}).then(function (result) {
        response.status(200).send(result);
    }).catch(function (err) {
        response.status(404).send(err);
    });
});

app.post('/api/newSurvey', function (request, response) {
    console.log("asd");
    console.log(request.body);
    newsurvey = new survey({
        surveyName: request.body.surveyName,
        answers: {
            answer1: {
                answerCount: 0,
                answerText: request.body.answer1
            },
            answer2: {
                answerCount: 0,
                answerText: request.body.answer2
            }
        },
        comments: []
    });

    newsurvey.save().then(function () {
        response.status(200).send();
    }).catch(function (err) {
        response.send(err);
    });
});

app.post('/api/vote/:id/:whiAns', function (request, response) {
    var surveyData = [];
    var newAnswer = [];
    var answerControl = true;
    survey.findById({"_id":request.params.id}).then(function (result) {
        surveyData = result;
        if(request.params.whiAns === "answer1"){
            surveyData.answers.answer1.answerCount = surveyData.answers.answer1.answerCount + 1;
            console.log(surveyData.answers.answer1);
        }else if (request.params.whiAns === "answer2"){
            surveyData.answers.answer2.answerCount = surveyData.answers.answer2.answerCount + 1;
            console.log(surveyData.answers.answer2);
        }else{
            answerControl = false;
            response.status(412).send("Geçersiz ön bilgi")
        }
        newAnswer = surveyData.answers;
        console.log(newAnswer)
    }).then(function () {
        if (answerControl){
            survey.findByIdAndUpdate(request.params.id, {$set : {answers: newAnswer}}).then(function (res) {
                response.send(res);
            }).catch(function (err) {
                console.log(err)
            });
            response.status(200);
        }
    }).catch(function (error) {
        console.log(error)
    })
});

app.listen(process.env.PORT);