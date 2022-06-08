exports.handler = (context, event, callback) => {
  const Airtable = require('airtable');
  const base = new Airtable({apiKey: context.AIRTABLE_KEY}).base(context.INTERNS_TABLE_ID);

  let internList= [];
  let internSelected;

  
  base('interns').select({
      view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    
      records.forEach(function(record) {
     
          let internObj = {
              Name: record.get('Name'),
              Slack: record.get('Slack'),
              Bio: record.get('Bio'),
              City: record.get('City'),
              Fun_Fact: record.get('Fun Fact'),
              Team: record.get('Team')
          }

          if(internObj.Name) {
            internList.push(internObj);
          }

      });

      fetchNextPage();

  }, function done(err) {
    
      internSelected = internList[Math.floor(Math.random() * internList.length)];
      console.log('intern selected', internSelected);

      if (err) { console.error(err); return; }  
        
      callback(null, internSelected);

  });
};
