/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "h1pvtsaac3zqqpq",
    "created": "2024-04-01 14:47:44.342Z",
    "updated": "2024-04-01 14:47:44.342Z",
    "name": "activity",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ildio5h5",
        "name": "log",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "if61ymkn",
        "name": "user",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("h1pvtsaac3zqqpq");

  return dao.deleteCollection(collection);
})
