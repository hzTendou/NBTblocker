 import { world, MinecraftBlockTypes, BlockLocation } from 'mojang-minecraft'

world.events.blockPlace.subscribe(ev => {

  const { block, player, dimension } = ev

  const { x, y, z } = block.location

  let ilegalBlocks = [

    'minecraft:movingBlock',

    'minecraft:movingblock',

    'minecraft:glowingobsidian',

    'minecraft:glowingObsidian'

    ]

    if(ilegalBlocks.includes(block.id)) {

      dimension.runCommand(`tellraw @a {"rawtext":[{"text":"§cDikkat! §7${player.nameTag} §cisimli oyucu: §e${block?.id} bloğunu §c${x} ${y} ${z} §akordinatına koydu! (AntiNb)"}]}`)

      player.runCommand(`tag @s add banned`)

      dimension.getBlock(new BlockLocation(x, y, z)).setType(MinecraftBlockTypes.air)

    }

})

world.events.tick.subscribe(data => {

  for(const player of world.getPlayers()){

    let rightInventoryComp = player.getComponent("minecraft:inventory")

    let rightChestContainer = rightInventoryComp.container

    let item = rightChestContainer.getItem(player.selectedSlot)

    if(ilegalBlocks.includes(item.id)){

    player.runCommand(`tag @s add banned`)

    }

  }

})

world.events.tick.subscribe(data => {

  world.getDimension("overworld").runCommand(`tp @a[tag=banned] 9999999 99999 9999999`)

  world.getDimension("overworld").runCommand(`tellraw @a[tag=banned] {"rawtext":[{"text":"§4BU SERVERDEN BANLANDIN AGLA EZİK"}]}`)

  world.getDimension("overworld").runCommand(`title @a[tag=banned] title §4§lSERVERDEN BANLANDIN`)

  

})

