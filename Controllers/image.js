const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: '282af54d2ae44c4faa794c3aa4eda1da'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'));
}


const handleImagePut = (req, res, db) => {
    const { id } = req.body;
    db.select('*').from('users').where('id', '=', id)
      // .update({})  
      .increment('entries', 1)
      .returning('entries')
      .then(entries => {
          res.json(entries[0]);
      })
      .catch(err => res.status(400).json('error finding'));
}

module.exports = {
    handleImagePut,
    handleApiCall
}