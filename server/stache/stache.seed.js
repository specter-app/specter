// Populate DB with sample data
var Stache = require('./stache.model.js');

// Sample staches
var stache_data = [
{
    title: 'HRAdvice',
    author: 'LaoTzu',
    loc: [40, 5],
    content: 'Those who flow as life flows know they need no other force.'
},
{
    title: 'BeautifulPoem',
    author: 'Specter',
    loc: [40, 5.1],
    content: 'Roses are red, violets are blue, digital caches are awesome.'
},
{
    title: 'UglyPoem',
    author: 'Goblins',
    loc: [40, 5.2],
    content: 'Clash Bash Hammer Knock'
},
{
    title: 'BerenAndLuthien',
    author: 'Tolkien',
    loc: [40.1, 5],
    content: 'Beren came, And doom fell on Tinúviel, That in his arms lay glistening.'
},
{
    title: 'ACDC',
    author: 'Angus',
    loc: [40.2, 5],
    content: 'Thunder, thunder, thunder, thunder. I was caught in the middle of a railroad track.'
},
{
    title: 'Invite',
    author: 'Jared',
    loc: [40, 6],
    content: 'Party at Outback Steakhouse storage room.'
},
{
    title: 'Money',
    author: 'GenerousDonor',
    loc: [40, 5.3],
    content: '1 billion IOUs'
}]
;

// Create a new stache with stache_data
var stache = new Stache(stache_data);

// Find and remove all staches currently in database
Stache.find({}).remove(function() {
    // Save the new stache to the database
    stache_data.forEach(function(data) {
        Stache.create(data);
    });
});