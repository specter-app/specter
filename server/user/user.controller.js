// We need a controller for the User schema (which generates a collection) so that our
// API (REST endpoints / routes) can interact with the database. We need these functions for diff endpoints:
// 1) store a new user
// 2) authenticate a login
// 3) generate an auth token
// 4) authenticate a request
// 5) expire an auth token
// 6) modify a user profile/settings/caches