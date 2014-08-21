module.exports.testStache1 = {
  title: 'Advice From Yoda',
  created_by: 'Yoda',
  lon: 40,
  lat: 6,
  loc: [40, 6],
  content: 'Train yourself to let go of everything you fear to lose.',
  tags: ['Wise', 'Advice'],
  locked: true,
  clue: 'Training Plan',
  password: 'L3tG0'
};

module.exports.testStache2 = {
  title: 'Wise Words from Darth Vader',
  created_by: 'Darth Vader',
  lon: 40,
  lat: 5,
  loc: [40, 5],
  content: 'The ability to destroy a planet is insignificant next to the power of the force.',
  tags: ['Wise', 'Evil']
};

module.exports.testStache3 = {
  title: 'Veggie Burger',
  created_by: 'Hamburglar',
  lon: 41,
  lat: 4,
  loc: [41, 4],
  content: 'Cow-ered!',
  tags: ['Food', 'McDonalds'],
  locked: false
};

// New user without user_id
module.exports.testUser1 = {
  first_name: 'Bob',
  last_name: 'Owen'
  // profilePhoto: 
};

// Existing user with user_id
module.exports.testUser2 = {
  fbid: 'abc123',
  first_name: 'Indiana',
  last_name: 'Jones',
};

module.exports.testDiscovery1 = {
  stache_id: '53f518f97d755d043989cf81',
  user_fbid: '1234'
};
