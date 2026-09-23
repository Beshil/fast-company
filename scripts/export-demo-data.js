// Prints an import file; does not connect to Firebase or modify a database.
const collections = {
  user: 'users',
  profession: 'professions',
  quality: 'qualities'
}
const data = {}
for (const [collection, file] of Object.entries(collections)) {
  data[collection] = Object.fromEntries(
    require('../src/app/mockData/' + file + '.json').map(
      ({ password, ...item }) => [item._id, item]
    )
  )
}
process.stdout.write(JSON.stringify(data, null, 2) + '\n')
