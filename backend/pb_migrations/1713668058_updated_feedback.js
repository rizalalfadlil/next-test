/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tgak0pfb27udxou")

  // remove
  collection.schema.removeField("b9knmolc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mj1eylpu",
    "name": "email",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tgak0pfb27udxou")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b9knmolc",
    "name": "email",
    "type": "email",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }))

  // remove
  collection.schema.removeField("mj1eylpu")

  return dao.saveCollection(collection)
})
