/*
 *
 *  noa hello-world template
 *
 *  This is a bare-minimum example world, intended to be a starting point for editing the demo.
 *
*/

// Import engine
import { Engine } from 'noa-engine'

// add a mesh to represent the player, and scale it, etc.
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import '@babylonjs/core/Meshes/Builders/boxBuilder'

// Set up engine
const noa = new Engine({
  debug: true,
  showFPS: true,

  chunkSize: 32,
  chunkAddDistance: 2.5,
  chunkRemoveDistance: 3.5,

  inverseY: false,
  inverseX: false,
  blockTestDistance: 50,
  playerAutoStep: true,

  useAO: true,
  AOmultipliers: [0.92, 0.8, 0.5],
  reverseAOmultiplier: 1.0
})

/*
 *
 *      Registering voxel types
 *
 *  Two step process. First you register a material, specifying the
 *  color/texture/etc. of a given block face, then you register a
 *  block, which specifies the materials for a given block type.
 *
*/

// block materials (just colors for this demo)
const textureURL = null // replace that with a filename to specify textures
const brownish = [0.45, 0.36, 0.22]
const greenish = [0.1, 0.8, 0.2]
noa.registry.registerMaterial('dirt', brownish, textureURL)
noa.registry.registerMaterial('grass', greenish, textureURL)

// block types and their material names
const dirtID = noa.registry.registerBlock(1, { material: 'dirt' })
const grassID = noa.registry.registerBlock(2, { material: 'grass' })

/*
 *
 *      World generation
 *
 *  The world is divided into chunks, and `noa` will emit an
 *  `worldDataNeeded` event for each chunk of data it needs.
 *  The game client should catch this, and call
 *  `noa.world.setChunkData` whenever the world data is ready.
 *  (The latter can be done asynchronously.)
 *
*/

// simple height map worldgen function
function getVoxelID (x, y, z) {
  if (y < -3) {
    return dirtID
  }

  const height = 2 * Math.sin(x / 10) + 3 * Math.cos(z / 20)

  if (y < height) {
    return grassID
  }

  return 0 // Return Air
}

// register for world events
noa.world.on('worldDataNeeded', function (id, data, x, y, z) {
  // `id` - a unique string id for the chunk
  // `data` - an `ndarray` of voxel ID data (see: https://github.com/scijs/ndarray)
  // `x, y, z` - world coords of the corner of the chunk
  for (let i = 0; i < data.shape[0]; i++) {
    for (let j = 0; j < data.shape[1]; j++) {
      for (let k = 0; k < data.shape[2]; k++) {
        const voxelID = getVoxelID(x + i, y + j, z + k)
        data.set(i, j, k, voxelID)
      }
    }
  }

  // tell noa the chunk's terrain data is now set
  noa.world.setChunkData(id, data)
})

/*
 *
 *      Create a mesh to represent the player:
 *
*/

// get the player entity's ID and other info (position, size, ..)
const player = noa.playerEntity
const dat = noa.entities.getPositionData(player)
const w = dat.width
const h = dat.height

const scene = noa.rendering.getScene()
const mesh = Mesh.CreateBox('player-mesh', 1, scene)
mesh.scaling.x = w
mesh.scaling.z = w
mesh.scaling.y = h

// add 'mesh' component to the player entity
// this causes the mesh to move around in sync with the player entity
noa.entities.addComponent(player, noa.entities.names.mesh, {
  mesh,
  // offset vector is needed because noa positions are always the
  // bottom-center of the entity, and Babylon's CreateBox gives a
  // mesh registered at the center of the box
  offset: [0, h / 2, 0]
})

/*
 *
 *      Minimal interactivity
 *
*/

// clear targeted block on on left click
noa.inputs.down.on('fire', function () {
  if (noa.targetedBlock) {
    const pos = noa.targetedBlock.position
    noa.setBlock(0, pos[0], pos[1], pos[2])
  }
})

// place some grass on right click
noa.inputs.down.on('alt-fire', function () {
  if (noa.targetedBlock) {
    const pos = noa.targetedBlock.adjacent
    noa.setBlock(grassID, pos[0], pos[1], pos[2])
  }
})

// add a key binding for 'E' to do the same as alt-fire
noa.inputs.bind('alt-fire', 'E')

// each tick, consume any scroll events and use them to zoom camera
noa.on('tick', function (dt) {
  const scroll = noa.inputs.state.scrolly

  if (scroll !== 0) {
    noa.camera.zoomDistance += (scroll > 0) ? 1 : -1

    if (noa.camera.zoomDistance < 0) {
      noa.camera.zoomDistance = 0
    }

    if (noa.camera.zoomDistance > 100) {
      noa.camera.zoomDistance = 100
    }
  }
})
