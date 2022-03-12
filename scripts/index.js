import { world, MinecraftBlockTypes, BlockLocation } from 'mojang-minecraft'



world.events.blockPlace.subscribe(ev => {
  const { block, player, dimension } = ev
  const { x, y, z } = block.location
  
  let ilegalBlocks = [
    'minecraft:movingBlock',
    'minecraft:movingblock',
    'minecraft:glowingobsidian',
    'minecraft:glowingObsidian',
    'minecraft:reserved6',
    'minecraft:reserved2',
    'minecraft:reserved3',
    'minecraft:info_update',
    'minecraft:info_update2'
    ]
    
    if(ilegalBlocks.includes(block.id)) {
      dimension.runCommand(`tellraw @a {"rawtext":[{"text":"§cDikkat! §7${player.nameTag} §cisimli oyucu: §e${block?.id} bloğunu §c${x} ${y} ${z} §akordinatına koydu!"}]}`)
      player.runCommand(`tag @s add banned`)
      dimension.getBlock(new BlockLocation(x, y, z)).setType(MinecraftBlockTypes.air)
    }
})

world.events.tick.subscribe(data => {
  world.getDimension("overworld").runCommand(`tp @a[tag=banned] 9999999 99999 9999999`)
  world.getDimension("overworld").runCommand(`tellraw @a[tag=banned] {"rawtext":[{"text":"§4BU SERVERDEN BANLANDIN AGLA EZİK"}]}`)
  world.getDimension("overworld").runCommand(`title @a[tag=banned] title §4§lBU SERVERDEN BANLANDIN`)
  world.getDimension("overworld").runCommand(`kick @a[tag=banned] §4Banlandın sebeb; hile açmak`)
})