(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("map1",
{ "height":10,
 "infinite":false,
 "layers":[
        {
         "data":[53, 53, 53, 53, 53, 1, 1, 1, 1, 1, 53, 1, 1, 1, 53, 53, 53, 53, 53, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 53, 1, 2, 2, 1, 53, 53, 53, 53, 53, 53, 1, 2, 1, 53, 53, 2, 2, 53, 53, 2, 1, 2, 53, 53, 1, 1, 1, 53, 2, 1, 1, 1, 53, 2, 2, 1, 1, 1, 2, 1, 1, 1, 53, 53, 2, 2, 1, 2, 2, 1, 1, 1, 1, 53, 53, 53, 53, 53, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         "height":10,
         "id":1,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }],
 "nextlayerid":2,
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.2.0",
 "tileheight":32,
 "tilesets":[
        {
         "firstgid":1,
         "source":"..\/..\/..\/..\/..\/Desktop\/procjam\/chunks\/dirt.json"
        }],
 "tilewidth":32,
 "type":"map",
 "version":1.2,
 "width":10
});