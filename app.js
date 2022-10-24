const express = require('express')
const bdparse = require('body-parser')
const app = express()
const port = 3000;
app.use(bdparse.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
const db = require(__dirname + '/database.js')
app.set('view engine', 'ejs')

const _ = require('lodash')
    //constant string
const home_content = "this is an home section"
const about_content = "this is an about section"
const contact_content = "this is an contact section"
let note_arr = [];
db.Connections().then((tb) => {
    console.log("connected", tb)
    app.get('/', (req, res) => {
        //get code here
        note_arr = []
        db.find_all_blog().then((data) => {
            data.forEach(element => {
                note_arr.push({
                    title: element.title,
                    note: element.note
                })
            });
            // console.log(note_arr)
            res.render('home', { home_c: home_content, res: note_arr });
        }).catch((err) => {
            console.log("error on fetching")
        })


    })

    app.post('/', (req, res) => {
        //post code here
    })

    app.get('/about', (req, res) => {
        res.render('about', { about_c: about_content })
    })

    //for contact section
    app.get('/contact', (req, res) => {
        res.render('contact', { contact_c: contact_content })
    })



    //for compose section
    app.get('/compose', (req, res) => {
            res.render('compose');
        })
        //post method to accespt notes
    app.post('/compose', (req, res) => {
            console.log(req.body.note, req.body.title)
            let data = {
                title: req.body.title,
                note: req.body.note
            }
            db.save_to_db(data).then((data) => {
                console.log("saved")
                res.redirect('/');
            }).catch((err) => {
                console.log("error on saving")
            })
        })
        //they are used to make dynamic url
    app.get('/post/:values', (req, res) => {
        // console.log(req.params.values); //it will print anything
        db.find_something(_.toLower(req.params.values)).then((data) => {
            // console.log(data)
            res.render('post', { res: data[0] });
        }).catch((err) => {
            console.log("nothing with this value")
        })

    })
    app.listen(port, () => {
        console.log('started at port 3000')
    })
})