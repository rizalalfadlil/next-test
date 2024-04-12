/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("40wpndj31g851gg")

  // remove
  collection.schema.removeField("mujrqyhs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v4kpqspo",
    "name": "harga",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("40wpndj31g851gg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mujrqyhs",
    "name": "harga",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("v4kpqspo")

  return dao.saveCollection(collection)
})
