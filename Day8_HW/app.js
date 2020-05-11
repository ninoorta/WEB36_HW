// getting-started.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to db class manager
mongoose.connect('mongodb://localhost/classManagement', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    // we're connected!
});

var pupilSchema = new mongoose.Schema({
    pupilname: {
        // validation for schema
        type: String,
        required: [true, 'Username is required']
    },
    age: {
        type: Number,
        required: [true, 'Age is required']
    },
    major: {
        type: String,
        required: [true, 'Major is required']
    },
    _class_id: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'Class'
    }
});


var classSchema = new mongoose.Schema({
    class_name: {
        type: String,
        required: true
    },
    _course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }

});

var courseSchema = new mongoose.Schema({
    course_name: {
        type: String,
        required: true
    }
});

var Pupil = mongoose.model('Pupil', pupilSchema);
var Class = mongoose.model('Class', classSchema);
var Course = mongoose.model('Course', courseSchema);

// Create

app.post('/api/create-pupil', function (req, res) {
    const newPupil = new Pupil(req.body);
    newPupil.save(function (err, data) {
        if (err) {
            res.json({
                message: err
            })
        } else {
            res.json({
                message: 'Create pupil success',
                data: data
            });
        }

    });

})

// Read

app.get('/api/pupils', function (req, res) {
    Pupil.find({
        pupil: req.params.pupilname
    })
        .populate('_class_id')
        .exec(function (err, data) {
            if (err) {
                res.json({
                    message: err
                })
            } else {
                res.json({
                    data: data
                });
            }
        })
})



// Update

app.post('/api/pupil-update', function (req, res) {
    var query = { _id: req.query.pupilID };
    Pupil.findOneAndUpdate(query, req.body, function (err, data) {
        if (err) {
            res.json({
                message: err
            })
        } else {
            res.json({
                message: 'Updated!',
            });
        }

    })
})

// Delete
app.post('/api/pupil-delete', function (req, res) {
    var query = { _id: req.query.pupilID };
    Pupil.findOneAndDelete(query, function (err, data) {
        if (err) {
            res.json({
                message: err
            })
        } else {
            res.json({
                message: 'Deleted!',
            });
        }

    })
})

// Create

app.post('/api/create-class', function (req, res) {
    const newClass = new Class(req.body);
    newClass.save(function (err, data) {
        if (err) {
            res.json({
                message: err
            })
        } else {
            res.json({
                message: 'Create class success',
                data: data
            });
        }

    });
})


// Read

app.get('/api/classes', function (req, res) {
    Class.find({
        className: req.params.classname
    })
        .populate('_course_id')

        .exec(function (err, data) {
            if (err) {
                res.json({
                    message: err
                })
            } else {
                res.json({
                    data: data
                });
            }
        })
})

// Update

app.post('/api/class-update', function (req, res) {
    var query = { _id: req.query.classID };

    Class.findOneAndUpdate(query, req.body, function (err, data) {
        if (err) {
            res.json({
                message: err
            })
        } else {
            res.json({
                message: 'Updated!',
            });
        }

    })
})

// Delete

app.post('/api/class-delete', function (req, res) {
    var query = { _id: req.query.classID };
    Class.findOneAndDelete(query, function (err, data) {
        if (err) {
            res.json({
                message: err
            })
        } else {
            res.json({
                message: 'Deleted!',
            });
        }

    })
})


// Create

app.post('/api/create-course', function (req, res) {
    const newCourse = new Course(req.body);
    newCourse.save(function (err, data) {
        if (err) {
            res.json({
                message: err
            })
        } else {
            res.json({
                message: 'Create course success',
                data: data
            });
        }

    });
})


// Read

app.get('/api/courses', function (req, res) {
    Course.find({
        courseName: req.params.course_name
    })
        .exec(function (err, data) {
            if (err) {
                res.json({
                    message: err
                })
            } else {
                res.json({
                    data: data
                });
            }
        })
})

// Update

app.post('/api/course-update', function (req, res) {
    var query = { _id: req.query.courseID };

    Course.findOneAndUpdate(query, req.body, function (err, data) {
        if (err) {
            res.json({
                message: err
            })
        } else {
            res.json({
                message: 'Updated!',
            });
        }

    })
})

// Delete

app.post('/api/course-delete', function (req, res) {
    var query = { _id: req.query.courseID };

    Course.findOneAndDelete(query, function (err, data) {
        if (err) {
            res.json({
                message: err
            })
        } else {
            res.json({
                message: 'Deleted!',
            });
        }

    })
})


// danh sách học viên thuộc lớp học cụ thể (tìm theo id của lớp học).

app.get('/api/list-pupil', function (req, res) {
    var query = { _class_id: req.query.classID };
    Pupil.find(query)
    .populate('_class_id')
        .exec(function (err, data) {
            if (err) {
                res.json({
                    message: err
                })
            } else {
                res.json({
                    data: data
                });
            }
        })
})

//  danh sách lớp học của 1 khoá học cụ thể (tìm theo id của khoá học).

app.get('/api/list-class', function (req, res) {
    var query = { _course_id: req.query.courseID };
    Class.find(query)
    .populate('_course_id')
        .exec(function (err, data) {
            if (err) {
                res.json({
                    message: err
                })
            } else {
                res.json({
                    data: data
                });
            }
        })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'));

