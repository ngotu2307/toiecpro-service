const shortid = require('shortid');
const PartThree = require('../models').PartThree;
const QuestionPartThree = require('../models').QuestionPartThree;
const appRoot = require('app-root-path');
const env = process.env.NODE_ENV || 'development';
const config = require(appRoot + '/config/wannacry/conf.json')[env];


exports.create = (req, res, next) => {

    const _information = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
    const _direction = "Lorem ipsum dolor sit amet, labitur vivendo consectetuer ea pro, has eu regione ocurreret. Eum ex liber soluta feugait. Ei vix erat interpretaris. Quo et quas quando impetus.";
    const _full_audio = "http://toeicpro.com/uploads/2014/09/example.mp3";

    const _id = shortid.generate();
    const mQuestionPartThree = [];
    for(let i=0; i<30; i++) {
        let tempQues = {};
        tempQues.question_name = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempor quam in sapien ultrices hendrerit. ";
        tempQues.optionA = "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet";
        tempQues.optionB = "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet";
        tempQues.optionC = "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet";
        tempQues.optionD = "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet";
        tempQues.answer = "D";
        tempQues.idPartThree = _id;
        mQuestionPartThree.push(tempQues);
    }

    const part = {
        id : _id,
        information: _information,
        direction: _direction,
        full_audio: _full_audio
    }

    PartThree.create(part)
    .then(content => {
        console.log("create partthree successfully! (not include question)");
        QuestionPartThree.bulkCreate(mQuestionPartThree,{ individualHooks: true })
            .then(ques => {
                res.status(200).json({
                    message: 'Create partthree successfully!'
                })
            })
            .catch(err => {
                return res.status(500).json({
                    error: err
                });
            })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
}
