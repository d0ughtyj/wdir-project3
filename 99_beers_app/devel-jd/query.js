Beer.find(
  {
    ibuMin: { $gt : 1, },
    ibuMax: { $lt : 1, },
    abvMin: { $gt : 1, },
    abvMax: { $lt : 1, },
    srmMin: { $gt : 1, },
    srmMax: { $lt : 1, },
},
    function ( err, data ){
      console.log( data );
      mongoose.connection.close();
});

//*******************************************//
Beer.find(
  {$and : [
    { ibuMin : '123'},
    { ibuMin : { $ne : '0'} },
    { ibuMin : { $ne : '10'} }
]},
  function ( err, data ){
    console.log('data this is ', data);
    mongoose.connection.close();
  });

  //*******************************************//



// http://mongoosejs.com/docs/2.7.x/docs/query.html

// query
// .where('name', 'Space Ghost')
// .where('age').gte(21).lte(65)
// .exec(callback)
