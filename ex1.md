## Add user controller
### Model
- `id`
- `first`
- `last`
- `email`
- `password`
- `playerIds[]`

### CRUD
#### Create user
`post` verb. receives in body `first`,`last`,`email`,`password`, `playerIds` empty array.

#### Get user
`get/:id` verb. receives user object.
