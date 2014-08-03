// Populate DB with sample data
var Stache = require('stache.model.js');

// Sample staches
var stache1 = {
    title: 'Stache 1',
    author: 'user1',
    longitude: 50,
    latitude: 90,
    coord: [50, 90],
    content: 'Those who flow as life flows know they need no other force.'
};

// Find and remove all staches currently in database
Stache.find({}).remove(function() {
    Stache.create(stache1);
});