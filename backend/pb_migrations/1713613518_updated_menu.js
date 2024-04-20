/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("40wpndj31g851gg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "omxpynrt",
    "name": "jenis",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "makanan",
        "minuman"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("40wpndj31g851gg")

  // remove
  collection.schema.removeField("omxpynrt")

  return dao.saveCollection(collection)
})
